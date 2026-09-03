<?php

namespace App\Services;

use App\Models\CuacaMaritim;
use Illuminate\Database\Eloquent\Collection;

class CuacaMaritimService
{
    /**
     * Ambil data cuaca maritim yang masih berlaku.
     */
    public function getAktif(): Collection
    {
        return CuacaMaritim::where('waktu_berlaku_sampai', '>=', now())
            ->orderBy('wilayah_perairan', 'asc')
            ->get();
    }

    /**
     * Algoritma Klasifikasi Gelombang Standar BMKG.
     *
     * Menentukan kategori berdasarkan tinggi gelombang maksimum.
     */
    public function hitungKategoriGelombang(float $tinggiGelombang): string
    {
        if ($tinggiGelombang <= 0.5) {
            return 'Tenang';
        }
        if ($tinggiGelombang <= 1.25) {
            return 'Rendah';
        }
        if ($tinggiGelombang <= 2.50) {
            return 'Sedang';
        }
        if ($tinggiGelombang <= 4.00) {
            return 'Tinggi';
        }
        if ($tinggiGelombang <= 6.00) {
            return 'Sangat Tinggi';
        }

        return 'Ekstrem';
    }

    /**
     * Algoritma Risiko Keselamatan Pelayaran Standar BMKG.
     *
     * Menentukan jenis kapal yang berisiko berdasarkan kecepatan angin dan tinggi gelombang.
     */
    public function hitungRisikoPelayaran(int $kecepatanAngin, float $tinggiGelombang): string
    {
        $risiko = [];

        // Perahu Nelayan (Angin > 15 knot / Gelombang > 1.25 m)
        if ($kecepatanAngin > 15 || $tinggiGelombang > 1.25) {
            $risiko[] = 'Perahu Nelayan';
        }
        // Kapal Tongkang (Angin > 16 knot / Gelombang > 1.5 m)
        if ($kecepatanAngin > 16 || $tinggiGelombang > 1.50) {
            $risiko[] = 'Kapal Tongkang';
        }
        // Kapal Ferry (Angin > 21 knot / Gelombang > 2.5 m)
        if ($kecepatanAngin > 21 || $tinggiGelombang > 2.50) {
            $risiko[] = 'Kapal Ferry';
        }
        // Kapal Ukuran Besar / Kargo (Angin > 27 knot / Gelombang > 4.0 m)
        if ($kecepatanAngin > 27 || $tinggiGelombang > 4.00) {
            $risiko[] = 'Kapal Kargo/Pesiar';
        }

        if (empty($risiko)) {
            return 'Aman untuk semua jenis kapal.';
        }

        return 'Harap diperhatikan risiko tinggi keselamatan pelayaran bagi: '.implode(', ', $risiko).'.';
    }
}
