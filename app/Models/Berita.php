<?php

namespace App\Models;

use App\Enums\StatusBerita;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'slug',
        'thumbnail',
        'konten',
        'status',
        'published_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => StatusBerita::class,
            'published_at' => 'datetime',
        ];
    }
}
