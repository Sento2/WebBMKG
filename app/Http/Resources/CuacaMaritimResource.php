<?php

namespace App\Http\Resources;

use App\Services\CuacaMaritimService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CuacaMaritimResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * Algoritma klasifikasi gelombang dan risiko pelayaran dihitung on-the-fly di resource.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $service = app(CuacaMaritimService::class);

        return [
            'id' => $this->id,
            'wilayah_perairan' => $this->wilayah_perairan,
            'waktu_berlaku_mulai' => $this->waktu_berlaku_mulai,
            'waktu_berlaku_sampai' => $this->waktu_berlaku_sampai,
            'kondisi_cuaca' => $this->kondisi_cuaca,
            'arah_angin' => $this->arah_angin,
            'angin_min' => $this->angin_min,
            'angin_max' => $this->angin_max,
            'gelombang_min' => $this->gelombang_min,
            'gelombang_max' => $this->gelombang_max,
            'kategori_gelombang' => $service->hitungKategoriGelombang($this->gelombang_max),
            'peringatan_risiko' => $service->hitungRisikoPelayaran($this->angin_max, $this->gelombang_max),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
