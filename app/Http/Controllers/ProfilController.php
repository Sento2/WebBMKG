<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfilResource;
use App\Services\ProfilService;
use Illuminate\Http\JsonResponse;

class ProfilController extends Controller
{
    public function __construct(
        private ProfilService $profilService,
    ) {}

    /**
     * Menampilkan profil stasiun untuk publik.
     */
    public function index(): JsonResponse
    {
        $profil = $this->profilService->getProfil();

        if (! $profil) {
            return response()->json([
                'status' => 'error',
                'message' => 'Profil belum disetup.',
            ], 404);
        }

        return (new ProfilResource($profil))
            ->additional(['status' => 'success'])
            ->response()
            ->setStatusCode(200);
    }
}
