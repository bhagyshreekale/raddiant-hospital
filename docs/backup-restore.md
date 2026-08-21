# Backup & Restore

## Overview

Complete backup and restore system using Spatie Laravel Backup. Supports database backups, file uploads, and .env configuration. Includes both UI and Artisan command interfaces.

## Routes

```
GET  /admin/backups                  → BackupController@index
POST /admin/backups/create           → BackupController@create
GET  /admin/backups/{backup}/download → BackupController@download
DELETE /admin/backups/{backup}       → BackupController@destroy
POST /admin/backups/restore          → BackupController@restore
POST /admin/backups/upload-restore   → BackupController@uploadRestore
```

## Controller

**File:** `app/Http/Controllers/Admin/BackupController.php`

## Artisan Commands

| Command | File | Purpose |
|---------|------|---------|
| `backup:create` | `app/Console/Commands/BackupCreate.php` | Create backup via CLI |
| `backup:restore` | `app/Console/Commands/BackupRestore.php` | Restore backup via CLI |

## Configuration

**File:** `config/backup.php`

### What Gets Backed Up

1. **Database** - Full database dump
2. **Files** - `storage/app` directory (uploads)
3. **Environment** - `.env` file

### Supported Databases

- MySQL
- PostgreSQL
- SQLite
- SQL Server

### Backup Formats

| Format | Source | Notes |
|--------|--------|-------|
| `.zip` | Spatie Backup | Standard format |
| `.tar.gz` | Legacy | Custom implementation |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_backups` | View backup list |
| `create_backups` | Create new backups |
| `delete_backups` | Delete backups |
| `restore_backups` | Restore backups |

## Frontend Page

| Page | File | Purpose |
|------|------|---------|
| Backup Management | `resources/js/pages/admin/backups/index.tsx` | Backup list and actions |

## Features

### Create Backup
- Click "Create Backup" button
- Database + files + .env compressed
- Download available immediately

### Download Backup
- Click download icon on any backup
- ZIP file downloaded to local machine

### Delete Backup
- Click delete icon on any backup
- Confirmation required
- Permanent deletion from storage

### Restore from Existing
- Click restore on existing backup
- Confirmation required
- Database restored from dump
- Files restored from archive

### Upload & Restore
- Upload a backup file (.zip or .tar.gz)
- File extracted and restored
- Supports both Spatie and legacy formats

## Storage

Backups are stored in the `backups` disk (configured in `config/filesystems.php`):

```php
'backups' => [
    'driver' => 'local',
    'root' => storage_path('app/backups'),
],
```

## Security Notes

- Only Super Admin and Admin can access backup features
- Backup files contain sensitive data (.env)
- Backup files should be excluded from version control
- Consider offsite backup storage for production

---

## Related Documentation

- [RBAC](./rbac.md) - Backup management permissions
- [Database Schema](./database-schema.md) - All tables included in backup
- [README](./README.md) - Application overview
