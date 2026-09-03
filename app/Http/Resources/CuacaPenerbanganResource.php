<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CuacaPenerbanganResource extends JsonResource
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
            'nama_bandara' => $this->nama_bandara,
            'waktu_pengamatan' => $this->waktu_pengamatan,
            'arah_kecepatan_angin' => $this->arah_kecepatan_angin,
            'jarak_pandang' => $this->jarak_pandang,
            'kondisi_cuaca' => $this->kondisi_cuaca,
            'suhu' => $this->suhu,
            'titik_embun' => $this->titik_embun,
            'tekanan_udara' => $this->tekanan_udara,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
