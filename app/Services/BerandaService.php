<?php

namespace App\Services;

use App\Enums\StatusBerita;
use App\Models\Berita;
use App\Models\PeringatanDini;
use App\Models\PrakiraanCuaca;
use Illuminate\Database\Eloquent\Collection;

class BerandaService
{
    /**
     * Kumpulkan seluruh data yang dibutuhkan halaman beranda.
     *
     * @return array{peringatan: ?PeringatanDini, berita_terbaru: Collection, cuaca_hari_ini: Collection}
     */
    public function getData(): array
    {
        $peringatan = PeringatanDini::where('tampilkan_di_web', true)->first();

        $beritaTerbaru = Berita::where('status', StatusBerita::Published)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        $cuacaHariIni = PrakiraanCuaca::whereDate('waktu_prakiraan', today())->get();

        return [
            'peringatan' => $peringatan,
            'berita_terbaru' => $beritaTerbaru,
            'cuaca_hari_ini' => $cuacaHariIni,
        ];
    }
}
