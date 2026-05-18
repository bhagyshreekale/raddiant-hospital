<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $admin = auth()->guard('admin')->user();

        if (! $admin || ! $admin->hasRole('Super Admin')) {
            abort(403, 'Only Super Admin can perform this action.');
        }

        return $next($request);
    }
}
