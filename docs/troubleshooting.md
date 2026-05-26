# 🔧 Raddiant Plus Hospital — Troubleshooting Guide

**Audience:** Developers, system administrators, and power users  
**Purpose:** Solutions to common issues encountered during development and production

---

## 📋 Table of Contents

- [Installation Issues](#-installation-issues)
- [Database Issues](#-database-issues)
- [Authentication & Login Issues](#-authentication--login-issues)
- [Frontend / Asset Issues](#-frontend--asset-issues)
- [Backup & Restore Issues](#-backup--restore-issues)
- [Permissions & RBAC Issues](#-permissions--rbac-issues)
- [File Upload Issues](#-file-upload-issues)
- [Performance Issues](#-performance-issues)
- [Server & Deployment Issues](#-server--deployment-issues)

---

## 🚧 Installation Issues

### Error: `Class "App\Models\..." not found`

**Problem:** Composer autoload is stale after adding new models.

**Solution:**
```bash
composer dump-autoload
```

### Error: `Target [League\Flysystem\...] is not instantiable`

**Problem:** Flysystem package mismatch or missing dependency.

**Solution:**
```bash
composer install --no-interaction
```

### Error: `The only supported ciphers are AES-128-CBC and AES-256-CBC`

**Problem:** Missing or invalid APP_KEY.

**Solution:**
```bash
php artisan key:generate
```

### Error: `SQLSTATE[HY000] [1045] Access denied for user`

**Problem:** Database credentials are incorrect in `.env`.

**Solution:**
1. Check `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` in `.env`
2. Verify the user has permissions:
```sql
GRANT ALL PRIVILEGES ON raddiant_hospital.* TO 'raddiant_user'@'localhost';
FLUSH PRIVILEGES;
```
3. If using MySQL 8+, try resetting password with `mysql_native_password`:
```sql
ALTER USER 'raddiant_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

### Error: `SQLSTATE[HY000] [2002] No such file or directory`

**Problem:** MySQL socket connection issue — common with Laravel Herd or Valet.

**Solutions:**
1. Check if MySQL is running: `brew services list | grep mysql`
2. Try connecting via TCP instead of socket — set `DB_HOST=127.0.0.1` in `.env`
3. Find the correct socket path: `mysqladmin variables | grep socket`
4. Update `config/database.php`:
```php
'unix_socket' => env('DB_SOCKET', '/tmp/mysql.sock'),
```

### Error: `Class "Pest\...\" not found`

**Problem:** Pest PHP is not installed or autoload is stale.

**Solution:**
```bash
composer install
composer dump-autoload
```

---

## 🗄️ Database Issues

### Error: `Base table or view not found`

**Problem:** Migrations haven't been run.

**Solution:**
```bash
php artisan migrate
```

If the migration exists but failed partway:
```bash
php artisan migrate:fresh --seed
```

### Error: `Column not found: 1054 Unknown column`

**Problem:** Migration was run but a local change to an existing migration is out of sync with the database.

**Solutions:**
1. Drop the problematic column manually via SQL:
```sql
ALTER TABLE table_name ADD COLUMN column_name VARCHAR(255) NULL;
```
2. Or roll back and fresh migrate:
```bash
php artisan migrate:fresh --seed
```

### Error: `Maximum key length is 767 bytes`

**Problem:** MySQL's InnoDB key length limit when using `utf8mb4`.

**Solution:**
Add to `config/database.php` under `mysql`:
```php
'engine' => 'innodb',
'charset' => 'utf8mb4',
'collation' => 'utf8mb4_unicode_ci',
```

Or set default engine in MySQL config:
```ini
[mysqld]
default_storage_engine=InnoDB
innodb_large_prefix=ON
innodb_file_format=Barracuda
```

### Error: `Too many connections`

**Problem:** Connection pool exhausted under load.

**Solutions:**
1. Increase MySQL max connections:
```ini
[mysqld]
max_connections = 500
```
2. Reduce PHP-FPM's `pm.max_children` to match available connections
3. Use persistent connections or a connection pooler

---

## 🔐 Authentication & Login Issues

### Error: `Unauthenticated` (401) on Admin Pages

**Problem:** Session expired or missing.

**Solutions:**
1. Clear browser cookies / cache
2. Log in again at `/admin/login`
3. Check if `SESSION_DRIVER` is configured correctly in `.env`
4. Verify `config/session.php` domain setting matches your URL

### Error: `Too many attempts. Please try again in 60 seconds.`

**Problem:** Fortify rate limiting has been triggered (5 attempts per minute).

**Solutions:**
1. Wait 60 seconds before trying again
2. Check that the correct credentials are being used
3. Reset from database (if needed urgently):
```sql
TRUNCATE TABLE failed_jobs;
```
Or clear rate limit cache:
```bash
php artisan cache:clear
```

### 2FA Code Not Working

**Problem:** TOTP code is invalid.

**Solutions:**
1. Ensure your server's time is synchronized (TOTP is time-based):
```bash
sudo timedatectl set-ntp true
```
2. Check that the authenticator app's time is synced
3. Try generating a new code (codes expire after 30 seconds)
4. Use a recovery code to log in, then reconfigure 2FA

### Lost 2FA Recovery Codes

**Problem:** You're locked out and can't find your recovery codes.

**Solution (Super Admin needed):**
1. Another Super Admin can access the admin panel
2. Go to **Settings → Security** for the locked account
3. Disable 2FA, then the user can log in with password only
4. The user should immediately set up 2FA again

Alternatively, disable 2FA via database:
```bash
php artisan tinker --execute 'App\Models\Admin::find(1)->update(["two_factor_secret" => null, "two_factor_recovery_codes" => null]);'
```

### Forgot Password Email Not Sending

**Problem:** Password reset email doesn't arrive.

**Solutions:**
1. Check mail configuration in `.env`:
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=care@raddiantplus.com
MAIL_PASSWORD=<app-password>
MAIL_ENCRYPTION=tls
```
2. Gmail requires an **App Password** (not your regular password) — enable 2FA on the Gmail account first, then generate an App Password
3. Test mail config:
```bash
php artisan tinker --execute 'Mail::raw("Test email", fn($msg) => $msg->to("you@example.com"));'
```
4. Check `storage/logs/laravel.log` for mail errors

---

## 🎨 Frontend / Asset Issues

### Error: `Unable to locate file in Vite manifest`

**Problem:** Vite hasn't built the frontend assets, or the manifest is missing.

**Solutions:**
1. For development:
```bash
npm run dev
```
2. For production:
```bash
npm run build
```
3. Or use the combined command:
```bash
composer run dev
```

### Error: `[plugin:vite:import-analysis] Failed to resolve import`

**Problem:** Missing npm package or incorrect import path.

**Solutions:**
1. Install dependencies: `npm install`
2. Check the import path matches the package name in `package.json`
3. For local imports, ensure the file exists at the specified path
4. Run `npm run build` for better error messages

### Blank Page / White Screen on Admin

**Problem:** JavaScript error is preventing the React app from rendering.

**Solutions:**
1. Open browser developer console (F12) to see errors
2. Clear browser cache
3. Check if Vite dev server is running (if in development)
4. For production, ensure assets are built:
```bash
npm run build
```
5. Check `storage/logs/laravel.log` for server-side errors

### CSS Not Loading / Broken Layout

**Problem:** Tailwind CSS styles are missing.

**Solutions:**
1. Ensure Vite dev server is running (`npm run dev`)
2. For production, ensure `npm run build` was executed
3. Check if `@tailwindcss/vite` plugin is configured in `vite.config.ts`
4. Clear browser cache (use hard refresh: Cmd+Shift+R)

### Images Not Displaying (Broken Icons)

**Problem:** Storage symlink is missing.

**Solution:**
```bash
php artisan storage:link
```

Or use the utility route: visit `/storage-link` in the browser.

Verify the symlink exists:
```bash
ls -la public/storage
# Should show: public/storage -> /var/www/raddiant-hospital/storage/app/public
```

---

## 💾 Backup & Restore Issues

### Error: `The dump process failed` or `mysqldump: command not found`

**Problem:** `mysqldump` is not in the expected path.

**Solutions:**
1. Find mysqldump location:
```bash
which mysqldump
# macOS (Homebrew): /opt/homebrew/bin/mysqldump
# Linux: /usr/bin/mysqldump
```
2. Update `config/database.php` with the correct path:
```php
'dump' => [
    'dump_binary_path' => '/opt/homebrew/bin/',  // macOS
    // or
    'dump_binary_path' => '/usr/bin/',           // Linux
],
```

### Error: `ZipArchive::extractTo(): Empty string as filename`

**Problem:** The backup file is corrupted or not a valid zip.

**Solutions:**
1. Try downloading and re-uploading the backup file
2. Check file integrity:
```bash
unzip -t backup-file.zip
```
3. If the file is a `.tar.gz` (legacy format), use:
```bash
tar -tzf backup-file.tar.gz
```

### Backup Takes Too Long

**Problem:** Large database causing timeout.

**Solutions:**
1. Increase the timeout in `config/database.php`:
```php
'dump' => [
    'timeout' => 60 * 10,  // 10 minutes
],
```
2. Use `--use_single_transaction` option (already configured)
3. Consider incremental or table-specific backups

### Restore Failed

**Problem:** Database restore process fails.

**Solutions:**
1. Check `storage/logs/laravel.log` for details
2. Verify the backup file is not corrupted
3. Try restoring from a `.zip` file (spatie format) rather than `.tar.gz`
4. Manually restore via command line:
```bash
mysql -u raddiant_user -p raddiant_hospital < backup-file.sql
```
5. Ensure MySQL user has `CREATE`, `INSERT`, `ALTER`, `DROP` privileges

### Backup Disk Space Full

**Problem:** Backup files consuming too much disk space.

**Solutions:**
1. Delete old backups via the admin panel
2. Set up automatic cleanup in cron:
```cron
0 2 * * * find /var/www/raddiant-hospital/storage/app/backups -name "*.zip" -mtime +7 -delete
```
3. Offload backups to external storage (S3, etc.)

---

## 🔑 Permissions & RBAC Issues

### Admin Sees "You do not have permission" Error

**Problem:** The admin role doesn't have the required permission.

**Solutions:**
1. Go to **Roles → Edit** the admin's role
2. Find the resource group in the permission grid
3. Check the required permission
4. Re-run the seeder to restore default permissions:
```bash
php artisan db:seed --class=RoleAndPermissionSeeder
```

### Permission Changes Not Taking Effect

**Problem:** Permissions updated but still not working.

**Solutions:**
1. The user may need to log out and log back in (permissions are cached in session)
2. Clear permission cache:
```bash
php artisan cache:forget spatie.permission.cache
```
Or use tinker:
```bash
php artisan tinker --execute 'app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();'
```
3. Verify the role has the permission:
```bash
php artisan tinker --execute '$role = Spatie\Permission\Models\Role::where("name", "Admin")->first(); $role->permissions->pluck("name");'
```

### "Cannot delete system role" Error

**Problem:** Trying to delete Super Admin, Admin, or Receptionist role.

**Solution:** System roles are protected. You can edit them but not delete them. Create custom roles for additional permission sets.

### "Cannot delete permission assigned to roles" Error

**Problem:** The permission is currently assigned to one or more roles.

**Solutions:**
1. Remove the permission from all roles first
2. Then delete the permission
3. Check which roles use the permission:
```bash
php artisan tinker --execute '$permission = Spatie\Permission\Models\Permission::where("name", "your-permission")->first(); $permission->roles->pluck("name");'
```

---

## 📁 File Upload Issues

### Image Upload Fails (Max Size)

**Problem:** Uploaded image exceeds the file size limit.

**Solutions:**
1. Check both PHP and application limits:
   - `upload_max_filesize` and `post_max_size` in `php.ini`
   - Application limit: 2MB for blog images, 5MB for resumes
2. Edit `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 12M
```
3. Restart PHP-FPM:
```bash
sudo systemctl restart php8.5-fpm
```

### Image Upload Shows 422 Validation Error

**Problem:** File type is not in the allowed list.

**Solutions:**
1. Allowed types: `jpeg`, `png`, `jpg`, `gif`, `webp`
2. Convert the file to an allowed format
3. The application validates by MIME type — renaming the extension won't help

### Resume Upload Fails

**Problem:** Job application resume upload fails.

**Solutions:**
1. Allowed types: `pdf`, `doc`, `docx`
2. Max size: 5MB
3. Check `storage/app/public` is writable:
```bash
chmod -R 775 storage/app/public
```

### Storage Link Already Exists

**Problem:** Running `php artisan storage:link` gives "The [public/storage] link already exists."

**Solution:** This is fine — the symlink already exists. If it's broken:
```bash
rm public/storage
php artisan storage:link
```

---

## 🐌 Performance Issues

### Admin Panel Feels Slow

**Possible Causes & Solutions:**

1. **Database queries** — Check for N+1 issues:
   - Install Laravel Debugbar for development:
   ```bash
   composer require barryvdh/laravel-debugbar --dev
   ```
   - Check `storage/logs/laravel.log` for slow queries

2. **Vite dev server** — In development, ensure `npm run dev` is running for HMR

3. **Asset loading** — In production, ensure `npm run build` was run and assets are cached

4. **Config caching** — Run in production:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Public Website Loads Slowly

**Solutions:**
1. Enable Redis caching for config and views
2. Implement browser caching (already configured in Nginx example above)
3. Optimize images (compress before uploading)
4. Use a CDN for static assets (optional)

### High Memory Usage

**Solutions:**
1. Increase PHP memory limit:
```ini
memory_limit = 256M
```
2. Check for memory leaks in custom code
3. Reduce the number of concurrent PHP-FPM workers

---

## 🌐 Server & Deployment Issues

### Error: `403 Forbidden` on Admin Routes

**Problem:** The `admin` middleware is blocking the request.

**Solutions:**
1. Ensure the user has the correct role (Admin or Super Admin)
2. The `admin` middleware checks for `isAdmin()` method on the Admin model
3. Check role assignment:
```bash
php artisan tinker --execute 'App\Models\Admin::find(1)->getRoleNames();'
```

### Error: `419 Page Expired`

**Problem:** CSRF token mismatch.

**Solutions:**
1. Clear browser cookies
2. Ensure `SESSION_DOMAIN` in `.env` matches your domain exactly
3. Check that the session driver is working:
```bash
php artisan tinker --execute 'config("session.driver");'
```
4. If using multiple domains, update `config/session.php`:
```php
'domain' => env('SESSION_DOMAIN', null),
```

### Deployment Script Fails

**Problem:** Git pull causes conflicts or permission issues.

**Solutions:**
1. Stash any local changes before pull:
```bash
git stash
git pull origin main
git stash pop  # if needed
```
2. Fix permissions after deployment:
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```
3. Ensure `.env` is not overwritten (it's in `.gitignore`)

### Queue Worker Not Processing Jobs

**Problem:** Password reset emails or other queued jobs aren't executing.

**Solutions:**
1. Check queue worker status:
```bash
sudo systemctl status raddiant-queue
```
2. Check queue table for pending jobs:
```bash
php artisan tinker --execute 'DB::table("jobs")->count();'
```
3. Restart the queue worker:
```bash
php artisan queue:restart
sudo systemctl restart raddiant-queue
```
4. Process jobs manually (for testing):
```bash
php artisan queue:work --once
```

---

## 🔍 Common Logs Reference

### Where to Look

| Issue | Log File | Command |
|-------|----------|---------|
| Application errors | `storage/logs/laravel.log` | `tail -f storage/logs/laravel.log` |
| PHP errors | PHP-FPM log | `tail -f /var/log/php8.5-fpm.log` |
| Web server errors | Nginx error log | `tail -f /var/log/nginx/error.log` |
| Database errors | MySQL error log | `tail -f /var/log/mysql/error.log` |
| Backup errors | `storage/logs/backup.log` | `tail -f storage/logs/backup.log` |
| Queue jobs | `storage/logs/queue.log` | `tail -f storage/logs/queue.log` |
| Browser errors | DevTools Console | `F12 → Console tab` |

### Useful Debugging Commands

```bash
# Live log tailing
tail -f storage/logs/laravel.log

# Search for errors
grep -i error storage/logs/laravel.log

# Check PHP errors
tail -f /var/log/php8.5-fpm.log

# Check MySQL connectivity
mysqladmin ping -u raddiant_user -p

# Test queue
php artisan queue:work --once --verbose

# Check scheduled tasks
php artisan schedule:list

# Verify all routes
php artisan route:list

# Check environment config
php artisan config:show app.env
```
