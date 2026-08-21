# Health Packages / Facilities

## Overview

Manage health checkup packages and facilities offered by the hospital. Packages can be featured on the public facilities page with pricing and feature lists.

## Routes

```
GET  /admin/health-packages              → HealthPackageController@index
GET  /admin/health-packages/create       → HealthPackageController@create
POST /admin/health-packages              → HealthPackageController@store
GET  /admin/health-packages/{pkg}        → HealthPackageController@edit
PUT  /admin/health-packages/{pkg}        → HealthPackageController@update
DELETE /admin/health-packages/{pkg}      → HealthPackageController@destroy

GET  /facilities                         → SiteController@facilities (public)
```

## Controller

**File:** `app/Http/Controllers/HealthPackageController.php`

## Model

**File:** `app/Models/HealthPackage.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name | string | Package name |
| description | text | Package description |
| price | decimal | Package price |
| features | json | List of included features |
| is_featured | boolean | Featured on public site |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### JSON Features Structure

```json
[
    "Complete Blood Count",
    "Lipid Profile",
    "Liver Function Test",
    "Kidney Function Test",
    "Thyroid Profile"
]
```

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_health_packages` | View package list |
| `create_health_packages` | Create new packages |
| `edit_health_packages` | Edit packages |
| `delete_health_packages` | Delete packages |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/health-packages/index.tsx` | Package listing |
| Create | `resources/js/pages/admin/health-packages/create.tsx` | Create new package |
| Edit | `resources/js/pages/admin/health-packages/edit.tsx` | Edit package |

### Public

| Page | File | Purpose |
|------|------|---------|
| Facilities | `resources/js/pages/facilities.tsx` | Public facilities/packages page |

## Features

- JSON-based feature list
- Featured package highlighting
- Price display
- Public-facing facilities page

---

## Related Documentation

- [Public Website](./public-website.md) - Health packages on facilities page
- [RBAC](./rbac.md) - Health package management permissions
- [Database Schema](./database-schema.md) - Health package table structure
- [README](./README.md) - Application overview
