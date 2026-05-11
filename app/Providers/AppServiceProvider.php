<?php

namespace App\Providers;

use App\Models\Admin;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Super Admin gate bypass — Super Admin role has no direct permissions,
        // but this gate before callback grants them access to everything.
        Gate::before(function (?Admin $admin, $ability) {
            return $admin?->hasRole('Super Admin') ? true : null;
        });
    }
}
