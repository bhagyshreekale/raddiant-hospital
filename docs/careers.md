# Careers & Job Applications

## Overview

Manage job postings and track job applications. Careers page displays open positions, and applicants can submit applications with resume uploads.

## Routes

```
# Careers
GET  /admin/careers                  → CareerController@index
GET  /admin/careers/create           → CareerController@create
POST /admin/careers                  → CareerController@store
GET  /admin/careers/{career}         → CareerController@edit
PUT  /admin/careers/{career}         → CareerController@update
DELETE /admin/careers/{career}       → CareerController@destroy

# Job Applications
GET  /admin/job-applications              → JobApplicationController@index
GET  /admin/job-applications/create       → JobApplicationController@create
POST /admin/job-applications              → JobApplicationController@store
GET  /admin/job-applications/{app}        → JobApplicationController@edit
PUT  /admin/job-applications/{app}        → JobApplicationController@update
DELETE /admin/job-applications/{app}      → JobApplicationController@destroy

POST /job-application                     → SiteController@jobApplicationStore (public)
```

## Controllers

**Files:**
- `app/Http/Controllers/CareerController.php`
- `app/Http/Controllers/JobApplicationController.php`

## Models

### Career

**File:** `app/Models/Career.php`

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| specialization | string | Department/specialization |
| title | string | Job title |
| salary | string | Salary range |
| location | string | Job location |
| job_type | string | Full-time, Part-time, Contract |
| experience | string | Required experience |
| description | text | Job description |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### JobApplication

**File:** `app/Models/JobApplication.php`

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| job_id | bigint (FK) | Links to `careers` table |
| full_name | string | Applicant's name |
| email | string | Contact email |
| phone | string | Contact phone |
| experience | string | Work experience |
| resume_url | string | Resume file path |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

| Relationship | Type | Related Model |
|-------------|------|---------------|
| `job` | belongsTo | `Career` |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_careers` | View career listings |
| `create_careers` | Create job postings |
| `edit_careers` | Edit job postings |
| `delete_careers` | Delete job postings |
| `view_job_applications` | View applications |
| `create_job_applications` | Create applications |
| `edit_job_applications` | Edit applications |
| `delete_job_applications` | Delete applications |

### Receptionist Access

Receptionists can view and edit job applications (not delete).

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| Careers List | `resources/js/pages/admin/careers/index.tsx` | Job listing |
| Career Create | `resources/js/pages/admin/careers/create.tsx` | Create job posting |
| Career Edit | `resources/js/pages/admin/careers/edit.tsx` | Edit job posting |
| Applications List | `resources/js/pages/admin/job-applications/index.tsx` | Application listing |
| Application Create | `resources/js/pages/admin/job-applications/create.tsx` | Create application |
| Application Edit | `resources/js/pages/admin/job-applications/edit.tsx` | Edit application |

### Public

| Page | File | Purpose |
|------|------|---------|
| Careers | `resources/js/pages/careers.tsx` | Public job listings |

## Public Components

| Component | File | Purpose |
|-----------|------|---------|
| JobListingsClient | `resources/js/components/sections/JobListingsClient.jsx` | Job listings section |

## Public Application Flow

1. Applicant navigates to `/careers`
2. Views job listings
3. Clicks apply on a position
4. Fills out application form
5. Uploads resume
6. Form submits to `POST /job-application`
7. Application stored with job reference

## Features

- Job type categorization
- Salary range display
- Resume upload
- Job-applicant relationship tracking
- Experience requirements

---

## Related Documentation

- [Public Website](./public-website.md) - Careers page and application form
- [Dashboard](./dashboard.md) - Job application statistics
- [Image Upload](./image-upload.md) - Resume upload handling
- [RBAC](./rbac.md) - Career and application management permissions
- [Database Schema](./database-schema.md) - Career and job application table structures
- [README](./README.md) - Application overview
