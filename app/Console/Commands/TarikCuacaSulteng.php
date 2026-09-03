<?php

namespace App\Console\Commands;

use App\Models\PrakiraanCuaca;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TarikCuacaSulteng extends Command
{
    protected $signature = 'app:tarik-cuaca-sulteng';

    protected $description = 'Menarik data API cuaca desa/kelurahan di Sulawesi Tengah dari BMKG';

    public function handle()
    {
        $this->info('Memulai sinkronisasi data cuaca BMKG...');

        // CONTOH: Daftar Kode Wilayah (ADM4) untuk kelurahan/desa di Sulteng.
        // Di sistem nyata, kamu butuh tabel khusus berisi ribuan kode wilayah ini.
        // Untuk contoh ini, kita pakai beberapa kode desa/kecamatan di Palu.
        $daftarKodeDesa = [
            '7271011001', // Contoh kode fiktif/real adm4 untuk suatu kelurahan di Palu
            '7271011002',
            // ... (masukkan kode wilayah desa lainnya di sini)
        ];

        foreach ($daftarKodeDesa as $kodeWilayah) {
            try {
                // Endpoint API JSON asli yang dipakai web BMKG modern
                $url = "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={$kodeWilayah}";

                // Gunakan Http facade Laravel tanpa verifikasi SSL yang ketat untuk lokal
                $response = Http::withoutVerifying()->get($url);

                if ($response->successful()) {
                    $data = $response->json();

                    // Ambil data prakiraan dari struktur JSON BMKG
                    // (Struktur array ini harus disesuaikan jika BMKG mengubah format JSON mereka)
                    $namaWilayah = $data['lokasi']['desa'] ?? 'Wilayah Tidak Diketahui';
                    $prakiraanList = $data['data'][0]['cuaca'] ?? [];

                    foreach ($prakiraanList as $cuaca) {
                        $waktu = Carbon::parse($cuaca['datetime']);

                        // Gunakan updateOrCreate agar data tidak duplikat jika command dijalankan ulang
                        PrakiraanCuaca::updateOrCreate(
                            [
                                'wilayah' => $namaWilayah,
                                'waktu_prakiraan' => $waktu->toDateTimeString(),
                            ],
                            [
                                'kondisi' => $cuaca['weather_desc'],
                                'ikon_cuaca' => $cuaca['image'],
                                'suhu' => $cuaca['t'],
                                'kelembapan' => $cuaca['hu'],
                                'arah_kecepatan_angin' => $cuaca['wd'].', '.$cuaca['ws'].' km/jam',
                            ]
                        );
                    }
                    $this->info("Berhasil menarik data untuk: {$namaWilayah}");
                } else {
                    $this->error("Gagal menarik data untuk kode: {$kodeWilayah}");
                }

                // JEDA SANGAT PENTING!
                // Jangan bombardir server BMKG. Beri jeda 1-2 detik per desa.
                sleep(1);

            } catch (\Exception $e) {
                Log::error("Error Tarik Cuaca {$kodeWilayah}: ".$e->getMessage());
                $this->error("Sistem error pada kode {$kodeWilayah}. Lanjut ke wilayah berikutnya.");
            }
        }

        $this->info('Sinkronisasi data cuaca Sulteng selesai!');
    }
}
