<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule; // Wajib ditambahkan untuk penjadwalan

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Jadwal pengecekan peringatan dini Sulteng setiap 10 menit
Schedule::command('app:cek-peringatan-sulteng')->everyTenMinutes();

// Jadwal penarikan data cuaca dari API BMKG setiap jam 1 pagi
Schedule::command('app:tarik-cuaca-sulteng')->dailyAt('01:00');
