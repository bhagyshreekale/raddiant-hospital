---
name: laravel-backup-restore
description: "Build a complete backup and restore system using spatie/laravel-backup with custom restore command (supports MySQL/PostgreSQL/SQLite/SQL Server), Inertia React admin UI, RBAC permissions, and upload-restore flow. Activates when user asks about: backup, restore, spatie/laravel-backup, database dump, mysqldump, backup UI, backup permissions, or backup filesystem."
license: MIT
metadata:
  author: raddiant-hospital
---

# Laravel Backup & Restore System

## Overview

This skill documents a complete backup and restore system built on `spatie/laravel-backup` v10+ for a Laravel + Inertia React app. It includes:

- **`spatie/laravel-backup`** for creating zipped backups (database + storage files + .env)
- **Custom `backup:restore` Artisan command** that handles `.zip` (spatie) and `.tar.gz` (legacy) formats
- **`BackupController`** with Inertia + JSON endpoints (index, create, download, delete, restore, upload-restore)
- **Inertia React admin UI** with confirmation dialogs and status messages
- **RBAC permissions** for granular access control
- **MySQL GTID handling** to avoid `@@GLOBAL.GTID_PURGED` errors during restore

## Installation

```bash
composer require spatie/laravel-backup
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

## Configuration Files

### 1. config/filesystems.php — Add Backups Disk

```php
'disks' => [
    // ... existing disks (local, public, s3)
    
    'backups' => [
        'driver' => 'local',
        'root' => storage_path('app/backups'),
        'throw' => false,
        'report' => false,
    ],
],
```

### 2. config/backup.php — Source & Destination

Key settings in the published `config/backup.php`:

```php
'backup' => [
    // Use '.' as name so files go directly in the disk root (no nested subdirectory)
    'name' => env('BACKUP_NAME', '.'),

    'source' => [
        'files' => [
            'include' => [
                storage_path('app/public'),  // uploaded files
                base_path('.env'),            // environment config
            ],
            'exclude' => [
                base_path('vendor'),
                base_path('node_modules'),
                storage_path('framework'),
            ],
            // Store files relative to project root so restore can map them back
            'relative_path' => base_path(),
        ],
        'databases' => [
            env('DB_CONNECTION', 'mysql'),
        ],
    ],

    'destination' => [
        'disks' => ['backups'],
        'filename_prefix' => '',
    ],
],
```

### 3. config/database.php — mysqldump Binary Path & GTID

Add a `dump` key to your `mysql` (and `mariadb`) connection config:

```php
'mysql' => [
    'driver' => 'mysql',
    // ... standard connection settings ...
    
    'dump' => [
        'dump_binary_path' => '/opt/homebrew/bin/', // adjust per OS
        'use_single_transaction' => true,
        'timeout' => 60 * 5, // 5 minutes
        'add_extra_option' => '--set-gtid-purged=OFF', // prevents GTID conflicts
    ],
],
```

> **Note:** The `dump_binary_path` is critical when the web server PHP process doesn't have `mysqldump` in its PATH (common on macOS Homebrew installs). Use an env variable for production.

## Artisan Commands

### `backup:create` — Wrapper around spatie's `backup:run`

```bash
php artisan backup:create
```

**File:** `app/Console/Commands/BackupCreate.php`

```php
class BackupCreate extends Command
{
    protected $signature = 'backup:create {--name= : Optional custom label}';
    
