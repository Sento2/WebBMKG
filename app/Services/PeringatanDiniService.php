<?php

namespace App\Services;

use App\Models\PeringatanDini;

class PeringatanDiniService
{
    /**
     * Ambil data peringatan dini aktif (baris pertama).
     */
    public function getCurrent(): ?PeringatanDini
    {
        return PeringatanDini::first();
    }

    /**
     * Update atau buat peringatan dini (upsert pada ID 1).
     *
     * @param  array{level_bahaya: string, judul_peringatan: string, deskripsi_wilayah: string, tampilkan_di_web: bool}  $data
     */
    public function upsert(array $data): PeringatanDini
    {
        $peringatan = PeringatanDini::firstOrNew(['id' => 1]);

        $peringatan->level_bahaya = $data['level_bahaya'];
        $peringatan->judul_peringatan = $data['judul_peringatan'];
        $peringatan->deskripsi_wilayah = $data['deskripsi_wilayah'];
        $peringatan->tampilkan_di_web = $data['tampilkan_di_web'];
        $peringatan->berlaku_mulai = now();
        $peringatan->berlaku_sampai = now()->addHours(6);
        $peringatan->save();

        return $peringatan;
    }
}
