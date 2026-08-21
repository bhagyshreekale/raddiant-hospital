# Authentication & Authorization

## Overview

The application uses a dual authentication system with separate guards for admin users and regular users. Authentication is powered by **Laravel Fortify** with custom implementations.

## Auth Architecture

### Two Guards

| Guard | Model | Provider | Password Broker |
|-------|-------|----------|-----------------|
| `web` | `User` | `users` | `users` |
| `admin` | `Admin` | `admins` | `admins` |

### Configuration Files

- `config/auth.php` - Guard definitions, providers, and password brokers
- `config/fortify.php` - Fortify features (views disabled, email username)

## Admin Login Flow

1. **Login Page:** `GET /admin/login`
   - Username + password form
   - Rate limited: 5 attempts per minute

2. **Two-Factor Challenge:** `POST /admin/2fa/verify`
   - TOTP code verification
   - Rate limited: 5 attempts per minute
   - Recovery codes supported

3. **Dashboard Redirect:** After successful login → `/admin/dashboard`

### Auth Controllers

| Controller | File | Purpose |
|-----------|------|---------|
| `AdminAuthenticatedSessionController` | `app/Http/Controllers/Auth/AdminAuthenticatedSessionController.php` | Login, 2FA verify, logout |
| `AdminPasswordResetController` | `app/Http/Controllers/Auth/AdminPasswordResetController.php` | Forgot password |
| `AdminNewPasswordController` | `app/Http/Controllers/Auth/AdminNewPasswordController.php` | Reset password |

### Auth Actions (Fortify)

| Action | File | Purpose |
|--------|------|---------|
| `CreateNewUser` | `app/Actions/Fortify/CreateNewUser.php` | User registration (disabled) |
| `ResetUserPassword` | `app/Actions/Fortify/ResetUserPassword.php` | User password reset |
| `ResetAdminPassword` | `app/Actions/Fortify/ResetAdminPassword.php` | Admin password reset |

## Two-Factor Authentication (2FA)

### Features
- TOTP-based (Google Authenticator compatible)
- QR code generation for easy setup
- 8-character recovery codes
- Enable/disable/regenerate capabilities

### 2FA Setup Flow
1. User navigates to Security Settings (`/admin/settings/security`)
2. Clicks "Enable Two-Factor Authentication"
3. Modal shows QR code + manual entry key
4. User enters TOTP code to confirm
5. Recovery codes displayed (one-time view)

### 2FA Components

| Component | File | Purpose |
|-----------|------|---------|
| `TwoFactorSetupModal` | `resources/js/components/two-factor-setup-modal.tsx` | QR code + setup UI |
| `TwoFactorRecoveryCodes` | `resources/js/components/two-factor-recovery-codes.tsx` | Recovery codes display |

### 2FA Security
- Rate limited: 5 attempts per minute
- Recovery codes hashed before storage
- TOTP secret encrypted in database

## Password Management

### Password Validation
- Minimum 8 characters
- Must include: uppercase, lowercase, number, symbol
- Validation rules in `app/Concerns/PasswordValidationRules.php`

### Password Reset Flow
1. User requests reset at `/admin/forgot-password`
2. Email sent with reset link
3. User clicks link → `/admin/reset-password/{token}`
4. Enters new password + confirmation
5. Password updated, all sessions invalidated

## Auth Routes

```
GET  /admin/login                    → AdminAuthenticatedSessionController@create
POST /admin/login                    → AdminAuthenticatedSessionController@store
POST /admin/logout                   → AdminAuthenticatedSessionController@destroy
POST /admin/2fa/verify               → AdminAuthenticatedSessionController@verify2FA

GET  /admin/forgot-password          → AdminPasswordResetController@showLinkRequestForm
POST /admin/forgot-password          → AdminPasswordResetController@sendResetLinkEmail

GET  /admin/reset-password/{token}  → AdminNewPasswordController@showResetForm
POST /admin/reset-password/{token}  → AdminNewPasswordController@reset
```

### Disabled Routes (abort 404)
```
GET/POST  /login                     → User login (disabled)
GET/POST  /register                  → User registration (disabled)
GET/POST  /forgot-password           → User forgot password (disabled)
GET/POST  /reset-password/{token}    → User reset password (disabled)
POST      /user/confirm-password     → Password confirmation (disabled)
```

## Middleware

| Middleware | File | Purpose |
|-----------|------|---------|
| `EnsureUserIsAdmin` | `app/Http/Middleware/EnsureUserIsAdmin.php` | Checks Super Admin or Admin role |
| `EnsureUserIsSuperAdmin` | `app/Http/Middleware/EnsureUserIsSuperAdmin.php` | Checks Super Admin role only |
| `EnsureUserIsReceptionist` | `app/Http/Middleware/EnsureUserIsReceptionist.php` | Checks Admin or Receptionist role |
| `HandleInertiaRequests` | `app/Http/Middleware/HandleInertiaRequests.php` | Shares auth data with Inertia |
| `HandleAppearance` | `app/Http/Middleware/HandleAppearance.php` | Shares appearance mode from cookie |

## Security Features

1. **Rate Limiting** - Login attempts throttled (5/minute)
2. **Session Management** - Secure session handling
3. **CSRF Protection** - All POST forms protected
4. **Password Hashing** - bcrypt hashing
5. **Remember Me** - Optional persistent sessions
6. **2FA Recovery** - One-time recovery codes

## Database Schema

### `admins` Table
| Column | Type | Purpose |
|--------|------|---------|
| id | bigint | Primary key |
| username | string | Login username (unique) |
| password | string | Hashed password |
| two_factor_secret | text, nullable | Encrypted TOTP secret |
| two_factor_recovery_codes | text, nullable | JSON array of hashed codes |
| two_factor_confirmed_at | timestamp, nullable | When 2FA was confirmed |
| remember_token | string, nullable | Remember me token |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### `users` Table
| Column | Type | Purpose |
|--------|------|---------|
| id | bigint | Primary key |
| name | string | User name |
| email | string | Email (unique) |
| password | string | Hashed password |
| two_factor_* | various | 2FA columns (currently unused) |
| remember_token | string, nullable | Remember me token |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

---

## Related Documentation

- [RBAC](./rbac.md) - Role-based access control using Spatie Permission
- [Admin Users](./admin-users.md) - Managing admin accounts
- [Dashboard](./dashboard.md) - Admin dashboard (requires authentication)
- [Database Schema](./database-schema.md) - Complete database reference
- [README](./README.md) - Application overview
