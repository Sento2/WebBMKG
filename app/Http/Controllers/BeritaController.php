<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBeritaRequest;
use App\Http\Resources\BeritaResource;
use App\Services\BeritaService;
use Illuminate\Http\JsonResponse;

class BeritaController extends Controller
{
    public function __construct(
        private BeritaService $beritaService,
    ) {}

    /**
     * Menampilkan semua berita untuk tabel di Admin Panel.
     */
    public function index(): JsonResponse
    {
        $berita = $this->beritaService->getAll();

        return BeritaResource::collection($berita)
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Admin menyimpan berita baru (Create).
     */
    public function store(StoreBeritaRequest $request): JsonResponse
    {
        $berita = $this->beritaService->create($request->validated() + [
            'thumbnail' => $request->file('thumbnail'),
        ]);

        return (new BeritaResource($berita))
            ->additional(['status' => 'success', 'message' => 'Berita berhasil ditambahkan'])
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Admin menghapus berita (Delete).
     */
    public function destroy(int $id): JsonResponse
    {
        $berita = $this->beritaService->delete($id);

        if (! $berita) {
            return response()->json(['status' => 'error', 'message' => 'Berita tidak ditemukan'], 404);
        }

        return response()->json(['status' => 'success', 'message' => 'Berita berhasil dihapus'], 200);
    }
}
