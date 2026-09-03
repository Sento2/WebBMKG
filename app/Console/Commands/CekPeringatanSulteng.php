<?php

namespace App\Console\Commands;

use App\Services\BmkgPeringatanDiniScraperService;
use Illuminate\Console\Command;

class CekPeringatanSulteng extends Command
{
    /**
     * Nama perintah yang akan dijalankan di terminal atau scheduler.
     */
    protected $signature = 'app:cek-peringatan-sulteng';

    /**
     * Deskripsi singkat tugas.
     */
    protected $description = 'Cek RSS feed peringatan dini BMKG dan aktifkan otomatis untuk wilayah Sulawesi Tengah';

    public function __construct(
        private BmkgPeringatanDiniScraperService $scraperService,
    ) {
        parent::__construct();
    }

    /**
     * Proses utama: delegasi ke BmkgPeringatanDiniScraperService.
     */
    public function handle(): int
    {
        $this->info('Memulai pengecekan peringatan dini BMKG...');

        try {
            $hasil = $this->scraperService->cekDanUpdatePeringatan();

            if ($hasil['ditemukan']) {
                $this->info('⚠️  '.$hasil['pesan']);
                $this->info('   Ticker web diaktifkan secara otomatis.');
            } else {
                $this->info('✅ '.$hasil['pesan']);
            }

            return self::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Terjadi kesalahan sistem: '.$e->getMessage());

            return self::FAILURE;
        }
    }
}
