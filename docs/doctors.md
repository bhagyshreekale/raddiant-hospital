# Doctors Management

## Overview

Manage doctor profiles including their specializations, education, images, and availability status.

## Routes

```
GET  /admin/doctors              → DoctorController@index (admin)
GET  /admin/doctors/create       → DoctorController@create
POST /admin/doctors              → DoctorController@store
GET  /admin/doctors/{doctor}     → DoctorController@edit
PUT  /admin/doctors/{doctor}     → DoctorController@update
DELETE /admin/doctors/{doctor}   → DoctorController@destroy

GET  /doctors                    → DoctorController@publicIndex (public)
```

## Controller

**File:** `app/Http/Controllers/DoctorController.php`

## Model

**File:** `app/Models/Doctor.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name | string | Doctor's full name |
| specialization_id | bigint (FK) | Links to `specializations` table |
| education | string | Education qualifications |
| image | string | Profile image path |
| availability | string | Available status |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

| Relationship | Type | Related Model |
|-------------|------|---------------|
| `specialization` | belongsTo | `Specialization` |
| `appointments` | hasMany | `Appointment` |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_doctors` | View doctor list |
| `create_doctors` | Create new doctors |
| `edit_doctors` | Edit doctor profiles |
| `delete_doctors` | Delete doctors |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/doctors/index.tsx` | Doctor listing with search/filter |
| Create | `resources/js/pages/admin/doctors/create.tsx` | Create new doctor form |
| Edit | `resources/js/pages/admin/doctors/edit.tsx` | Edit doctor form |

### Public

| Page | File | Purpose |
|------|------|---------|
| Doctors | `resources/js/pages/doctors.tsx` | Public doctors listing |

## Features

- Image upload for doctor profile pictures
- Specialization assignment
- Availability status toggle
- Search and filter by specialization

---

## Related Documentation

- [Specializations](./specializations.md) - Medical departments doctors belong to
- [Appointments](./appointments.md) - Appointments linked to doctors
- [Image Upload](./image-upload.md) - Doctor profile image handling
- [Public Website](./public-website.md) - Doctors displayed on public site
- [Dashboard](./dashboard.md) - Doctor statistics
- [RBAC](./rbac.md) - Doctor management permissions
- [Database Schema](./database-schema.md) - Doctor table structure
- [README](./README.md) - Application overview
