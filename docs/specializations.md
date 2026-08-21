# Specializations Management

## Overview

Manage medical specializations (departments) that doctors belong to. Specializations are used throughout the application for categorizing doctors, appointments, and testimonials.

## Routes

```
GET  /admin/specializations              → SpecializationController@index
GET  /admin/specializations/create       → SpecializationController@create
POST /admin/specializations              → SpecializationController@store
GET  /admin/specializations/{spec}       → SpecializationController@edit
PUT  /admin/specializations/{spec}       → SpecializationController@update
DELETE /admin/specializations/{spec}     → SpecializationController@destroy
```

## Controller

**File:** `app/Http/Controllers/SpecializationController.php`

## Model

**File:** `app/Models/Specialization.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name | string | Specialization name |
| image | string | Image path |
| description | text | Description |
| color | string | Display color (hex) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

| Relationship | Type | Related Model |
|-------------|------|---------------|
| `doctors` | hasMany | `Doctor` |
| `testimonials` | hasMany | `Testimonial` |
| `appointments` | hasMany | `Appointment` |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_specializations` | View specialization list |
| `create_specializations` | Create new specializations |
| `edit_specializations` | Edit specializations |
| `delete_specializations` | Delete specializations |

## Frontend Pages

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/specializations/index.tsx` | Specialization listing |
| Create | `resources/js/pages/admin/specializations/create.tsx` | Create new specialization |
| Edit | `resources/js/pages/admin/specializations/edit.tsx` | Edit specialization |

## Features

- Color-coded specializations for UI display
- Image upload for specialization icons
- Description field for detailed info
- Cascading deletion protection (warns if doctors exist)

---

## Related Documentation

- [Doctors](./doctors.md) - Doctors linked to specializations
- [Appointments](./appointments.md) - Appointments filtered by specialization
- [Testimonials](./testimonials.md) - Testimonials linked to specializations
- [Image Upload](./image-upload.md) - Specialization image handling
- [Public Website](./public-website.md) - Specializations displayed on public site
- [Dashboard](./dashboard.md) - Specialization statistics
- [RBAC](./rbac.md) - Specialization management permissions
- [Database Schema](./database-schema.md) - Specialization table structure
- [README](./README.md) - Application overview
