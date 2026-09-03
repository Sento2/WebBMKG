<?php

use App\Http\Controllers\HalamanPublikController;
use App\Http\Controllers\LayananPtspController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HalamanPublikController::class, 'beranda'])->name('beranda');

// Rute untuk memproses form pengajuan data PTSP dari masyarakat
Route::post('/layanan-ptsp/kirim', [LayananPtspController::class, 'store'])->name('ptsp.store');
