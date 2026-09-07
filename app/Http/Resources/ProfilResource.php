<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfilResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_stasiun' => $this->nama_stasiun,
            'nama_lengkap' => $this->nama_lengkap,
            'kelas' => $this->kelas,
            'kode_wmo' => $this->kode_wmo,
            'alamat' => $this->alamat,
            'telepon' => $this->telepon,
            'fax' => $this->fax,
            'email' => $this->email,
            'website' => $this->website,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'visi' => $this->visi,
            'misi' => $this->misi,
            'tugas_pokok' => $this->tugas_pokok,
            'fungsi' => $this->fungsi,
            'sejarah_singkat' => $this->sejarah_singkat,
            'foto_kantor' => $this->foto_kantor
                ? asset('storage/'.$this->foto_kantor)
                : null,
            'jam_operasional' => $this->jam_operasional,
            'sosial_media' => $this->sosial_media,
        ];
    }
}
