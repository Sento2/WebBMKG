<?php

namespace App\Services;

use App\Models\PrakiraanCuaca;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PrakiraanCuacaService
{
    /**
     * Cari prakiraan cuaca dengan filter wilayah opsional.
     */
    public function search(?string $wilayah = null): LengthAwarePaginator
    {
        $query = PrakiraanCuaca::orderBy('waktu_prakiraan', 'desc');

        if ($wilayah) {
            $query->where('wilayah', 'like', '%'.$wilayah.'%');
        }

        return $query->paginate(50);
    }
}
