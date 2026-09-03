<?php

namespace App\Http\Controllers;

use App\Http\Resources\CuacaMaritimResource;
use App\Http\Resources\CuacaPenerbanganResource;
use App\Services\CuacaMaritimService;
use App\Services\CuacaPenerbanganService;
use Illuminate\Http\JsonResponse;

class LayananKhususController extends Controller
{
    public function __construct(
        private CuacaPenerbanganService $cuacaPenerbanganService,
        private CuacaMaritimService $cuacaMaritimService,
    ) {}

    /**
     * API untuk tim React mengambil data penerbangan.
     */
    public function penerbangan(): JsonResponse
    {
        $data = $this->cuacaPenerbanganService->getTerbaru();

        return CuacaPenerbanganResource::collection($data)
            ->response()
            ->setStatusCode(200);
    }

    /**
     * API untuk tim React mengambil data maritim beserta hasil algoritma.
     *
     * Algoritma klasifikasi gelombang dan risiko pelayaran
     * dihitung on-the-fly di CuacaMaritimResource.
     */
    public function maritim(): JsonResponse
    {
        $data = $this->cuacaMaritimService->getAktif();

        return CuacaMaritimResource::collection($data)
            ->response()
            ->setStatusCode(200);
    }
}
