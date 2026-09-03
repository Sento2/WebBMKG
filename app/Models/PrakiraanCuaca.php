<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrakiraanCuaca extends Model
{
    use HasFactory;

    protected $fillable = [
        'wilayah',
        'waktu_prakiraan',
        'kondisi',
        'ikon_cuaca',
        'suhu',
        'kelembapan',
        'arah_kecepatan_angin',
    ];
}
