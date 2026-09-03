<?php

namespace App\Models;

use App\Enums\LevelBahaya;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeringatanDini extends Model
{
    use HasFactory;

    protected $fillable = [
        'level_bahaya',
        'judul_peringatan',
        'deskripsi_wilayah',
        'berlaku_mulai',
        'berlaku_sampai',
        'tampilkan_di_web',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'level_bahaya' => LevelBahaya::class,
            'tampilkan_di_web' => 'boolean',
            'berlaku_mulai' => 'datetime',
            'berlaku_sampai' => 'datetime',
        ];
    }
}
