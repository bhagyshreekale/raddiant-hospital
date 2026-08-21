# Services Management

## Overview

Manage hospital services offered to patients. Services are displayed on the public website and can be color-coded for visual distinction.

## Routes

```
GET  /admin/services              → ServiceController@index
GET  /admin/services/create       → ServiceController@create
POST /admin/services              → ServiceController@store
GET  /admin/services/{service}    → ServiceController@edit
PUT  /admin/services/{service}    → ServiceController@update
DELETE /admin/services/{service}  → ServiceController@destroy
```

## Controller

**File:** `app/Http/Controllers/ServiceController.php`

## Model

**File:** `app/Models/Service.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| title | string | Service title |
| image | string | Image path |
| description | text | Service description |
| color | string | Display color (hex) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_services` | View service list |
| `create_services` | Create new services |
| `edit_services` | Edit services |
| `delete_services` | Delete services |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/services/index.tsx` | Service listing |
| Create | `resources/js/pages/admin/services/create.tsx` | Create new service |
| Edit | `resources/js/pages/admin/services/edit.tsx` | Edit service |

### Public

| Page | File | Purpose |
|------|------|---------|
| Services | `resources/js/pages/services.tsx` | Public services listing |

## Public Components

| Component | File | Purpose |
|-----------|------|---------|
| ServiceCard | `resources/js/components/design/ServiceCard.jsx` | Service card display |
| ServicesSection | `resources/js/components/sections/ServicesSection.jsx` | Homepage services section |

## Features

- Color-coded services for visual distinction
- Image upload for service icons
- Rich text description
- Featured on homepage

---

## Related Documentation

- [Public Website](./public-website.md) - Services displayed on public site
- [Image Upload](./image-upload.md) - Service image handling
- [Dashboard](./dashboard.md) - Service statistics
- [RBAC](./rbac.md) - Service management permissions
- [Database Schema](./database-schema.md) - Service table structure
- [README](./README.md) - Application overview
