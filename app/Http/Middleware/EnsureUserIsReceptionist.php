<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsReceptionist
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()->isReceptionist() && ! $request->user()->isAdmin()) {
            abort(403, 'You do not have permission to access this resource.');
        }

        return $next($request);
    }
}
