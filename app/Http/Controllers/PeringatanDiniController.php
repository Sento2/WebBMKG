<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePeringatanDiniRequest;
use App\Http\Resources\PeringatanDiniResource;
use App\Services\PeringatanDiniService;
use Illuminate\Http\JsonResponse;

class PeringatanDiniController extends Controller
{
    public function __construct(
        private PeringatanDiniService $peringatanDiniService,
    ) {}

    /**
     * Mengambil data peringatan dini saat ini untuk diedit admin.
     */
    public function index(): JsonResponse
    {
        $peringatan = $this->peringatanDiniService->getCurrent();

        return response()->json([
            'status' => 'success',
            'data' => $peringatan ? new PeringatanDiniResource($peringatan) : null,
        ], 200);
    }

    /**
     * Admin memperbarui atau menyalakan/mematikan peringatan dini manual.
     */
    public function update(UpdatePeringatanDiniRequest $request): JsonResponse
    {
        $peringatan = $this->peringatanDiniService->upsert($request->validated());

        return (new PeringatanDiniResource($peringatan))
            ->additional(['status' => 'success', 'message' => 'Status peringatan dini berhasil diupdate'])
            ->response()
            ->setStatusCode(200);
    }
}
