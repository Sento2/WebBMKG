<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminLayananPtspController;
use App\Http\Controllers\AdminProfilController;
use App\Http\Controllers\AdminUploadController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\CitraSatelitController;
use App\Http\Controllers\HalamanPublikController;
use App\Http\Controllers\LayananKhususController;
use App\Http\Controllers\LayananPtspController;
use App\Http\Controllers\PeringatanDiniController;
use App\Http\Controllers\PrakiraanCuacaController;
use App\Http\Controllers\ProfilController;
use App\Http\Middleware\AdminPassword;
use Illuminate\Support\Facades\Route;

// --- API Publik ---
Route::get('/beranda', [HalamanPublikController::class, 'beranda'])->name('api.beranda');
Route::post('/layanan-ptsp/kirim', [LayananPtspController::class, 'store'])->middleware('throttle:ptsp-submit')->name('api.ptsp.store');
Route::get('/cuaca-penerbangan', [LayananKhususController::class, 'penerbangan'])->name('api.cuaca-penerbangan');
Route::get('/cuaca-maritim', [LayananKhususController::class, 'maritim'])->name('api.cuaca-maritim');
Route::get('/profil', [ProfilController::class, 'index'])->name('api.profil');
Route::get('/citra-satelit', [CitraSatelitController::class, 'index'])->name('api.citra-satelit');

// --- API Admin (Hidden Route + Password Middleware) ---
Route::prefix(config('admin.route_prefix'))
    ->middleware(AdminPassword::class)
    ->name('admin.')
    ->group(function () {
        // Dashboard & Utility
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::post('/cek-peringatan', [AdminDashboardController::class, 'triggerCekPeringatan'])->name('cek-peringatan');
        Route::get('/auth-check', fn () => response()->json(['status' => 'success', 'message' => 'Authenticated.']))->name('auth-check');

        // Upload Gambar (Rich Text Editor)
        Route::post('/upload-image', [AdminUploadController::class, 'storeImage'])->name('upload-image');

        // Manajemen Profil
        Route::patch('/profil', [AdminProfilController::class, 'update'])->name('profil.update');

        // Manajemen Berita
        Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
        Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
        Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

        // Manajemen Peringatan Dini
        Route::get('/peringatan-dini', [PeringatanDiniController::class, 'index'])->name('peringatan-dini.index');
        Route::post('/peringatan-dini/update', [PeringatanDiniController::class, 'update'])->name('peringatan-dini.update');

        // Manajemen Prakiraan Cuaca (Read-only)
        Route::get('/cuaca', [PrakiraanCuacaController::class, 'index'])->name('cuaca.index');

        // Manajemen Layanan PTSP
        Route::get('/layanan-ptsp', [AdminLayananPtspController::class, 'index'])->name('ptsp.index');
        Route::patch('/layanan-ptsp/{id}/status', [AdminLayananPtspController::class, 'updateStatus'])->name('ptsp.update-status');
    });
