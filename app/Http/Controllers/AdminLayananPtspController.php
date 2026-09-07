<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateStatusPermohonanRequest;
use App\Http\Resources\LayananPtspResource;
use App\Services\LayananPtspService;
use Illuminate\Http\JsonResponse;

class AdminLayananPtspController extends Controller
{
    public function __construct(
        private LayananPtspService $layananPtspService,
    ) {}

    /**
     * Menampilkan semua permohonan PTSP untuk admin.
     */
    public function index(): JsonResponse
    {
        $permohonan = $this->layananPtspService->getAll();

        return LayananPtspResource::collection($permohonan)
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Admin mengubah status permohonan (menunggu → diproses → selesai).
     */
    public function updateStatus(UpdateStatusPermohonanRequest $request, int $id): JsonResponse
    {
        $permohonan = $this->layananPtspService->updateStatus(
            $id,
            $request->validated()['status_permohonan']
        );

        if (! $permohonan) {
            return response()->json([
                'status' => 'error',
                'message' => 'Permohonan tidak ditemukan.',
            ], 404);
        }

        return (new LayananPtspResource($permohonan))
            ->additional(['status' => 'success', 'message' => 'Status permohonan berhasil diupdate.'])
            ->response()
            ->setStatusCode(200);
    }
}
