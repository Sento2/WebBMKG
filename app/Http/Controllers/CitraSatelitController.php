<?php

namespace App\Http\Controllers;

use App\Services\CitraSatelitService;
use Illuminate\Http\JsonResponse;

class CitraSatelitController extends Controller
{
    public function __construct(
        private CitraSatelitService $citraSatelitService,
    ) {}

    /**
     * Ambil URL citra satelit BMKG terkini.
     */
    public function index(): JsonResponse
    {
        $data = $this->citraSatelitService->getCitraTerkini();

        return response()->json([
            'status' => 'success',
            'data' => $data,
        ], 200);
    }
}
