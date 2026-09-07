<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    protected $fillable = [
        'nama_stasiun',
        'nama_lengkap',
        'kelas',
        'kode_wmo',
        'alamat',
        'telepon',
        'fax',
        'email',
        'website',
        'latitude',
        'longitude',
        'visi',
        'misi',
        'tugas_pokok',
        'fungsi',
        'sejarah_singkat',
        'foto_kantor',
        'jam_operasional',
        'sosial_media',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sosial_media' => 'array',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }
}
