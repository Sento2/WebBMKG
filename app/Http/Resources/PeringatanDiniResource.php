<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PeringatanDiniResource extends JsonResource
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
            'level_bahaya' => $this->level_bahaya,
            'judul_peringatan' => $this->judul_peringatan,
            'deskripsi_wilayah' => $this->deskripsi_wilayah,
            'berlaku_mulai' => $this->berlaku_mulai,
            'berlaku_sampai' => $this->berlaku_sampai,
            'tampilkan_di_web' => $this->tampilkan_di_web,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
