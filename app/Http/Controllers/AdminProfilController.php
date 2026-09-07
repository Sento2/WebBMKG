<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfilRequest;
use App\Http\Resources\ProfilResource;
use App\Services\ProfilService;
use Illuminate\Http\JsonResponse;

class AdminProfilController extends Controller
{
    public function __construct(
        private ProfilService $profilService,
    ) {}

    /**
     * Update profil stasiun oleh admin.
     */
    public function update(UpdateProfilRequest $request): JsonResponse
    {
        $profil = $this->profilService->updateProfil($request->validated());

        return (new ProfilResource($profil))
            ->additional(['status' => 'success', 'message' => 'Profil berhasil diupdate.'])
            ->response()
            ->setStatusCode(200);
    }
}
