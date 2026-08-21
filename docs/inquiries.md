# Inquiries Management

## Overview

Track patient inquiries submitted through the public website. Inquiries go through a status workflow: new → contacted → completed → cancelled.

## Routes

```
GET  /admin/inquiries              → InquiryController@index
DELETE /admin/inquiries/{inquiry}  → InquiryController@destroy
PUT  /admin/inquiries/{inquiry}    → InquiryController@updateStatus

POST /inquiry                      → SiteController@inquiryStore (public)
```

## Controller

**File:** `app/Http/Controllers/InquiryController.php`

## Model

**File:** `app/Models/Inquiry.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| reference_id | string | Unique reference ID for tracking |
| name | string | Patient's name |
| phone | string | Contact phone |
| email | string | Contact email |
| department | string | Department of interest |
| visit_type | string | Visit type |
| preferred_date | date, nullable | Preferred visit date |
| preferred_time | string, nullable | Preferred time |
| message | text | Patient message |
| status | string | Status workflow |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Status Workflow

```
new → contacted → completed
                    ↓
                 cancelled
```

| Status | Description |
|--------|-------------|
| `new` | Newly submitted inquiry |
| `contacted` | Staff has contacted patient |
| `completed` | Inquiry resolved |
| `cancelled` | Inquiry cancelled |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_inquiries` | View inquiry list |
| `create_inquiries` | Create inquiries |
| `edit_inquiries` | Edit/update inquiries |
| `delete_inquiries` | Delete inquiries |

### Receptionist Access

Receptionists can view and edit inquiries (not delete).

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/inquiries/index.tsx` | Inquiry listing with status filters |

### Public

| Component | File | Purpose |
|-----------|------|---------|
| PatientInquiryForm | `resources/js/components/sections/PatientInquiryForm.jsx` | Contact page inquiry form |

## Public Submission Flow

1. Patient navigates to `/contact`
2. Fills out inquiry form
3. Form submits to `POST /inquiry`
4. Inquiry created with status: `new`
5. Reference ID generated for tracking
6. Confirmation displayed to patient

## Features

- Unique reference ID for each inquiry
- Status workflow tracking
- Dashboard statistics (new/pending counts)
- Filter by status
- Delete capability (admin only)

---

## Related Documentation

- [Public Website](./public-website.md) - Inquiry form on contact page
- [Dashboard](./dashboard.md) - Inquiry statistics and charts
- [RBAC](./rbac.md) - Inquiry management permissions
- [Database Schema](./database-schema.md) - Inquiry table structure
- [README](./README.md) - Application overview
