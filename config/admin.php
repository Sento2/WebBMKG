<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin Route Prefix (Hidden Route)
    |--------------------------------------------------------------------------
    |
    | Prefix URL untuk admin panel API. Gunakan string acak/rahasia agar
    | endpoint admin tidak mudah ditebak oleh publik.
    | URL final: /api/{prefix}/berita, /api/{prefix}/peringatan-dini, dll.
    |
    */

    'route_prefix' => env('ADMIN_ROUTE_PREFIX', 'bmkg-portal-sulteng'),

    /*
    |--------------------------------------------------------------------------
    | Admin Password
    |--------------------------------------------------------------------------
    |
    | Password sederhana untuk mengakses admin panel.
    | Dikirim oleh frontend melalui header X-Admin-Token.
    |
    */

    'password' => env('ADMIN_PASSWORD', 'admin-bmkg-2026'),

];
