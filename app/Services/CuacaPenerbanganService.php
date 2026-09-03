<?php

namespace App\Services;

use App\Models\CuacaPenerbangan;
use Illuminate\Database\Eloquent\Collection;

class CuacaPenerbanganService
{
    /**
     * Ambil 5 data pengamatan cuaca penerbangan terbaru.
     */
    public function getTerbaru(): Collection
    {
        return CuacaPenerbangan::orderBy('waktu_pengamatan', 'desc')
            ->take(5)
            ->get();
    }
}
