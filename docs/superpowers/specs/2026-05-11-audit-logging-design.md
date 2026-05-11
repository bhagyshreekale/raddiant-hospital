# Audit Logging System Design

## Overview

Comprehensive audit logging for Raddiant Hospital application covering:
- **Application logging**: Laravel's existing Monolog (file-based)
- **Activity audit logging**: Database-stored trackable events

---

## Architecture

### 1. Database Schema

**Table: `audit_logs`**

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| user_id | bigint (nullable) | Authenticated user ID |
| user_type | string (nullable) | Model class (Admin::class, User::class) |
| action | string | created/updated/deleted/login/logout/password_changed/etc |
| model_type | string (nullable) | Eloquent model class being acted upon |
| model_id | string (nullable) | ID of the model being acted upon |
| description | text | Human-readable description |
| properties | json (nullable) | Additional context (old/new values, metadata) |
| ip_address | string (nullable) | Request IP |
| user_agent | string (nullable) | Browser user agent |
| created_at | timestamp | When the event occurred |

### 2. Models

**`App\Models\AuditLog`**
- Standard Eloquent model
- Fillable: user_id, user_type, action, model_type, model_id, description, properties, ip_address, user_agent
- Casts: properties → array
- Scopes: forUser($user), forModel($type, $id), forAction($action)

**`App\Traits\Auditable`**
- Use on any model to auto-log changes
- Methods: `getAuditDescription()`, `getAuditProperties()`
- Auto-captures old/new values on save

### 3. Observers

**`App\Observers\AuditableModelObserver`**
- Listens to: created, updated, deleted events
- Calls `Audit` facade to log with model info

### 4. Service / Facade

**`App\Services\AuditService`**
- `log($action, $description, array $properties = [])`
- `logModel($model, $action, $description, array $properties = [])`
- Auto-captures: user_id, user_type, ip, user_agent

**`App\Facades\Audit`**
- Alias for AuditService
- Usage: `Audit::log('login', 'Admin John logged in')`

### 5. Traits

**`App\Traits\Auditable`**
- On models using this trait, observer automatically logs:
  - `created`: "[User] created [Model] #ID"
  - `updated`: "[User] updated [Model] #ID" + changed attributes
  - `deleted`: "[User] deleted [Model] #ID"

---

## Implementation Plan

### Step 1: Migration
- Create `create_audit_logs_table` migration

### Step 2: AuditLog Model
- `app/Models/AuditLog.php`

### Step 3: AuditService
- `app/Services/AuditService.php`

### Step 4: Audit Facade
- `app/Facades/Audit.php`
- Register in `bootstrap/app.php`

### Step 5: Auditable Trait
- `app/Traits/Auditable.php`

### Step 6: Observer
- `app/Observers/AuditableModelObserver.php`

### Step 7: Register Observer in ServiceProvider
- Listen to all models with Auditable trait

### Step 8: Manual Audit Events
- Login/logout events in Fortify service provider or session middleware
- Password change events

### Step 9: Example Usage in Controller
- Demonstrate usage pattern in InquiryController

---

## Usage Examples

### Auto-audit model changes (add trait):
```php
class Doctor extends Model
{
    use Auditable;
}
```
Result: Any create/update/delete on Doctor is automatically logged.

### Manual audit event:
```php
Audit::log('login', 'Admin logged in', [
    'email' => $admin->email,
]);
```

### Log with model context:
```php
Audit::logModel($inquiry, 'status_changed', 'Inquiry status changed to completed', [
    'old_status' => 'contacted',
    'new_status' => 'completed',
]);
```

### Query audit logs:
```php
AuditLog::forUser($admin)->forAction('login')->latest()->get();
AuditLog::forModel(Inquiry::class, 123)->get();
```

---

## Files to Create

1. `database/migrations/xxxx_create_audit_logs_table.php`
2. `app/Models/AuditLog.php`
3. `app/Services/AuditService.php`
4. `app/Facades/Audit.php`
5. `app/Traits/Auditable.php`
6. `app/Observers/AuditableModelObserver.php`
7. `app/Providers/AuditServiceProvider.php`

---

## Configuration

No new config files needed. Existing `config/logging.php` handles application errors.