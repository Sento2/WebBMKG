<?php

namespace App\Models;

use App\Enums\StatusPermohonan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LayananPtsp extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_tiket',
        'nama_lengkap',
        'email_whatsapp',
        'asal_instansi_universitas',
        'keperluan_data',
        'file_ktp_surat',
        'status_permohonan',
        'file_balasan_admin',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status_permohonan' => StatusPermohonan::class,
        ];
    }
}
