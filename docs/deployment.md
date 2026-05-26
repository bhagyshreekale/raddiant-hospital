# 🚀 Raddiant Plus Hospital — Deployment Guide

**Audience:** DevOps engineers, system administrators  
**Purpose:** Production deployment instructions for the hospital management system

---

## 📋 Table of Contents

- [Server Requirements](#-server-requirements)
- [Environment Configuration](#-environment-configuration)
- [Deployment Options](#-deployment-options)
- [Step-by-Step Deployment](#-step-by-step-deployment)
- [Web Server Configuration](#-web-server-configuration)
- [SSL / HTTPS Setup](#-ssl--https-setup)
- [Database Configuration](#-database-configuration)
- [Backup Scheduling](#-backup-scheduling)
- [Queue Configuration](#-queue-configuration)
- [Caching & Performance](#-caching--performance)
- [Monitoring & Logging](#-monitoring--logging)
- [Security Hardening](#-security-hardening)
- [Scaling](#-scaling)
- [CI/CD Pipeline](#-cicd-pipeline)

---

## 🖥️ Server Requirements

### Minimum Requirements

| Resource | Requirement |
|----------|-------------|
| **OS** | Ubuntu 22.04+, Debian 12+, or RHEL 9+ |
| **PHP** | 8.3+ (8.5 recommended) |
| **Database** | MySQL 8.0+ or MariaDB 10.6+ |
| **Web Server** | Nginx 1.24+ or Apache 2.4+ |
| **Node.js** | 20+ (for build only) |
| **Memory** | 2 GB RAM minimum (4 GB recommended) |
| **Disk** | 20 GB + space for backups |
| **Composer** | 2.x |

### Required PHP Extensions

```bash
php -m | grep -E 'ctype|curl|dom|fileinfo|filter|gd|hash|iconv|intl|json|mbstring|openssl|pcre|pdo|pdo_mysql|session|tokenizer|xml|zip'
```

Ensure these extensions are installed:
- `ctype`, `curl`, `dom`, `fileinfo`, `filter`
- `gd` (for image processing)
- `hash`, `iconv`, `intl`, `json`, `mbstring`
- `openssl`, `pcre`, `pdo`, `pdo_mysql`
- `session`, `tokenizer`, `xml`, `zip` (required for backups)

### Required System Tools

- `mysqldump` or `mariadb-dump` (for database backups)
- `cron` (for scheduled tasks)
- `unzip` (for backup restore)
- `openssl` (for SSL)

---

## ⚙️ Environment Configuration

### Production `.env` File

```bash
APP_NAME="Raddiant Plus Hospital"
APP_ENV=production
APP_DEBUG=false       # CRITICAL: Must be false in production
APP_URL=https://your-hospital-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=raddiant_hospital
DB_USERNAME=raddiant_user
DB_PASSWORD=<strong-unique-password>

# Session
SESSION_DRIVER=redis   # Use redis or database for multi-server
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true   # HTTPS only
SESSION_SAMESITE=lax

# Cache
CACHE_STORE=redis
# or: CACHE_STORE=database

# Queue
QUEUE_CONNECTION=database
# or: QUEUE_CONNECTION=redis

# Mail (for password resets)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=care@raddiantplus.com
MAIL_PASSWORD=<smtp-password>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="care@raddiantplus.com"
MAIL_FROM_NAME="${APP_NAME}"

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=warning    # Reduce verbosity in production
```

### Key Production Settings

| Setting | Production Value | Why |
|---------|-----------------|-----|
| `APP_DEBUG` | `false` | Prevents sensitive error details from leaking |
| `APP_ENV` | `production` | Enables optimized config caching |
| `SESSION_SECURE_COOKIE` | `true` | Cookies only sent over HTTPS |
| `SESSION_DRIVER` | `redis` | Better performance for multi-server |
| `LOG_LEVEL` | `warning` | Reduces disk I/O from debug logs |
| `BCRYPT_ROUNDS` | `12` | Password hashing cost |

---

## 📦 Deployment Options

### Option 1: Manual Deployment (VPS / Dedicated Server)

Recommended for single-server production deployments.

### Option 2: Laravel Cloud

[Laravel Cloud](https://cloud.laravel.com/) provides managed hosting optimized for Laravel — zero-config deployment, auto-scaling, built-in queue workers, and database management.

### Option 3: Platform-as-a-Service

- **Forge** ([forge.laravel.com](https://forge.laravel.com)) — Managed server provisioning
- **Vapor** ([vapor.laravel.com](https://vapor.laravel.com)) — Serverless Laravel on AWS Lambda
- **Heroku** / **Fly.io** / **Railway** — Alternative PaaS options

---

## 📋 Step-by-Step Deployment

### 1. Server Provisioning

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.5 and extensions
sudo apt install -y php8.5-fpm php8.5-cli php8.5-common \
    php8.5-mysql php8.5-xml php8.5-gd php8.5-mbstring \
    php8.5-curl php8.5-zip php8.5-intl php8.5-bcmath

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx

# Install Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Install Redis (optional, recommended)
sudo apt install -y redis-server
```

### 2. Application Setup

```bash
# Navigate to web root
cd /var/www

# Clone repository
git clone <repository-url> raddiant-hospital
cd raddiant-hospital

# Install PHP dependencies (no dev dependencies)
composer install --no-dev --optimize-autoloader

# Install Node dependencies & build
npm install
npm run build

# Environment setup
cp .env.example .env
php artisan key:generate

# Set permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Configure database
# Edit .env with production database credentials

# Run migrations
php artisan migrate --force

# Create storage symlink
php artisan storage:link

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Create backup directory
mkdir -p storage/app/backups
sudo chown www-data:www-data storage/app/backups
```

### 3. Verify `mysqldump` Path

The backup system needs the correct path to `mysqldump`:

```bash
# Find mysqldump location
which mysqldump
# Example output: /usr/bin/mysqldump

# Verify in config/database.php
# 'dump' => [
#     'dump_binary_path' => '/usr/bin/',
#     ...
# ]
```

---

## 🌐 Web Server Configuration

### Nginx Configuration

Create `/etc/nginx/sites-available/raddiant-hospital`:

```nginx
server {
    listen 80;
    server_name your-hospital-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-hospital-domain.com;

    root /var/www/raddiant-hospital/public;
    index index.php;

    ssl_certificate /etc/letsencrypt/live/your-hospital-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-hospital-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Let's Encrypt validation
    location ~ /.well-known/acme-challenge/ {
        allow all;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.5-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known) {
        deny all;
    }

    # Static assets caching
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Storage files
    location /storage/ {
        alias /var/www/raddiant-hospital/storage/app/public/;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Block PHP files in storage
    location ~ ^/storage/.*\.php$ {
        deny all;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/raddiant-hospital /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache Configuration

Create `/etc/apache2/sites-available/raddiant-hospital.conf`:

```apache
<VirtualHost *:80>
    ServerName your-hospital-domain.com
    Redirect permanent / https://your-hospital-domain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName your-hospital-domain.com
    DocumentRoot /var/www/raddiant-hospital/public

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/your-hospital-domain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/your-hospital-domain.com/privkey.pem

    <Directory /var/www/raddiant-hospital/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/raddiant-error.log
    CustomLog ${APACHE_LOG_DIR}/raddiant-access.log combined
</VirtualHost>
```

```bash
sudo a2ensite raddiant-hospital
sudo a2enmod rewrite ssl headers
sudo systemctl reload apache2
```

---

## 🔒 SSL / HTTPS Setup

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-hospital-domain.com

# Auto-renewal (Certbot adds a systemd timer automatically)
sudo certbot renew --dry-run
```

### Using Laravel Forge

Forge provisions SSL certificates automatically with one click.

---

## 🗄️ Database Configuration

### Production Database Setup

```sql
-- Create dedicated user
CREATE USER 'raddiant_user'@'localhost' IDENTIFIED BY '<strong-password>';
CREATE DATABASE raddiant_hospital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON raddiant_hospital.* TO 'raddiant_user'@'localhost';
FLUSH PRIVILEGES;
```

### MySQL Performance Tuning

Create `/etc/mysql/conf.d/raddiant.cnf`:

```ini
[mysqld]
# InnoDB settings
innodb_buffer_pool_size = 1G    # Set to ~70% of available RAM
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
innodb_file_per_table = 1

# Connection settings
max_connections = 150
wait_timeout = 300

# Query cache (MySQL 5.7 only, removed in 8.0)
# query_cache_type = 1
# query_cache_size = 64M

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

---

## ⏰ Backup Scheduling

### Cron Job for Automated Backups

Add to crontab (`sudo crontab -e`):

```cron
# Daily backup at 2:00 AM
0 2 * * * cd /var/www/raddiant-hospital && php artisan backup:run --disable-notifications >> storage/logs/backup.log 2>&1

# Clean up backups older than 30 days (daily)
30 2 * * * find /var/www/raddiant-hospital/storage/app/backups -name "*.zip" -mtime +30 -delete
```

### Database-only Backup (Alternative)

If you prefer a simpler approach:

```cron
# Daily SQL dump at 3:00 AM (compressed)
0 3 * * * mysqldump -u raddiant_user -p'<password>' raddiant_hospital | gzip > /backups/daily/raddiant-$(date +\%Y\%m\%d).sql.gz
```

### Off-site Backup

Consider syncing backup files to off-site storage:

```bash
# Using rsync to remote server
rsync -avz /var/www/raddiant-hospital/storage/app/backups/ user@backup-server:/backups/raddiant/

# Using AWS S3 (install aws-cli)
aws s3 sync /var/www/raddiant-hospital/storage/app/backups/ s3://raddiant-backups/
```

---

## 🔄 Queue Configuration

### Database Queue Worker

The application uses the database queue driver for background jobs (e.g., password reset emails).

Create a systemd service for the queue worker:

Create `/etc/systemd/system/raddiant-queue.service`:

```ini
[Unit]
Description=Raddiant Hospital Queue Worker
After=network.target mysql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/raddiant-hospital
ExecStart=/usr/bin/php artisan queue:work --tries=3 --delay=10
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable raddiant-queue
sudo systemctl start raddiant-queue
```

### Supervisor Configuration (Alternative)

Install Supervisor:

```bash
sudo apt install -y supervisor
```

Create `/etc/supervisor/conf.d/raddiant-queue.conf`:

```ini
[program:raddiant-queue]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/raddiant-hospital/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/raddiant-hospital/storage/logs/queue.log
stdout_logfile_maxbytes=10MB
```

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start raddiant-queue:*
```

---

## ⚡ Caching & Performance

### Production Caching Commands

Run these after each deployment:

```bash
php artisan config:cache    # Cache config files
php artisan route:cache     # Cache route definitions
php artisan view:cache      # Cache compiled Blade views
php artisan event:cache     # Cache event listeners
```

### OPcache Configuration

Add to `/etc/php/8.5/fpm/conf.d/10-opcache.ini`:

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.validate_timestamps=0
opcache.revalidate_freq=0
opcache.fast_shutdown=1
```

> ⚠️ `opcache.validate_timestamps=0` means you need to clear OPcache after deployments. Add `opcache_reset()` to your deployment script or restart PHP-FPM.

### Redis Caching

If using Redis for cache/sessions, configure in `.env`:

```
CACHE_STORE=redis
SESSION_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Asset Optimization

```bash
# Build minified assets
npm run build

# Enable asset versioning (already configured in Vite)
# Mix adds content hash to filenames for cache busting
```

---

## 📊 Monitoring & Logging

### Log Files

Key log files to monitor:

| Log File | Purpose |
|----------|---------|
| `storage/logs/laravel.log` | Application errors |
| `storage/logs/backup.log` | Backup operation logs |
| `/var/log/nginx/error.log` | Web server errors |
| `/var/log/mysql/error.log` | Database errors |

### Health Check Endpoint

Create a simple health check (add to `routes/web.php`):

```php
Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json([
            'status' => 'healthy',
            'database' => 'connected',
            'timestamp' => now()->toIso8601String(),
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'unhealthy',
            'error' => $e->getMessage(),
        ], 500);
    }
});
```

### Uptime Monitoring

Recommended services:
- **Oh dear!** ([ohdear.app](https://ohdear.app)) — Laravel-specific monitoring
- **Better Stack** (formerly Better Uptime)
- **Pingdom** / **StatusCake**

---

## 🛡️ Security Hardening

### Checklist

- [ ] `APP_DEBUG=false` in production
- [ ] `APP_ENV=production`
- [ ] HTTPS enabled (SSL certificate installed)
- [ ] `SESSION_SECURE_COOKIE=true`
- [ ] Strong database password
- [ ] Strong admin passwords (min 8 chars)
- [ ] 2FA enabled for all admin accounts
- [ ] Rate limiting configured (Fortify defaults: 5/min for login)
- [ ] File upload restrictions in place (type & size validation)
- [ ] `.env` file permissions: `640`
- [ ] `storage/` directory excluded from web access
- [ ] Regular security updates (`composer update`)
- [ ] Backups taken regularly

### Firewall Configuration (UFW)

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Fail2Ban Configuration

```bash
sudo apt install -y fail2ban

# Create jail for Laravel login attempts
sudo tee /etc/fail2ban/jail.local <<EOF
[nginx-laravel-login]
enabled = true
port = http,https
filter = nginx-laravel-login
logpath = /var/log/nginx/access.log
maxretry = 10
bantime = 600
EOF
```

---

## 📈 Scaling

### Horizontal Scaling

For high-traffic deployments:

1. **Load Balancer** — Use Nginx, HAProxy, or AWS ALB
2. **Multiple App Servers** — Clone the application across servers
3. **Shared Session** — Use Redis for shared sessions
4. **Shared Storage** — Use NFS or S3 for shared file storage
5. **Read Replicas** — Configure MySQL read replicas for reporting queries

### Environment Config for Multi-Server

```
# Shared across all servers
SESSION_DRIVER=redis
CACHE_STORE=redis

# Storage (use S3 for shared file uploads)
FILESYSTEM_DISK=s3
# Or use NFS mount with local disk
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: 8.5
      - run: composer install --no-interaction
      - run: cp .env.example .env
      - run: php artisan key:generate
      - run: php artisan config:cache
      - run: npm ci
      - run: npm run build
      - run: vendor/bin/phpunit

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /var/www/raddiant-hospital
            git pull origin main
            composer install --no-dev --optimize-autoloader
            npm ci --omit=dev && npm run build
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            php artisan queue:restart
            sudo systemctl reload nginx
```

---

## 🔧 Maintenance Mode

### Enabling Maintenance Mode

```bash
# Secret token allows bypassing maintenance mode
php artisan down --secret="your-secret-token"

# Access via: https://your-hospital-domain.com/your-secret-token
```

### Disabling Maintenance Mode

```bash
php artisan up
```

---

## 📝 Post-Deployment Checklist

- [ ] Website loads correctly (HTTPS)
- [ ] Admin login works
- [ ] Storage symlink works (images display)
- [ ] Backup can be created and downloaded
- [ ] Email sending works (test password reset)
- [ ] Queue worker is running
- [ ] Cron jobs are set up
- [ ] SSL certificate is valid
- [ ] Logs are being written
- [ ] Database connections are stable
