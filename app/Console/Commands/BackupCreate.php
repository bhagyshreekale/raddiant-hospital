<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class BackupCreate extends Command
{
    protected $signature = 'backup:create {--name= : Optional custom label for the backup}';

    protected $description = 'Create a full backup using spatie/laravel-backup (database + uploads + .env)';

    public function handle(): int
    {
        $this->info('Starting backup via spatie/laravel-backup...');

        $exitCode = Artisan::call('backup:run', [
            '--only-db' => false,
            '--only-files' => false,
            '--disable-notifications' => true,
        ]);

        $output = Artisan::output();

        if ($exitCode !== 0) {
            $this->error('Backup failed:');
            $this->line($output);

            return Command::FAILURE;
        }

        // Find the latest backup file
        $backupsDir = Storage::disk('backups')->path('');
        $files = glob($backupsDir.'*.zip');
        if (! empty($files)) {
            $latest = null;
            $latestTime = 0;
            foreach ($files as $file) {
                $time = filemtime($file);
                if ($time > $latestTime) {
                    $latestTime = $time;
                    $latest = $file;
                }
            }
            if ($latest) {
                $size = $this->formatSize(filesize($latest));
                $filename = basename($latest);
                $this->info("✓ Backup created: {$filename} ({$size})");
            }
        }

        return Command::SUCCESS;
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
