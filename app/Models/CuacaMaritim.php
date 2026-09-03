<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CuacaMaritim extends Model
{
    protected $fillable = [
        'wilayah_perairan', 'waktu_berlaku_mulai', 'waktu_berlaku_sampai',
        'kondisi_cuaca', 'arah_angin', 'angin_min', 'angin_max',
        'gelombang_min', 'gelombang_max', 'kategori_gelombang', 'peringatan_risiko',
    ];
}
