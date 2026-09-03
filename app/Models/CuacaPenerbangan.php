<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CuacaPenerbangan extends Model
{
    protected $fillable = [
        'nama_bandara', 'waktu_pengamatan', 'arah_kecepatan_angin',
        'jarak_pandang', 'kondisi_cuaca', 'suhu', 'titik_embun', 'tekanan_udara',
    ];
}
