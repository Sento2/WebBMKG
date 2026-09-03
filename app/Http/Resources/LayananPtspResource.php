<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LayananPtspResource extends JsonResource
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
            'kode_tiket' => $this->kode_tiket,
            'nama_lengkap' => $this->nama_lengkap,
            'email_whatsapp' => $this->email_whatsapp,
            'asal_instansi_universitas' => $this->asal_instansi_universitas,
            'keperluan_data' => $this->keperluan_data,
            'status_permohonan' => $this->status_permohonan,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
