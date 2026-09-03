<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\HalamanPublikController;
use App\Http\Controllers\LayananKhususController;
use App\Http\Controllers\LayananPtspController;
use App\Http\Controllers\PeringatanDiniController;
use App\Http\Controllers\PrakiraanCuacaController;
use Illuminate\Support\Facades\Route;

// --- API Publik ---
Route::get('/beranda', [HalamanPublikController::class, 'beranda'])->name('api.beranda');
Route::post('/layanan-ptsp/kirim', [LayananPtspController::class, 'store'])->name('api.ptsp.store');
Route::get('/cuaca-penerbangan', [LayananKhususController::class, 'penerbangan'])->name('api.cuaca-penerbangan');
Route::get('/cuaca-maritim', [LayananKhususController::class, 'maritim'])->name('api.cuaca-maritim');

// --- API Admin ---
Route::prefix('admin')->name('admin.')->group(function () {
    // Manajemen Berita
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

    // Manajemen Peringatan Dini
    Route::get('/peringatan-dini', [PeringatanDiniController::class, 'index'])->name('peringatan-dini.index');
    Route::post('/peringatan-dini/update', [PeringatanDiniController::class, 'update'])->name('peringatan-dini.update');

    // Manajemen Prakiraan Cuaca (Hanya GET)
    Route::get('/cuaca', [PrakiraanCuacaController::class, 'index'])->name('cuaca.index');
});
