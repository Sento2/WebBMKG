<?php

namespace App\Services;

use Carbon\Carbon;

class CitraSatelitService
{
    /**
     * Base URL produk satelit BMKG (Himawari-9).
     */
    private const BASE_URL = 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09';

    /**
     * Daftar produk satelit yang tersedia.
     *
     * @var array<string, array{nama: string, deskripsi: string, path: string}>
     */
    private const PRODUK = [
        'enhanced_ir' => [
            'nama' => 'Enhanced IR (Infrared)',
            'deskripsi' => 'Citra suhu puncak awan untuk mendeteksi awan Cumulonimbus (Cb) dan potensi cuaca buruk.',
            'path' => 'EIR',
        ],
        'visible' => [
            'nama' => 'Visible (VIS)',
            'deskripsi' => 'Citra tutupan awan pada siang hari, memperlihatkan distribusi awan secara visual.',
            'path' => 'VIS',
        ],
        'cloud_top_height' => [
            'nama' => 'Cloud Top Height (CTH)',
            'deskripsi' => 'Estimasi ketinggian puncak awan untuk analisis potensi cuaca ekstrem.',
            'path' => 'CTH',
        ],
        'rainfall_potential' => [
            'nama' => 'Potential Rainfall',
            'deskripsi' => 'Estimasi potensi curah hujan berdasarkan analisis suhu puncak awan.',
            'path' => 'CCLD',
        ],
    ];

    /**
     * Daftar wilayah cakupan citra.
     *
     * @var array<string, array{nama: string, kode: string}>
     */
    private const WILAYAH = [
        'sulawesi' => [
            'nama' => 'Sulawesi',
            'kode' => 'SU',
        ],
        'indonesia' => [
            'nama' => 'Indonesia',
            'kode' => 'ID',
        ],
        'asia_tenggara' => [
            'nama' => 'Asia Tenggara',
            'kode' => 'SE',
        ],
    ];

    /**
     * Ambil semua URL citra satelit terkini.
     *
     * @return array{produk: array<string, mixed>, terakhir_update: string, sumber: string}
     */
    public function getCitraTerkini(): array
    {
        $now = Carbon::now('Asia/Makassar');

        $produkList = [];

        foreach (self::PRODUK as $key => $produk) {
            $wilayahList = [];

            foreach (self::WILAYAH as $wKey => $wilayah) {
                $wilayahList[$wKey] = [
                    'nama' => $wilayah['nama'],
                    'url' => $this->buildImageUrl($produk['path'], $wilayah['kode'], $now),
                ];
            }

            $produkList[$key] = [
                'nama' => $produk['nama'],
                'deskripsi' => $produk['deskripsi'],
                'wilayah' => $wilayahList,
            ];
        }

        return [
            'produk' => $produkList,
            'terakhir_update' => $now->format('Y-m-d H:i:s T'),
            'sumber' => 'BMKG - Satelit Himawari-9',
        ];
    }

    /**
     * Bangun URL citra satelit berdasarkan produk, wilayah, dan waktu.
     *
     * Format URL BMKG: {BASE}/{PRODUK}/{WILAYAH}_{PRODUK}_{YYYYMMDD}.png
     * Contoh: https://inderaja.bmkg.go.id/IMAGE/HIMA/H09/EIR/SU_EIR_20260907.png
     */
    private function buildImageUrl(string $produkPath, string $wilayahKode, Carbon $waktu): string
    {
        $tanggal = $waktu->format('Ymd');

        return sprintf(
            '%s/%s/%s_%s_%s.png',
            self::BASE_URL,
            $produkPath,
            $wilayahKode,
            $produkPath,
            $tanggal,
        );
    }
}
