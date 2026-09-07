<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\LayananPtsp;
use App\Models\PeringatanDini;
use App\Services\BmkgPeringatanDiniScraperService;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function __construct(
        private BmkgPeringatanDiniScraperService $scraperService,
    ) {}

    /**
     * Ringkasan statistik untuk dashboard admin.
     */
    public function index(): JsonResponse
    {
        $peringatan = PeringatanDini::find(1);

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_berita' => Berita::count(),
                'berita_published' => Berita::where('status', 'published')->count(),
                'berita_draft' => Berita::where('status', 'draft')->count(),
                'ptsp_menunggu' => LayananPtsp::where('status_permohonan', 'menunggu')->count(),
                'ptsp_diproses' => LayananPtsp::where('status_permohonan', 'diproses')->count(),
                'ptsp_selesai' => LayananPtsp::where('status_permohonan', 'selesai')->count(),
                'ptsp_total' => LayananPtsp::count(),
                'peringatan_dini' => [
                    'aktif' => $peringatan?->tampilkan_di_web ?? false,
                    'level' => $peringatan?->level_bahaya,
                    'judul' => $peringatan?->judul_peringatan,
                    'terakhir_update' => $peringatan?->updated_at,
                ],
            ],
        ], 200);
    }

    /**
     * Trigger pengecekan peringatan dini BMKG secara manual dari admin panel.
     */
    public function triggerCekPeringatan(): JsonResponse
    {
        $hasil = $this->scraperService->cekDanUpdatePeringatan();

        return response()->json([
            'status' => 'success',
            'data' => [
                'ditemukan' => $hasil['ditemukan'],
                'pesan' => $hasil['pesan'],
            ],
        ], 200);
    }
}
