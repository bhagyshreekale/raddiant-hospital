# Appointments Management

## Overview

Manage patient appointment bookings. Appointments can be created via the public website form or directly by admin/receptionist users.

## Routes

```
GET  /admin/appointments              → AppointmentController@index
GET  /admin/appointments/create       → AppointmentController@create
POST /admin/appointments              → AppointmentController@store
GET  /admin/appointments/{appt}       → AppointmentController@edit
PUT  /admin/appointments/{appt}       → AppointmentController@update
DELETE /admin/appointments/{appt}     → AppointmentController@destroy

POST /appointment                     → SiteController@appointmentStore (public)
```

## Controller

**File:** `app/Http/Controllers/AppointmentController.php`

## Model

**File:** `app/Models/Appointment.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| full_name | string | Patient's full name |
| phone | string | Contact phone number |
| email | string, nullable | Contact email |
| age | integer | Patient's age |
| gender | string | Gender (male/female/other) |
| visit_type | string | Visit type (first_visit/follow_up) |
| specialization_id | bigint (FK) | Links to `specializations` table |
| doctor_id | bigint (FK) | Links to `doctors` table |
| preferred_date | date | Preferred appointment date |
| time_slot | string | Preferred time slot |
| description | text, nullable | Additional notes |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

| Relationship | Type | Related Model |
|-------------|------|---------------|
| `specialization` | belongsTo | `Specialization` |
| `doctor` | belongsTo | `Doctor` |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_appointments` | View appointment list |
| `create_appointments` | Create new appointments |
| `edit_appointments` | Edit appointments |
| `delete_appointments` | Delete appointments |

### Receptionist Access

Receptionists can view, create, and edit appointments (not delete).

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/appointments/index.tsx` | Appointment listing with filters |
| Create | `resources/js/pages/admin/appointments/create.tsx` | Create new appointment |
| Edit | `resources/js/pages/admin/appointments/edit.tsx` | Edit appointment |

### Public

| Page | File | Purpose |
|------|------|---------|
| Appointment Form | `resources/js/pages/appoinment.tsx` | Public booking form |

## Public Booking Flow

1. Patient navigates to `/appointment`
2. Fills out form (name, contact, specialization, doctor, date, time)
3. Form submits to `POST /appointment`
4. Appointment created with default status
5. Confirmation displayed

## Features

- Specialization and doctor selection (cascading)
- Date picker for preferred date
- Time slot selection
- Visit type tracking (first visit vs follow-up)
- Dashboard statistics (today/week/month counts)

---

## Related Documentation

- [Doctors](./doctors.md) - Doctors selected for appointments
- [Specializations](./specializations.md) - Specialization filter for appointments
- [Public Website](./public-website.md) - Public appointment booking form
- [Dashboard](./dashboard.md) - Appointment statistics and charts
- [RBAC](./rbac.md) - Appointment management permissions
- [Database Schema](./database-schema.md) - Appointment table structure
- [README](./README.md) - Application overview
