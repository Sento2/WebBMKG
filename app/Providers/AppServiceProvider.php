<?php

namespace App\Providers;

use GuzzleHttp\Client;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Client::class, function () {
            return new Client([
                'verify' => false,
                'timeout' => 30,
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('ptsp-submit', function (Request $request) {
            // Batasi 3 permohonan per jam per IP Address
            return Limit::perHour(3)->by($request->ip());
        });
    }
}
