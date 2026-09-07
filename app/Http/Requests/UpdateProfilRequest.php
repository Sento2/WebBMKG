<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfilRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_stasiun' => 'required|string|max:255',
            'nama_lengkap' => 'nullable|string|max:255',
            'kelas' => 'nullable|string|max:255',
            'kode_wmo' => 'nullable|string|max:255',
            'alamat' => 'required|string',
            'telepon' => 'nullable|string|max:255',
            'fax' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'tugas_pokok' => 'required|string',
            'fungsi' => 'required|string',
            'sejarah_singkat' => 'nullable|string',
            'foto_kantor' => 'nullable|string', // Untuk sekarang string path dulu, bisa diubah jika perlu file upload
            'jam_operasional' => 'nullable|string|max:255',
            'sosial_media' => 'nullable|array',
            'sosial_media.facebook' => 'nullable|url',
            'sosial_media.instagram' => 'nullable|url',
            'sosial_media.twitter' => 'nullable|url',
            'sosial_media.youtube' => 'nullable|url',
        ];
    }
}
