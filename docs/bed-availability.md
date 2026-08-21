# Bed Availability Management

## Overview

Track and manage hospital bed availability across departments. Displays bed status with visual indicators (Good/Limited/Full).

## Routes

```
GET  /admin/bed-availability              → BedAvailabilityController@index
GET  /admin/bed-availability/create       → BedAvailabilityController@create
POST /admin/bed-availability              → BedAvailabilityController@store
GET  /admin/bed-availability/{bed}        → BedAvailabilityController@edit
PUT  /admin/bed-availability/{bed}        → BedAvailabilityController@update
DELETE /admin/bed-availability/{bed}      → BedAvailabilityController@destroy
```

## Controller

**File:** `app/Http/Controllers/BedAvailabilityController.php`

## Model

**File:** `app/Models/BedAvailability.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| total_beds | integer | Total beds in department |
| available_beds | integer | Currently available beds |
| status | string | Status: Good, Limited, Full |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Status Values

| Status | Description | Visual Indicator |
|--------|-------------|-----------------|
| `Good` | Plenty of beds available | Green |
| `Limited` | Few beds remaining | Yellow/Orange |
| `Full` | No beds available | Red |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_bed_availability` | View bed status |
| `create_bed_availability` | Create bed records |
| `edit_bed_availability` | Update bed status |
| `delete_bed_availability` | Delete bed records |

### Receptionist Access

Receptionists can view, create, and edit bed availability (not delete).

## Frontend Pages

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/bed-availability/index.tsx` | Bed status listing |
| Create | `resources/js/pages/admin/bed-availability/create.tsx` | Add new bed record |
| Edit | `resources/js/pages/admin/bed-availability/edit.tsx` | Update bed status |

## Features

- Visual status indicators (color-coded)
- Total vs available bed tracking
- Automatic status suggestion based on availability percentage
- Dashboard widget for receptionists

---

## Related Documentation

- [Dashboard](./dashboard.md) - Bed availability widget for receptionists
- [RBAC](./rbac.md) - Bed availability management permissions
- [Database Schema](./database-schema.md) - Bed availability table structure
- [README](./README.md) - Application overview