    public function handle(): int
    {
        $exitCode = Artisan::call('backup:run', [
            '--disable-notifications' => true,
        ]);
        
        // Find and display the latest backup file
        // ...
    }
}
```

### `backup:restore` — Custom multi-format restore command

```bash
php artisan backup:restore <file> [--force]
```

**File:** `app/Console/Commands/BackupRestore.php`

Supports:
- `.zip` files (spatie/laravel-backup format)
- `.tar.gz` files (legacy format)

**How it works:**
1. Resolves the backup file path (absolute path, cwd-relative, or backups-dir-relative)
2. Extracts to a temp directory using `unzip` or `tar -xzf`
3. Finds SQL dump files (`db-dumps/*.sql` → `*.sql` → `**/*.sql`)
4. Restores database using the appropriate driver:
   - **MySQL/MariaDB:** Pipes through `sed` to strip `SET @@GLOBAL.GTID_PURGED` before feeding to `mysql`
   - **PostgreSQL:** `PGPASSWORD=... psql ...`
   - **SQLite:** `sqlite3 ...`
   - **SQL Server:** `sqlcmd ...`
5. Restores storage files (`storage/app/public/...`)
6. Restores `.env` if present
7. Cleans up temp directory with `try/finally`

**Key path resolution logic:**
```php
$backupFile = $filename;
if (! file_exists($backupFile)) {
    if (str_starts_with($filename, '/')) {
        $backupFile = $filename;
    } else {
        $backupFile = $backupsDir.'/'.ltrim($filename, '/');
    }
}
$backupFile = realpath($backupFile); // convert to absolute for shell commands
```

## Routes

**File:** `routes/admin.php`

```php
use App\Http\Controllers\Admin\BackupController;

Route::middleware(['web', 'auth:admin', 'admin'])->group(function () {
    Route::get('admin/backups', [BackupController::class, 'index'])
        ->name('backups.index')
        ->middleware('permission:backups.view-any');
    
    Route::post('admin/backups', [BackupController::class, 'store'])
        ->name('backups.store')
        ->middleware('permission:backups.create');
    
    Route::get('admin/backups/download/{filename}', [BackupController::class, 'download'])
        ->name('backups.download')
        ->where('filename', '.*')
        ->middleware('permission:backups.download');
    
    Route::delete('admin/backups/{filename}', [BackupController::class, 'destroy'])
        ->name('backups.destroy')
        ->where('filename', '.*')
        ->middleware('permission:backups.delete');
    
    Route::post('admin/backups/restore/{filename}', [BackupController::class, 'restore'])
        ->name('backups.restore')
        ->where('filename', '.*')
        ->middleware('permission:backups.restore');
    
    Route::post('admin/backups/upload-restore', [BackupController::class, 'uploadRestore'])
        ->name('backups.upload-restore')
        ->middleware('permission:backups.restore');
});
```

> The `->where('filename', '.*')` constraint is necessary because filenames contain dots (e.g., `2026-05-26-10-49-56.zip`).

## Controller

**File:** `app/Http/Controllers/Admin/BackupController.php`

**Important:** All action endpoints (`store`, `destroy`, `restore`, `uploadRestore`) must return `JsonResponse` — not `RedirectResponse` — because the UI uses `fetch()` which doesn't set `Accept: application/json` or `X-Requested-With: XMLHttpRequest` by default. Checking `$request->wantsJson()` or `$request->ajax()` would return false, causing a redirect that `fetch()` follows to an HTML page.

```php
class BackupController extends Controller
{
    // index() — Lists backups (via Inertia/API)
    public function index(): Response
    {
        // Scan backups disk for .zip and .tar.gz files
        // Sort by newest first
        return Inertia::render('admin/backups/index', ['backups' => $backups]);
    }
    
    // store() — Create a new backup
    public function store(): JsonResponse { /* Artisan::call('backup:run', ...) */ }
    
    // download() — Download a backup file
    public function download(string $filename): BinaryFileResponse|StreamedResponse|JsonResponse { /* ... */ }
    
    // destroy() — Delete a backup
    public function destroy(string $filename): JsonResponse { /* ... */ }
    
    // restore() — Restore from an existing backup on disk
    public function restore(string $filename): JsonResponse { /* Artisan::call('backup:restore', ...) */ }
    
