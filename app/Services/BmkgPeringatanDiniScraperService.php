<?php

namespace App\Services;

use App\Enums\LevelBahaya;
use App\Models\PeringatanDini;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Symfony\Component\DomCrawler\Crawler;

class BmkgPeringatanDiniScraperService
{
    private const RSS_URL = 'https://www.bmkg.go.id/alerts/nowcast/id';

    private const TARGET_WILAYAH = 'Sulawesi Tengah';

    /**
     * Mapping severity CAP → LevelBahaya enum.
     *
     * BMKG menggunakan standar CAP (Common Alerting Protocol) yang mendefinisikan
     * severity: Minor, Moderate, Severe, Extreme.
     *
     * @var array<string, LevelBahaya>
     */
    private const SEVERITY_MAP = [
        'Minor' => LevelBahaya::Waspada,
        'Moderate' => LevelBahaya::Waspada,
        'Severe' => LevelBahaya::Siaga,
        'Extreme' => LevelBahaya::Awas,
    ];

    public function __construct(
        private Client $httpClient,
    ) {}

    /**
     * Proses utama: cek RSS feed BMKG, cari peringatan untuk Sulawesi Tengah,
     * lalu update database secara otomatis.
     *
     * @return array{ditemukan: bool, peringatan: ?PeringatanDini, pesan: string}
     */
    public function cekDanUpdatePeringatan(): array
    {
        $rssXml = $this->ambilRssFeed();

        if ($rssXml === null) {
            return [
                'ditemukan' => false,
                'peringatan' => null,
                'pesan' => 'Gagal mengambil RSS feed dari BMKG.',
            ];
        }

        $alertSulteng = $this->cariPeringatanSulteng($rssXml);

        if ($alertSulteng === null) {
            // Tidak ada peringatan untuk Sulteng → matikan ticker
            $peringatan = $this->nonaktifkanPeringatan();

            return [
                'ditemukan' => false,
                'peringatan' => $peringatan,
                'pesan' => 'Kondisi aman. Tidak ada peringatan untuk Sulawesi Tengah.',
            ];
        }

        // Ada peringatan Sulteng → ambil detail dari CAP XML, lalu aktifkan ticker
        $detailCap = $this->ambilDetailCap($alertSulteng['link']);
        $peringatan = $this->aktifkanPeringatan($alertSulteng, $detailCap);

        return [
            'ditemukan' => true,
            'peringatan' => $peringatan,
            'pesan' => 'Peringatan Sulteng DITEMUKAN: '.$alertSulteng['title'],
        ];
    }

    /**
     * Ambil RSS feed dari BMKG.
     */
    private function ambilRssFeed(): ?string
    {
        try {
            $response = $this->httpClient->request('GET', self::RSS_URL);

            return (string) $response->getBody();
        } catch (\Exception $e) {
            Log::error('Gagal mengambil RSS feed BMKG: '.$e->getMessage());

            return null;
        }
    }

    /**
     * Parse RSS XML dan cari item yang mengandung "Sulawesi Tengah" di title.
     *
     * @return array{title: string, link: string, description: string, pubDate: string}|null
     */
    private function cariPeringatanSulteng(string $rssXml): ?array
    {
        try {
            $crawler = new Crawler($rssXml);

            // Iterasi setiap <item> di RSS feed
            $items = $crawler->filter('channel > item');

            foreach ($items as $node) {
                $itemCrawler = new Crawler($node);
                $title = $itemCrawler->filter('title')->text('');

                // Cek apakah judul mengandung "Sulawesi Tengah"
                if (stripos($title, self::TARGET_WILAYAH) !== false) {
                    return [
                        'title' => $title,
                        'link' => $itemCrawler->filter('link')->text(''),
                        'description' => $itemCrawler->filter('description')->text(''),
                        'pubDate' => $itemCrawler->filter('pubDate')->text(''),
                    ];
                }
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Gagal parsing RSS feed BMKG: '.$e->getMessage());

            return null;
        }
    }

    /**
     * Ambil detail peringatan dari CAP XML (alert XML) untuk mendapatkan
     * severity, waktu berlaku, dan deskripsi lengkap.
     *
     * @return array{severity: string, headline: string, description: string, effective: string, expires: string, areaDesc: string}|null
     */
    private function ambilDetailCap(string $capUrl): ?array
    {
        if (empty($capUrl)) {
            return null;
        }

        try {
            $response = $this->httpClient->request('GET', $capUrl);
            $capXml = (string) $response->getBody();

            $crawler = new Crawler($capXml);

            // Namespace CAP menggunakan prefix default, gunakan filter langsung
            return [
                'severity' => $crawler->filter('info > severity')->text('Moderate'),
                'headline' => $crawler->filter('info > headline')->text(''),
                'description' => $crawler->filter('info > description')->text(''),
                'effective' => $crawler->filter('info > effective')->text(''),
                'expires' => $crawler->filter('info > expires')->text(''),
                'areaDesc' => $crawler->filter('info > area > areaDesc')->text(self::TARGET_WILAYAH),
            ];
        } catch (\Exception $e) {
            Log::warning('Gagal mengambil detail CAP XML: '.$e->getMessage());

            return null;
        }
    }

    /**
     * Aktifkan peringatan dini di database berdasarkan data dari RSS + CAP.
     *
     * @param  array{title: string, link: string, description: string, pubDate: string}  $rssItem
     * @param  array{severity: string, headline: string, description: string, effective: string, expires: string, areaDesc: string}|null  $capDetail
     */
    private function aktifkanPeringatan(array $rssItem, ?array $capDetail): PeringatanDini
    {
        $peringatan = PeringatanDini::firstOrNew(['id' => 1]);

        // Tentukan level bahaya dari severity CAP, default ke waspada
        $severity = $capDetail['severity'] ?? 'Moderate';
        $peringatan->level_bahaya = self::SEVERITY_MAP[$severity] ?? LevelBahaya::Waspada;

        // Gunakan headline dari CAP jika tersedia, fallback ke title RSS
        $peringatan->judul_peringatan = $capDetail['headline'] ?? $rssItem['title'];

        // Gunakan deskripsi dari CAP jika tersedia, fallback ke description RSS
        $peringatan->deskripsi_wilayah = $capDetail['description'] ?? $rssItem['description'];

        $peringatan->tampilkan_di_web = true;

        // Waktu berlaku dari CAP XML
        if (! empty($capDetail['effective'])) {
            $peringatan->berlaku_mulai = $this->parseWaktuCap($capDetail['effective']);
        } else {
            $peringatan->berlaku_mulai = now();
        }

        if (! empty($capDetail['expires'])) {
            $peringatan->berlaku_sampai = $this->parseWaktuCap($capDetail['expires']);
        } else {
            $peringatan->berlaku_sampai = now()->addHours(3);
        }

        $peringatan->save();

        return $peringatan;
    }

    /**
     * Nonaktifkan peringatan dini di database.
     */
    private function nonaktifkanPeringatan(): ?PeringatanDini
    {
        $peringatan = PeringatanDini::find(1);

        if ($peringatan) {
            $peringatan->tampilkan_di_web = false;
            $peringatan->save();
        }

        return $peringatan;
    }

    /**
     * Parse format waktu CAP (ISO 8601) ke Carbon.
     */
    private function parseWaktuCap(string $waktuCap): Carbon
    {
        try {
            return Carbon::parse($waktuCap);
        } catch (\Exception) {
            return now();
        }
    }
}
