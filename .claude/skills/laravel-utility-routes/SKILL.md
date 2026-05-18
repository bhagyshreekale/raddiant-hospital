---
name: laravel-utility-routes
description: "Add utility routes for Laravel development: /migrate-fresh-seed (runs migrate:fresh --seed), /migrate (runs migrate), /storage-link (creates storage symlink using PHP symlink(), not storage:link). Use when user asks to add utility routes for migrations or storage link."
license: MIT
metadata:
  author: laravel
---

# Laravel Utility Routes

## Purpose

Add three development utility routes with no authentication middleware:
1. `/migrate-fresh-seed` — runs `migrate:fresh --seed`
2. `/migrate` — runs `migrate`
3. `/storage-link` — creates symlink using PHP `symlink()`, not `storage:link` Artisan command

## Implementation

Add to `routes/admin.php` (or `routes/web.php`) **outside** any authenticated middleware groups:

```php
use Illuminate\Support\Facades\Artisan;

// Utility routes (no middleware - for dev only)
Route::get('migrate-fresh-seed', function () {
    Artisan::call('migrate:fresh', ['--seed' => true]);
    return response()->json(['output' => Artisan::output()]);
});

Route::get('migrate', function () {
    Artisan::call('migrate');
    return response()->json(['output' => Artisan::output()]);
});

Route::get('storage-link', function () {
    $target = base_path('storage/app/public');
    $link = public_path('storage');

    if (is_link($link)) {
        return response()->json(['message' => '⚠️ Symlink already exists']);
    }

    if (file_exists($link)) {
        return response()->json(['message' => '⚠️ A file/folder named storage already exists - delete first']);
    }

    if (! function_exists('symlink')) {
        return response()->json(['message' => '❌ symlink() function is disabled']);
    }

    if (@symlink($target, $link)) {
        return response()->json(['message' => '✅ Symlink created successfully']);
    }

    return response()->json(['message' => '❌ symlink() failed']);
});
```

## Notes

- These routes are **intentionally unprotected** — for local development only
- Remove or protect with auth in production
- `storage-link` uses PHP's native `symlink()` function rather than Laravel's `storage:link` command
- All routes return JSON responses for easy debugging