    // uploadRestore() — Upload a backup file and restore it
    public function uploadRestore(Request $request): JsonResponse { /* validates .zip/.tar.gz, saves, restores, cleans up */ }
}
```

## UI (Inertia React)

**File:** `resources/js/pages/admin/backups/index.tsx`

Key features:
- **Backup table** with filename, size, created date, and action buttons
- **Create Backup** button with loading spinner
- **Download** via dynamically created anchor element
- **Delete** with confirmation dialog
- **Restore** with warning dialog (overwrites database + files)
- **Upload & Restore** with hidden file input and confirmation dialog
- **Status messages** (success/error) displayed as alert banners
- **Page auto-reload** after successful restore

**Important implementation details:**
- Uses `fetch()` for API calls — NOT Inertia's `router.post()` — because these are standalone actions, not page navigations
- CSRF token read from `<meta name="csrf-token">` tag
- `router.reload({ only: ['backups'] })` used to refresh the backup list after create/delete
- `window.location.reload()` used after restore (since the database and files changed)
- File input's `accept=".zip,.tar.gz"` limits upload to supported formats

## Permissions

**File:** `database/seeders/RoleAndPermissionSeeder.php`

```php
'backups.view-any',
'backups.create',
'backups.download',
'backups.delete',
'backups.restore',
```

These permissions are in the `$adminPermissions` array and given to the `Admin` role.

**File:** `database/seeders/UpdatePermissionGroupsSeeder.php`

The group extractor ensures `backups.*` permissions are grouped under `'backups'`:

```php
$group = $parts[0] === 'backups' ? 'backups' : ($parts[0] ?? $permission->name);
```

## Sidebar Navigation

**File:** `resources/js/components/app-sidebar.tsx`

```tsx
import { HardDrive } from 'lucide-react';

const adminNavItems: NavItem[] = [
    // ... existing items ...
    {
        title: 'Backups',
        href: '/admin/backups',
        icon: HardDrive,
        permission: 'backups.view-any',
    },
];
```

## Troubleshooting

### 1. "The dump process failed with a non-successful exit code"

**Cause:** `mysqldump` is not in the web server PHP process's PATH.

**Fix:** Add `dump_binary_path` to the database connection's `dump` config:

```php
'dump' => [
    'dump_binary_path' => '/opt/homebrew/bin/',
    // ...
],
```

Locate `mysqldump` with: `which mysqldump`

### 2. `fetch()` response fails with "Unexpected token < in JSON"

**Cause:** The controller returned a `RedirectResponse` (HTML) instead of `JsonResponse` because `$request->wantsJson()` returned false (fetch doesn't set the `Accept` header by default).

**Fix:** Remove `wantsJson()`/`ajax()` checks and always return `JsonResponse` from these endpoints. See Controller section above.

### 3. `@@GLOBAL.GTID_PURGED cannot be changed`

**Cause:** The mysqldump includes `SET @@GLOBAL.GTID_PURGED` which conflicts with MySQL's existing GTID_EXECUTED state.

**Fix (existing backups):** The restore command pipes through `sed` to strip the line:
```php
'sed "/^SET @@GLOBAL\\.GTID_PURGED/d" %s | mysql ...'
```

**Fix (future backups):** Add `--set-gtid-purged=OFF` to the database dump config.

### 4. Backups stored in nested subdirectory

**Cause:** The backup name in `config/backup.php` creates a subdirectory on the destination disk.

**Fix:** Set `'name' => env('BACKUP_NAME', '.')` — using `'.'` causes files to land directly at the disk root.

### 5. Backup file path gets doubled

**Cause:** The `backup:restore` command prepends the backups directory to non-absolute paths, but the controller already passes the full path.

**Fix:** The command first checks `file_exists()` on the raw path before prepending, and then calls `realpath()` for absolute path resolution.

## Edge Cases Handled

- **Both `.zip` and `.tar.gz` formats** — supports spatie backups and legacy tar.gz backups
- **Multiple database drivers** — MySQL, MariaDB, PostgreSQL, SQLite, SQL Server
- **`.env` restoration** — backs up and restores the `.env` file
- **Storage files with project-relative paths** — correctly maps `storage/app/public/...` back to `storage_path('app/public')`
- **Temp directory cleanup** — guaranteed via `try/finally` (cleans up even on failure)
- **GTID-enabled MySQL servers** — `sed` filter strips problematic `SET @@GLOBAL.GTID_PURGED` line
- **File upload size** — validated up to 500MB via `max:'.(1024 * 500)`
- **Restore confirmation** — requires `--force` flag or interactive confirmation
