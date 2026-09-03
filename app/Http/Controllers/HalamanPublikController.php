<?php

namespace App\Http\Controllers;

use App\Http\Resources\BeritaResource;
use App\Http\Resources\PeringatanDiniResource;
use App\Http\Resources\PrakiraanCuacaResource;
use App\Services\BerandaService;
use Illuminate\Http\JsonResponse;

class HalamanPublikController extends Controller
{
    public function __construct(
        private BerandaService $berandaService,
    ) {}

    /**
     * Mengambil seluruh data untuk halaman beranda publik.
     */
    public function beranda(): JsonResponse
    {
        $data = $this->berandaService->getData();

        return response()->json([
            'status' => 'success',
            'data' => [
                'peringatan' => $data['peringatan']
                    ? new PeringatanDiniResource($data['peringatan'])
                    : null,
                'berita_terbaru' => BeritaResource::collection($data['berita_terbaru']),
                'cuaca_hari_ini' => PrakiraanCuacaResource::collection($data['cuaca_hari_ini']),
            ],
        ], 200);
    }
}
