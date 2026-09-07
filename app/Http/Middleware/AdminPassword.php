<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminPassword
{
    /**
     * Cek header X-Admin-Token terhadap password di config/admin.php.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-Admin-Token');
        $password = config('admin.password');

        if (! $token || $token !== $password) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized. Token admin tidak valid.',
            ], 401);
        }

        return $next($request);
    }
}
