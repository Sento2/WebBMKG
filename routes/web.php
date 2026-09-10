<?php

use Illuminate\Support\Facades\Route;

// Sajikan aplikasi React SPA untuk seluruh rute web publik (kecuali rute api dan file statis)
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '^(?!api|storage).*$')->name('app');
