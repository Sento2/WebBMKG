<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLayananPtspRequest;
use App\Services\LayananPtspService;
use Illuminate\Http\JsonResponse;

class LayananPtspController extends Controller
{
    public function __construct(
        private LayananPtspService $layananPtspService,
    ) {}

    /**
     * Memproses form pengajuan data PTSP dari masyarakat.
     */
    public function store(StoreLayananPtspRequest $request): JsonResponse
    {
        $result = $this->layananPtspService->submitPermohonan(
            $request->validated() + ['file_ktp_surat' => $request->file('file_ktp_surat')]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Permohonan berhasil dikirim!',
            'data' => [
                'kode_tiket' => $result['kode_tiket'],
            ],
        ], 201);
    }
}
