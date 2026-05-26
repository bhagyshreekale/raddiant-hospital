<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class BackupRestore extends Command
{
    protected $signature = 'backup:restore {file : The backup filename or path (e.g., 2026-01-01-12-00-00.zip)} {--force : Skip the confirmation prompt}';

    protected $description = 'Restore a full backup from a .zip (spatie/laravel-backup) or .tar.gz (legacy) file';

    public function handle(): int
    {
        $filename = $this->argument('file');
        $backupsDir = Storage::disk('backups')->path('');

        // Resolve the backup file path:
        // 1. If absolute path, use as-is
        // 2. If file exists relative to cwd, use it
        // 3. Otherwise, resolve relative to backups directory
        $backupFile = $filename;
        if (! file_exists($backupFile)) {
            if (str_starts_with($filename, '/')) {
                $backupFile = $filename;
            } else {
                $backupFile = $backupsDir.'/'.ltrim($filename, '/');
            }
        }
        $backupFile = realpath($backupFile);

        if (! file_exists($backupFile)) {
            $this->error("Backup file not found: {$backupFile}");

            return Command::FAILURE;
        }

        $this->warn('⚠️  RESTORE WILL OVERWRITE YOUR CURRENT DATABASE AND FILES!');
        $this->warn('   This action cannot be undone.');

        if (! $this->option('force') && ! $this->confirm('Are you sure you want to proceed with the restore?')) {
            $this->info('Restore cancelled.');

            return Command::SUCCESS;
        }

        $restoreDir = $backupsDir.'/restore_temp_'.now()->timestamp;

        if (is_dir($restoreDir)) {
            exec('rm -rf '.escapeshellarg($restoreDir));
        }
        mkdir($restoreDir, 0755, true);

        try {
            // 1. Extract archive (support both .zip and .tar.gz)
            $this->line('Extracting backup archive...');
            if (str_ends_with($backupFile, '.tar.gz')) {
                $extractCommand = sprintf(
                    'cd %s && tar -xzf %s 2>&1',
                    escapeshellarg($restoreDir),
                    escapeshellarg($backupFile)
                );
            } else {
                $extractCommand = sprintf(
                    'cd %s && unzip -o %s 2>&1',
                    escapeshellarg($restoreDir),
                    escapeshellarg($backupFile)
                );
            }
            exec($extractCommand, $output, $exitCode);

            if ($exitCode !== 0) {
                $this->error('Failed to extract archive: '.implode("\n", $output));

                return Command::FAILURE;
            }
            $this->info('✓ Archive extracted');

            // Handle tar.gz structure: files are inside a subdirectory
            if (str_ends_with($backupFile, '.tar.gz')) {
                $items = array_diff(scandir($restoreDir), ['.', '..']);
                foreach ($items as $item) {
                    $fullPath = $restoreDir.'/'.$item;
                    if (is_dir($fullPath) && $item !== 'restore_temp') {
                        // Move contents up
                        exec('cp -r '.escapeshellarg($fullPath.'/.').' '.escapeshellarg($restoreDir));
                        exec('rm -rf '.escapeshellarg($fullPath));
                        break;
                    }
                }
            }

            // Find database dump file
            $dumpFiles = $this->findSqlDumps($restoreDir);

            // 2. Restore database
            if (! empty($dumpFiles)) {
                $dumpFile = $dumpFiles[0];
                $this->line('Restoring database from: '.basename($dumpFile));

                $defaultConnection = config('database.default');
                $db = config('database.connections.'.$defaultConnection);
                $driver = $db['driver'] ?? 'mysql';

                $exitCode = match ($driver) {
                    'mysql', 'mariadb' => $this->restoreMySql($dumpFile, $db),
                    'pgsql' => $this->restorePostgres($dumpFile, $db),
                    'sqlite' => $this->restoreSqlite($dumpFile, $db),
                    'sqlsrv' => $this->restoreSqlSrv($dumpFile, $db),
                    default => Command::FAILURE,
                };

                if ($exitCode !== 0) {
                    $this->error('Database restore failed. Check the error output above.');

                    return Command::FAILURE;
                }
                $this->info('✓ Database restored');
            } else {
                $this->warn('No database.sql found in backup, skipping database restore...');
            }

            // 3. Restore storage files
            $this->line('Restoring storage files...');
            $this->restoreStorageFiles($restoreDir);

            // 4. Restore .env if present
            $envFile = $restoreDir.'/.env';
            if (file_exists($envFile)) {
                $this->line('Restoring .env file...');
                copy($envFile, base_path('.env'));
                $this->info('✓ .env restored');
            } else {
                $this->warn('No .env file found in backup, skipping...');
            }

            $this->info("\n✅ Restore completed successfully!");
            $this->warn('💡 Run `php artisan optimize` to clear cached config.');

            return Command::SUCCESS;
        } finally {
            // Always clean up temp directory
            if (is_dir($restoreDir)) {
                exec('rm -rf '.escapeshellarg($restoreDir));
            }
        }
    }

    private function findSqlDumps(string $dir): array
    {
        // spatie/laravel-backup stores dumps as: db-dumps/<connection>-<database>.sql
        $files = glob($dir.'/db-dumps/*.sql') ?: [];
        if (empty($files)) {
            $files = glob($dir.'/*.sql') ?: [];
        }
        if (empty($files)) {
            $files = glob($dir.'/**/*.sql') ?: [];
        }

        return $files;
    }

    private function restoreStorageFiles(string $restoreDir): void
    {
        $publicTarget = storage_path('app/public');
        $storagePrefix = 'storage/app/public/';

        $iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($restoreDir, \RecursiveDirectoryIterator::SKIP_DOTS)
        );

        $copied = false;
        foreach ($iterator as $item) {
            $relativePath = str_replace($restoreDir.'/', '', $item->getPathname());

            // Skip non-restorable items
            if (str_starts_with($relativePath, 'db-dumps/')) {
                continue;
            }
            if (str_starts_with($relativePath, 'manifest.json')) {
                continue;
            }
            if ($relativePath === '.env') {
                continue;
            }

            // Strip storage/app/public/ prefix to get the sub-path within public
            $subPath = $relativePath;
            if (str_starts_with($relativePath, $storagePrefix)) {
                $subPath = substr($relativePath, strlen($storagePrefix));
            }

            $targetPath = $publicTarget.'/'.$subPath;
            $targetDir = dirname($targetPath);

            if (! is_dir($targetDir)) {
                mkdir($targetDir, 0755, true);
            }

            if ($item->isDir()) {
                exec('cp -r --preserve=timestamps '.escapeshellarg($item->getPathname().'/.').' '.escapeshellarg($targetDir));
            } else {
                copy($item->getPathname(), $targetPath);
            }
            $copied = true;
        }

        if ($copied) {
            $this->info('✓ Storage files restored');
        } else {
            $this->warn('No storage files found in backup, skipping...');
        }
    }

    private function restoreMySql(string $dumpFile, array $db): int
    {
        // Strip GTID_PURGED line which fails if MySQL already has executed GTIDs
        $command = sprintf(
            'sed "/^SET @@GLOBAL\.GTID_PURGED/d" %s | mysql --host=%s --port=%s --user=%s --password=%s %s 2>&1',
            escapeshellarg($dumpFile),
            escapeshellarg($db['host'] ?? '127.0.0.1'),
            escapeshellarg($db['port'] ?? '3306'),
            escapeshellarg($db['username'] ?? 'root'),
            escapeshellarg($db['password'] ?? ''),
            escapeshellarg($db['database'] ?? 'laravel')
        );
        $this->line('Running: mysql < '.basename($dumpFile));
        exec($command, $output, $exitCode);

        if ($exitCode !== 0) {
            $this->error(implode("\n", $output));
        }

        return $exitCode;
    }

    private function restorePostgres(string $dumpFile, array $db): int
    {
        $command = sprintf(
            'PGPASSWORD=%s psql --host=%s --port=%s --username=%s --dbname=%s < %s 2>&1',
            escapeshellarg($db['password'] ?? ''),
            escapeshellarg($db['host'] ?? '127.0.0.1'),
            escapeshellarg($db['port'] ?? '5432'),
            escapeshellarg($db['username'] ?? 'postgres'),
            escapeshellarg($db['database'] ?? 'laravel'),
            escapeshellarg($dumpFile)
        );
        $this->line('Running: psql < '.basename($dumpFile));
        exec($command, $output, $exitCode);

        if ($exitCode !== 0) {
            $this->error(implode("\n", $output));
        }

        return $exitCode;
    }

    private function restoreSqlite(string $dumpFile, array $db): int
    {
        $databasePath = $db['database'] ?? database_path('database.sqlite');
        $command = sprintf(
            'sqlite3 %s < %s 2>&1',
            escapeshellarg($databasePath),
            escapeshellarg($dumpFile)
        );
        $this->line('Running: sqlite3 < '.basename($dumpFile));
        exec($command, $output, $exitCode);

        if ($exitCode !== 0) {
            $this->error(implode("\n", $output));
        }

        return $exitCode;
    }

    private function restoreSqlSrv(string $dumpFile, array $db): int
    {
        $command = sprintf(
            'sqlcmd -S %s,%s -U %s -P %s -d %s -i %s 2>&1',
            escapeshellarg($db['host'] ?? 'localhost'),
            escapeshellarg($db['port'] ?? '1433'),
            escapeshellarg($db['username'] ?? 'sa'),
            escapeshellarg($db['password'] ?? ''),
            escapeshellarg($db['database'] ?? 'laravel'),
            escapeshellarg($dumpFile)
        );
        $this->line('Running: sqlcmd -i '.basename($dumpFile));
        exec($command, $output, $exitCode);

        if ($exitCode !== 0) {
            $this->error(implode("\n", $output));
        }

        return $exitCode;
    }
}
