<?php

namespace App\Http\Controllers;

use App\Http\Resources\PrakiraanCuacaResource;
use App\Services\PrakiraanCuacaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PrakiraanCuacaController extends Controller
{
    public function __construct(
        private PrakiraanCuacaService $prakiraanCuacaService,
    ) {}

    /**
     * Menampilkan data prakiraan cuaca dengan filter wilayah opsional.
     *
     * Input/Update/Delete di-handle otomatis oleh Command.
     */
    public function index(Request $request): JsonResponse
    {
        $cuaca = $this->prakiraanCuacaService->search($request->query('wilayah'));

        return PrakiraanCuacaResource::collection($cuaca)
            ->response()
            ->setStatusCode(200);
    }
}
