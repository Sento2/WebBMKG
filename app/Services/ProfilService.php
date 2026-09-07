<?php

namespace App\Services;

use App\Models\Profil;

class ProfilService
{
    /**
     * Ambil profil stasiun (singleton, selalu ID=1).
     */
    public function getProfil(): ?Profil
    {
        return Profil::first();
    }

    /**
     * Update profil stasiun oleh admin.
     *
     * @param  array<string, mixed>  $data
     */
    public function updateProfil(array $data): Profil
    {
        $profil = Profil::firstOrNew(['id' => 1]);
        $profil->fill($data);
        $profil->save();

        return $profil;
    }
}
