<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BackupController extends Controller
{
    public function index(): Response
    {
        $backups = [];
        $backupsDir = Storage::disk('backups')->path('');

        if (is_dir($backupsDir)) {
            // Support both .zip (spatie) and .tar.gz (legacy) formats
            $files = array_merge(
                glob($backupsDir.'/*.zip') ?: [],
                glob($backupsDir.'/*.tar.gz') ?: [],
            );

            foreach ($files as $file) {
                $filename = basename($file);
                $backups[] = [
                    'filename' => $filename,
                    'size' => filesize($file),
                    'size_formatted' => $this->formatSize(filesize($file)),
                    'created_at' => date('Y-m-d H:i:s', filemtime($file)),
                ];
            }

            // Sort by newest first
            usort($backups, fn ($a, $b) => strtotime($b['created_at']) - strtotime($a['created_at']));
        }

        return Inertia::render('admin/backups/index', ['backups' => $backups]);
    }

    public function store(): JsonResponse
    {
        $exitCode = Artisan::call('backup:run', [
            '--disable-notifications' => true,
        ]);
        $output = Artisan::output();

        if ($exitCode !== 0) {
            return response()->json([
                'message' => 'Backup failed. Check server logs for details.',
                'output' => $output,
            ], 500);
        }

        $backupsDir = Storage::disk('backups')->path('');
        $latestBackup = null;
        $latestTime = 0;

        if (is_dir($backupsDir)) {
            $files = glob($backupsDir.'/*.zip');
            if ($files) {
                foreach ($files as $file) {
                    $time = filemtime($file);
                    if ($time > $latestTime) {
                        $latestTime = $time;
                        $latestBackup = basename($file);
                    }
                }
            }
        }

        return response()->json([
            'message' => 'Backup created successfully',
            'filename' => $latestBackup,
        ]);
    }

    public function download(string $filename): BinaryFileResponse|StreamedResponse|JsonResponse
    {
        $backupsDisk = Storage::disk('backups');
        $safeFilename = basename($filename);

        if (! $backupsDisk->exists($safeFilename)) {
            return response()->json(['message' => 'Backup file not found'], 404);
        }

        return $backupsDisk->download($safeFilename);
    }

    public function destroy(string $filename): JsonResponse
    {
        $backupsDisk = Storage::disk('backups');
        $safeFilename = basename($filename);

        if (! $backupsDisk->exists($safeFilename)) {
            return response()->json(['message' => 'Backup file not found'], 404);
        }

        $backupsDisk->delete($safeFilename);

        return response()->json(['message' => 'Backup deleted successfully']);
    }

    public function uploadRestore(Request $request): JsonResponse
    {
        $request->validate([
            'backup_file' => ['required', 'file', 'mimes:zip,gz,tar', 'max:'.(1024 * 500)],
        ]);

        $file = $request->file('backup_file');
        $originalName = $file->getClientOriginalName();

        // Accept .zip (spatie) or .tar.gz (legacy)
        $isValid = str_ends_with($originalName, '.zip')
            || str_ends_with($originalName, '.tar.gz');

        if (! $isValid) {
            return response()->json(['message' => 'Only .zip and .tar.gz backup files are accepted'], 422);
        }

        $backupsDisk = Storage::disk('backups');
        $backupsDir = $backupsDisk->path('');

        if (! is_dir($backupsDir)) {
            mkdir($backupsDir, 0755, true);
        }

        $timestamp = now()->format('Y-m-d_H-i-s');
        $storedName = 'uploaded_'.$timestamp.'_'.$originalName;
        $file->move($backupsDir, $storedName);

        $filePath = $backupsDir.'/'.$storedName;

        // Run restore
        $exitCode = Artisan::call('backup:restore', [
            'file' => $filePath,
            '--force' => true,
            '--no-interaction' => true,
        ]);
        $output = Artisan::output();

        // Clean up uploaded file
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        if ($exitCode !== 0) {
            return response()->json([
                'message' => 'Restore failed',
                'output' => $output,
            ], 500);
        }

        return response()->json([
            'message' => 'Backup restored successfully from uploaded file',
            'output' => $output,
        ]);
    }

    public function restore(string $filename): JsonResponse
    {
        $backupsDisk = Storage::disk('backups');
        $backupsDir = $backupsDisk->path('');
        $safeFilename = basename($filename);
        $filePath = $backupsDir.'/'.$safeFilename;

        if (! file_exists($filePath)) {
            return response()->json(['message' => 'Backup file not found'], 404);
        }

        $exitCode = Artisan::call('backup:restore', [
            'file' => $filePath,
            '--force' => true,
            '--no-interaction' => true,
        ]);
        $output = Artisan::output();

        if ($exitCode !== 0) {
            return response()->json([
                'message' => 'Restore failed',
                'output' => $output,
            ], 500);
        }

        return response()->json([
            'message' => 'Backup restored successfully',
            'output' => $output,
        ]);
    }

    private function formatSize(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }

        return round($bytes, 2).' '.$units[$i];
    }
}
