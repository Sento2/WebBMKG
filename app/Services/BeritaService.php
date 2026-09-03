<?php

namespace App\Services;

use App\Enums\StatusBerita;
use App\Models\Berita;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BeritaService
{
    /**
     * Ambil semua berita, diurutkan dari terbaru.
     */
    public function getAll(): Collection
    {
        return Berita::orderBy('created_at', 'desc')->get();
    }

    /**
     * Simpan berita baru beserta thumbnail.
     *
     * @param  array{judul: string, konten: string, status: string, thumbnail?: UploadedFile|null}  $data
     */
    public function create(array $data): Berita
    {
        $pathThumbnail = null;
        if (isset($data['thumbnail'])) {
            $pathThumbnail = $data['thumbnail']->store('berita_thumbnails', 'public');
        }

        return Berita::create([
            'judul' => $data['judul'],
            'slug' => Str::slug($data['judul']).'-'.time(),
            'thumbnail' => $pathThumbnail,
            'konten' => $data['konten'],
            'status' => $data['status'],
            'published_at' => $data['status'] === StatusBerita::Published->value ? now() : null,
        ]);
    }

    /**
     * Hapus berita beserta file thumbnail dari storage.
     */
    public function delete(int $id): ?Berita
    {
        $berita = Berita::find($id);

        if (! $berita) {
            return null;
        }

        if ($berita->thumbnail) {
            Storage::disk('public')->delete($berita->thumbnail);
        }

        $berita->delete();

        return $berita;
    }
}
