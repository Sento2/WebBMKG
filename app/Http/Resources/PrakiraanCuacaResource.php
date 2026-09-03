<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrakiraanCuacaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'wilayah' => $this->wilayah,
            'waktu_prakiraan' => $this->waktu_prakiraan,
            'kondisi' => $this->kondisi,
            'ikon_cuaca' => $this->ikon_cuaca,
            'suhu' => $this->suhu,
            'kelembapan' => $this->kelembapan,
            'arah_kecepatan_angin' => $this->arah_kecepatan_angin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
