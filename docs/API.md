# 🏥 Raddiant Plus Hospital — API Reference

**Base URL:** `http://localhost:8000` (development)  
**Content-Type:** `application/json` (API), `multipart/form-data` (file uploads)  
**Authentication:** Session-based via `auth:admin` guard (for admin routes)  
**CSRF Protection:** All POST/PUT/DELETE requests require `X-CSRF-TOKEN` header or `_token` parameter

---

## 📋 Table of Contents

- [Authentication](#-authentication)
- [Public API](#-public-api)
- [Dashboard](#-dashboard)
- [Resources CRUD](#-resources-crud)
- [RBAC Management](#-rbac-management)
- [Backup & Restore](#-backup--restore)
- [Settings](#-settings)
- [File Uploads](#-file-uploads)
- [Utility Routes](#-utility-routes)
- [Error Responses](#-error-responses)

---

## 🔐 Authentication

All admin authentication routes are under `/admin/` prefix with the `web` middleware. The admin guard (`auth:admin`) is separate from the public user guard.

---

### Admin Login

```
POST /admin/login
```

Authenticates an admin user and starts a session.

**Authentication:** None (guest:admin middleware)  
**Rate Limit:** 5 requests per minute

**Request Body:**
```json
{
    "username": "admin",
    "password": "admin123"
}
```

**Success Response (200):**
```json
{
    "redirect": "/admin/dashboard",
    "two_factor": false
}
```

**With 2FA required (200):**
```json
{
    "two_factor": true,
    "redirect": null
}
```

**Error Response (422 - Validation):**
```json
{
    "errors": {
        "username": ["The username field is required."],
        "password": ["The password field is required."]
    }
}
```

**Error Response (429 - Rate Limited):**
```json
{
    "message": "Too many attempts. Please try again in 60 seconds."
}
```

---

### Admin Login Page

```
GET /admin/login
```

Renders the admin login page.

**Authentication:** None

**Response:** Inertia page (`admin/auth/login`)

---

### Two-Factor Challenge

```
POST /admin/2fa/verify
```

Verifies a TOTP code during login when 2FA is enabled.

**Authentication:** None  
**Rate Limit:** 5 requests per minute

**Request Body:**
```json
{
    "two_factor_code": "123456"
}
```

**Success Response (200):**
```json
{
    "redirect": "/admin/dashboard"
}
```

**Error Response (422):**
```json
{
    "errors": {
        "two_factor_code": ["The provided two factor code was invalid."]
    }
}
```

---

### Admin Logout

```
POST /admin/logout
```

Logs out the authenticated admin.

**Authentication:** `auth:admin`

**Response (302):** Redirect to `/admin/login`

---

### Forgot Password

```
GET  /admin/forgot-password
POST /admin/forgot-password
```

**GET:** Renders the forgot password form.  
**POST:** Sends a password reset link to the admin's email.

**Authentication:** None (guest:admin)

**POST Request Body:**
```json
{
    "email": "care@raddiantplus.com"
}
```

**Success Response (302):** Redirect back with status message.

---

### Reset Password

```
GET  /admin/reset-password/{token}
POST /admin/reset-password
```

**GET:** Renders the password reset form with token.  
**POST:** Resets the password.

**Authentication:** None (guest:admin)

**POST Request Body:**
```json
{
    "token": "reset-token-here",
    "email": "care@raddiantplus.com",
    "password": "new-password-123",
    "password_confirmation": "new-password-123"
}
```

**Success Response (302):** Redirect to admin login with status message.

---

## 🌐 Public API

These endpoints do not require authentication and serve the public-facing website.

---

### Site Data

```
GET /api/site-data
```

Returns all site configuration data for the frontend.

**Authentication:** None

**Success Response (200):**
```json
{
    "name": "Raddiant Plus Hospital",
    "tagline": "Multispecialty & Diagnostic Centre",
    "phone": "+91 93565 10704",
    "whatsapp": "919356510704",
    "email": "care@raddiantplus.com",
    "address": "Nashik, Maharashtra",
    "social": {
        "facebook": "#",
        "instagram": "#",
        "youtube": "#"
    },
    "emergency": "108",
    "nav": [
        {"label": "Home", "href": "/"},
        {"label": "About Us", "href": "/about"},
        {"label": "Services", "href": "/services"},
        {"label": "Doctors", "href": "/doctors"},
        {"label": "Facilities", "href": "/facilities"},
        {"label": "Gallery", "href": "/gallery"},
        {"label": "Contact", "href": "/contact"}
    ],
    "footer": {
        "tagline": "Touching Lives, Healing Souls",
        "description": "Delivering comprehensive multispecialty hospital and diagnostic care.",
        "quickLinks": [
            {"label": "Home", "href": "/"},
            {"label": "Services", "href": "/services"}
        ],
        "column3Title": "Specialties",
        "column3Links": [
            {"label": "Cardiology", "href": "/services?specialty=Cardiology"},
            {"label": "Orthopedics", "href": "/services?specialty=Orthopedics"}
        ],
        "contactTitle": "Contact Information",
        "address": "Nashik, Maharashtra",
        "phone": "+91 93565 10704",
        "email": "care@raddiantplus.com"
    },
    "timing": "24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM"
}
```

---

### Navigation Links (Public)

```
GET /api/navigation-links?type=header
```

Returns navigation links for a specific type.

**Authentication:** None

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | string | `header` | Link type: `header` or `footer` |

**Success Response (200):**
```json
{
    "links": [
        {
            "id": 1,
            "type": "header",
            "label": "Home",
            "url": "/",
            "is_visible": true,
            "sort_order": 1
        },
        {
            "id": 2,
            "type": "header",
            "label": "Services",
            "url": "/services",
            "is_visible": true,
            "sort_order": 2
        }
    ]
}
```

---

### Store Contact Inquiry

```
POST /inquiry
```

Public endpoint for submitting contact inquiries from the website.

**Authentication:** None

**Request Body:**
```json
{
    "name": "John Doe",
    "phone": "+91 9876543210",
    "email": "john@example.com",
    "department": "Cardiology",
    "visit_type": "OPD",
    "preferred_date": "2026-06-15",
    "preferred_time": "10:00 AM",
    "message": "I would like to schedule a checkup."
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `phone` | required, string, max:50 |
| `email` | nullable, email |
| `department` | nullable, string, max:255 |
| `visit_type` | nullable, string, max:100 |
| `preferred_date` | nullable, date |
| `preferred_time` | nullable, string, max:100 |
| `message` | nullable, string |

**Success Response (302):** Redirect back with `reference_id` in session.
```
RPH-A1B2C3D4
```

---

### Store Job Application

```
POST /job-application
```

Public endpoint for submitting job applications.

**Authentication:** None

**Request Body:** `multipart/form-data`
| Field | Type | Rules |
|-------|------|-------|
| `job_id` | integer | required, exists:careers,id |
| `full_name` | string | required, max:255 |
| `email` | string | required, email |
| `phone` | string | required, max:50 |
| `experience` | string | nullable, max:100 |
| `resume` | file | nullable, mimes:pdf,doc,docx, max:5120 |

**Success Response (302):** Redirect to `/careers` with success message.

---

### Store Appointment

```
POST /appointment
```

Public endpoint for booking appointments.

**Authentication:** None

**Request Body:**
```json
{
    "name": "Meera Joshi",
    "phone": "+91 9876543210",
    "email": "meera@example.com",
    "gender": "Female",
    "service": "Cardiology",
    "doctor": "Dr. Sharma",
    "date": "2026-06-20",
    "time": "10:30 AM",
    "message": "First visit"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `phone` | required, string, max:50 |
| `email` | nullable, string, email |
| `gender` | nullable, in:Male,Female,Other |
| `service` | nullable, string, max:255 |
| `doctor` | nullable, string, max:255 |
| `date` | required, date |
| `time` | required, string, max:50 |
| `message` | nullable, string |

**Success Response (302):** Redirect to `/appointment` with flash message.

---

## 📊 Dashboard

### Dashboard Page

```
GET /admin/dashboard
```

Renders the admin dashboard with aggregated stats, charts, and recent data.

**Authentication:** `auth:admin`  
**Middleware:** `auth:admin`

**Success Response (200):** Inertia page (`admin/dashboard`)

**Inertia Props:**
```json
{
    "isAdmin": true,
    "stats": {
        "totalDoctors": 12,
        "totalAppointments": 245,
        "totalInquiries": 78,
        "todayAppointments": 5,
        "weekAppointments": 23,
        "monthAppointments": 67,
        "newInquiries": 12,
        "pendingInquiries": 18,
        "totalBlogs": 15,
        "totalJobApplications": 34,
        "recentJobApplications": 5,
        "completedInquiries": 45
    },
    "recentAppointments": [
        {
            "id": 1,
            "patient_name": "John Doe",
            "phone": "+91 9876543210",
            "doctor": "Dr. Sharma",
            "specialization": "Cardiology",
            "date": "2026-06-15",
            "time": "10:30 AM",
            "visit_type": "OPD"
        }
    ],
    "recentInquiries": [
        {
            "id": 1,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "phone": "+91 9876543211",
            "department": "Orthopedics",
            "status": "new",
            "created_at": "2026-06-14"
        }
    ],
    "appointmentChart": {
        "labels": ["Jun 01", "Jun 02", "Jun 03"],
        "values": [3, 5, 2]
    },
    "inquiryChart": [
        {"status": "new", "count": 12, "color": "#ef4444"},
        {"status": "contacted", "count": 6, "color": "#f59e0b"},
        {"status": "completed", "count": 45, "color": "#22c55e"},
        {"status": "cancelled", "count": 15, "color": "#6b7280"}
    ]
}
```

**Role Differences:** When `isAdmin` is false (Receptionist), additional fields are returned:
- `todayAppointmentsList` — today's appointments with time slots
- `bedAvailability` — current bed status

---

## 📦 Resources CRUD

All resource endpoints follow a consistent CRUD pattern with Inertia rendering and permission-based middleware.

---

### Appointments

```
GET    /admin/appointments          — List all appointments
GET    /admin/appointments/{id}     — View appointment details
PUT    /admin/appointments/{id}     — Update appointment
DELETE /admin/appointments/{id}     — Delete appointment
```

**Middleware:** `auth:admin` + permission check  
**Permissions:** `appointments.view-any|appointments.view|appointments.update|appointments.delete`

#### List Appointments

```
GET /admin/appointments
```

**Success Response:** Inertia page (`admin/appointments/index`)

**Inertia Props:**
```json
{
    "appointments": [
        {
            "id": 1,
            "full_name": "John Doe",
            "phone": "+91 9876543210",
            "email": "john@example.com",
            "age": 35,
            "gender": "Male",
            "visit_type": "OPD",
            "specialization_id": 1,
            "doctor_id": 1,
            "preferred_date": "2026-06-20",
            "time_slot": "10:30 AM",
            "description": "Regular checkup",
            "created_at": "2026-06-15T10:00:00Z",
            "updated_at": "2026-06-15T10:00:00Z",
            "specialization": {
                "id": 1,
                "name": "Cardiology"
            },
            "doctor": {
                "id": 1,
                "name": "Dr. Sharma"
            }
        }
    ]
}
```

#### Create Appointment (Admin panel via create page)

```
GET  /admin/appointments/create   — Render create form
```

**Success Response:** Inertia page (`admin/appointments/create`)

**Inertia Props:**
```json
{
    "specializations": [
        {"id": 1, "name": "Cardiology"},
        {"id": 2, "name": "Orthopedics"}
    ],
    "doctors": [
        {"id": 1, "name": "Dr. Sharma"},
        {"id": 2, "name": "Dr. Patel"}
    ]
}
```

**Create (via form submission):**
```
POST /admin/appointments
```

**Request Body:**
```json
{
    "full_name": "John Doe",
    "phone": "+91 9876543210",
    "email": "john@example.com",
    "age": 35,
    "gender": "Male",
    "visit_type": "OPD",
    "specialization_id": 1,
    "doctor_id": 1,
    "preferred_date": "2026-06-20",
    "time_slot": "10:30 AM",
    "description": "Regular checkup"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `full_name` | required, string, max:255 |
| `phone` | required, string, max:50 |
| `email` | nullable, string, email |
| `age` | nullable, integer |
| `gender` | nullable, in:Male,Female,Other |
| `visit_type` | required, in:Emergency,OPD |
| `specialization_id` | nullable, exists:specializations,id |
| `doctor_id` | nullable, exists:doctors,id |
| `preferred_date` | required, date |
| `time_slot` | required, string, max:50 |
| `description` | nullable, string |

**Success Response (302):** Redirect to `/admin/appointments` with flash message.

#### Update Appointment

```
PUT /admin/appointments/{id}
```

**Request Body:** Same as create.

**Success Response (302):** Redirect to index with flash message.

#### Delete Appointment

```
DELETE /admin/appointments/{id}
```

**Success Response (302):** Redirect to index with flash message.

---

### Doctors

```
GET    /admin/doctors          — List
GET    /admin/doctors/create   — Create form
POST   /admin/doctors          — Store
GET    /admin/doctors/{id}/edit — Edit form
PUT    /admin/doctors/{id}     — Update
DELETE /admin/doctors/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `doctors.view-any|doctors.view|doctors.create|doctors.update|doctors.delete`

#### List Doctors

```
GET /admin/doctors
```

**Inertia Props:**
```json
{
    "doctors": [
        {
            "id": 1,
            "name": "Dr. Sharma",
            "specialization_id": 1,
            "education": "MD, DM Cardiology",
            "image": "/storage/doctors/dr-sharma.jpg",
            "availability": "Mon-Sat 9AM-5PM",
            "specialization": {
                "id": 1,
                "name": "Cardiology"
            }
        }
    ]
}
```

#### Store Doctor

```
POST /admin/doctors
```

**Request Body:**
```json
{
    "name": "Dr. Sharma",
    "specialization_id": 1,
    "education": "MD, DM Cardiology",
    "image": "doctors/dr-sharma.jpg",
    "availability": "Mon-Sat 9AM-5PM"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `specialization_id` | nullable, exists:specializations,id |
| `education` | nullable, string, max:100 |
| `image` | nullable, string |
| `availability` | nullable, string |

**Success Response (302):** Redirect to `/admin/doctors` with flash message.

---

### Specializations

```
GET    /admin/specializations          — List
GET    /admin/specializations/create   — Create form
POST   /admin/specializations          — Store
GET    /admin/specializations/{id}/edit — Edit form
PUT    /admin/specializations/{id}     — Update
DELETE /admin/specializations/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `specializations.view-any|specializations.view|specializations.create|specializations.update|specializations.delete`

**Request Body for Create/Update:**
```json
{
    "name": "Cardiology",
    "image": "specializations/cardiology.jpg",
    "description": "Heart and cardiovascular system"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `image` | nullable, string |
| `description` | nullable, string |

---

### Services

```
GET    /admin/services          — List
GET    /admin/services/create   — Create form
POST   /admin/services          — Store
GET    /admin/services/{id}/edit — Edit form
PUT    /admin/services/{id}     — Update
DELETE /admin/services/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `services.view-any|services.view|services.create|services.update|services.delete`

**Request Body for Create/Update:**
```json
{
    "title": "Cardiac Surgery",
    "image": "services/cardiac-surgery.jpg",
    "description": "Advanced cardiac surgical procedures",
    "color": "#0a4d8c"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `title` | required, string, max:255 |
| `image` | nullable, string |
| `description` | nullable, string |
| `color` | nullable, string, max:20 |

---

### Testimonials

```
GET    /admin/testimonials          — List
GET    /admin/testimonials/create   — Create form
POST   /admin/testimonials          — Store
GET    /admin/testimonials/{id}/edit — Edit form
PUT    /admin/testimonials/{id}     — Update
DELETE /admin/testimonials/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `testimonials.view-any|testimonials.view|testimonials.create|testimonials.update|testimonials.delete`

**Request Body for Create/Update:**
```json
{
    "specialization_id": 1,
    "patient_name": "Rajesh Kumar",
    "patient_type": "Patient",
    "description": "Excellent care and treatment at Raddiant Hospital.",
    "profile_image": "testimonials/rajesh.jpg"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `specialization_id` | nullable, exists:specializations,id |
| `patient_name` | required, string, max:255 |
| `patient_type` | nullable, string, max:100 |
| `description` | required, string |
| `profile_image` | nullable, string |

---

### Blogs

```
GET    /admin/blogs          — List
GET    /admin/blogs/create   — Create form
POST   /admin/blogs          — Store
GET    /admin/blogs/{id}/edit — Edit form
PUT    /admin/blogs/{id}     — Update
DELETE /admin/blogs/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `blogs.view-any|blogs.view|blogs.create|blogs.update|blogs.delete`

#### Store Blog

```
POST /admin/blogs
```

**Request Body:** `multipart/form-data`
| Field | Type | Rules |
|-------|------|-------|
| `title` | string | required, max:255 |
| `category` | string | required, max:255 |
| `description` | string | nullable (rich text) |
| `read_time` | string | nullable, max:255 |
| `image` | file | nullable, image, mimes:jpg,jpeg,png,webp, max:2048 |

**Success Response (302):** Redirect to `/admin/blogs` with flash message.

#### Update Blog

```
PUT /admin/blogs/{id}
```

Same validation as store. If a new image is uploaded, the old one is automatically deleted from storage.

#### Delete Blog

```
DELETE /admin/blogs/{id}
```

Automatically deletes the associated image file from storage.

---

### Gallery

```
GET    /admin/gallery          — List
GET    /admin/gallery/create   — Create form
POST   /admin/gallery          — Store
GET    /admin/gallery/{id}/edit — Edit form
PUT    /admin/gallery/{id}     — Update
DELETE /admin/gallery/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `gallery.view-any|gallery.view|gallery.create|gallery.update|gallery.delete`

**Request Body for Create/Update:**
```json
{
    "image": "/storage/uploads/gallery-image.jpg",
    "title": "Hospital Reception",
    "category": "Facilities"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `image` | required, string |
| `title` | nullable, string, max:255 |
| `category` | nullable, string, max:255 |

---

### Careers / Job Postings

```
GET    /admin/careers          — List
GET    /admin/careers/create   — Create form
POST   /admin/careers          — Store
GET    /admin/careers/{id}/edit — Edit form
PUT    /admin/careers/{id}     — Update
DELETE /admin/careers/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `careers.view-any|careers.view|careers.create|careers.update|careers.delete`

**Request Body for Create/Update:**
```json
{
    "specialization": "Cardiology",
    "title": "Senior Cardiologist",
    "salary": "₹25,00,000 - ₹35,00,000",
    "location": "Nashik, Maharashtra",
    "job_type": "Full-time",
    "experience": "5-10 years",
    "description": "We are looking for an experienced cardiologist..."
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `specialization` | nullable, string, max:100 |
| `title` | required, string, max:255 |
| `salary` | nullable, string, max:100 |
| `location` | required, string, max:255 |
| `job_type` | required, in:Full-time,Part-time,Contract |
| `experience` | nullable, string, max:100 |
| `description` | required, string |

---

### Job Applications

```
GET    /admin/job-applications              — List
GET    /admin/job-applications/{id}         — View (uses edit page)
PUT    /admin/job-applications/{id}         — Update
DELETE /admin/job-applications/{id}         — Delete
GET    /admin/job-applications/{id}/download — Download resume
```

**Middleware:** `auth:admin` + permission check  
**Permissions:** `job-applications.view-any|job-applications.view|job-applications.delete|job-applications.download`

#### List Job Applications

```
GET /admin/job-applications
```

**Inertia Props:**
```json
{
    "applications": [
        {
            "id": 1,
            "job_id": 1,
            "full_name": "Anita Desai",
            "email": "anita@example.com",
            "phone": "+91 9876543210",
            "experience": "8 years",
            "resume_url": "job-applications/anita-desai-resume.pdf",
            "career": {
                "id": 1,
                "title": "Senior Cardiologist"
            }
        }
    ]
}
```

#### Download Resume

```
GET /admin/job-applications/{id}/download
```

**Success Response:** Binary file download (streamed).

**Error Response (404):**
```json
{
    "message": "Resume file not found."
}
```

---

### Inquiries

```
GET    /admin/inquiries                    — List
DELETE /admin/inquiries/{inquiry}           — Delete
PUT    /admin/inquiries/{inquiry}/status    — Update status
```

**Middleware:** `auth:admin` + permission check  
**Permissions:** `inquiries.view-any|inquiries.delete|inquiries.update-status`

#### List Inquiries

```
GET /admin/inquiries
```

**Inertia Props:**
```json
{
    "inquiries": [
        {
            "id": 1,
            "reference_id": "RPH-A1B2C3D4",
            "name": "John Doe",
            "phone": "+91 9876543210",
            "email": "john@example.com",
            "department": "Cardiology",
            "visit_type": "OPD",
            "preferred_date": "2026-06-20",
            "preferred_time": "10:00 AM",
            "message": "I would like to schedule a checkup.",
            "status": "new",
            "created_at": "2026-06-15T10:00:00Z",
            "updated_at": "2026-06-15T10:00:00Z"
        }
    ]
}
```

#### Update Inquiry Status

```
PUT /admin/inquiries/{id}/status
```

**Request Body:**
```json
{
    "status": "contacted"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `status` | required, in:new,contacted,completed,cancelled |

**Status Workflow:** `new → contacted → completed | cancelled`

**Success Response (302):** Redirect back with flash message.

#### Delete Inquiry

```
DELETE /admin/inquiries/{id}
```

**Success Response (302):** Redirect to inquiries index with flash message.

---

### Bed Availability

```
GET    /admin/bed-availability          — List
GET    /admin/bed-availability/create   — Create form
POST   /admin/bed-availability          — Store
GET    /admin/bed-availability/{id}/edit — Edit form
PUT    /admin/bed-availability/{id}     — Update
DELETE /admin/bed-availability/{id}     — Delete
```

**Middleware:** `auth:admin` + permission check  
**Permissions:** `bed-availability.view-any|bed-availability.view|bed-availability.create|bed-availability.update|bed-availability.delete`

**Request Body for Create/Update:**
```json
{
    "total_beds": 50,
    "available_beds": 12,
    "status": "Limited"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `total_beds` | required, integer, min:0 |
| `available_beds` | required, integer, min:0 |
| `status` | required, in:Good,Limited,Full |

---

### Health Packages

```
GET    /admin/health-packages          — List
GET    /admin/health-packages/create   — Create form
POST   /admin/health-packages          — Store
GET    /admin/health-packages/{id}/edit — Edit form
PUT    /admin/health-packages/{id}     — Update
DELETE /admin/health-packages/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `health-packages.view-any|health-packages.view|health-packages.create|health-packages.update|health-packages.delete`

**Request Body for Create/Update:**
```json
{
    "name": "Full Body Checkup",
    "description": "Comprehensive health screening package",
    "price": 4999.00,
    "features": [
        "Complete Blood Count",
        "Lipid Profile",
        "Liver Function Test",
        "Kidney Function Test",
        "Chest X-Ray"
    ],
    "is_featured": true
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `description` | required, string |
| `price` | required, numeric, min:0 |
| `features` | nullable, array |
| `features.*` | string, max:255 |
| `is_featured` | nullable, boolean |

---

### Insurance Partners

```
GET    /admin/insurance-partners          — List
GET    /admin/insurance-partners/create   — Create form
POST   /admin/insurance-partners          — Store
GET    /admin/insurance-partners/{id}/edit — Edit form
PUT    /admin/insurance-partners/{id}     — Update
DELETE /admin/insurance-partners/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `insurance-partners.view-any|insurance-partners.view|insurance-partners.create|insurance-partners.update|insurance-partners.delete`

**Request Body for Create/Update:**
```json
{
    "name": "Star Health Insurance",
    "category": "private",
    "logo": "uploads/star-health-logo.png"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `category` | required, in:public,private,tpa |
| `logo` | nullable, string |

**Note:** Logo can be a file upload or a string URL. Storage paths are automatically cleaned up on delete.

---

### Contact Info

```
GET    /admin/contact          — List
GET    /admin/contact/create   — Create form
POST   /admin/contact          — Store
GET    /admin/contact/{id}/edit — Edit form
PUT    /admin/contact/{id}     — Update
DELETE /admin/contact/{id}     — Delete
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `contact.view-any|contact.view|contact.create|contact.update|contact.delete`

**Request Body for Create/Update:**
```json
{
    "email": "care@raddiantplus.com",
    "phone": "+91 93565 10704",
    "address": "Nashik, Maharashtra",
    "open_hours": "24x7",
    "map_link": "https://maps.google.com/?q=..."
}
```

**Validation Rules (store):**
| Field | Rules |
|-------|-------|
| `email` | required, string, max:255 |
| `phone` | nullable, string, max:255 |
| `address` | nullable, string |
| `open_hours` | nullable, string |
| `map_link` | nullable, string |

**Update Note:** Uses `updateOrCreate` with `id = 1` — only a single contact record is maintained.

---

### Website Settings

```
GET  /admin/website-settings  — Edit form
POST /admin/website-settings  — Update (POST)
PATCH /admin/website-settings — Update (PATCH)
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permissions:** `website-settings.view|website-settings.update`

#### Edit Settings

```
GET /admin/website-settings
```

**Inertia Props:** All settings as flat key-value props:
```json
{
    "hospital_name": "Raddiant Plus Hospital",
    "tagline": "Multispecialty & Diagnostic Centre",
    "phone": "+91 93565 10704",
    "email": "care@raddiantplus.com",
    "address": "Nashik, Maharashtra",
    "emergency_number": "108",
    "facebook": "https://facebook.com/raddiant",
    "instagram": "https://instagram.com/raddiant",
    "youtube": "https://youtube.com/@raddiant",
    "whatsapp": "919356510704",
    "logo": "/images/logo.png",
    "footer_tagline": "Touching Lives, Healing Souls",
    "footer_description": "...",
    "footer_specialties": "Cardiology,Orthopedics,Neurology",
    "footer_specialties_title": "Specialties",
    "footer_contact_title": "Contact Information",
    "footer_address": "Nashik, Maharashtra",
    "footer_phone": "+91 93565 10704",
    "footer_email": "care@raddiantplus.com",
    "footer_timing": "24x7 Emergency | OPD: Mon-Sat 9:00 AM - 6:00 PM"
}
```

#### Update Settings

```
POST /admin/website-settings
```

**Request Body:** Any subset of the settings keys:
```json
{
    "hospital_name": "Raddiant Plus Hospital",
    "tagline": "Your Health, Our Priority",
    "phone": "+91 93565 10704",
    "facebook": "https://facebook.com/newpage"
}
```

**Validation Rules (all optional):**
| Field | Rules |
|-------|-------|
| `hospital_name` | nullable, string, max:255 |
| `logo` | nullable, string |
| `tagline` | nullable, string, max:255 |
| `phone` | nullable, string, max:50 |
| `email` | nullable, email |
| `address` | nullable, string |
| `emergency_number` | nullable, string, max:50 |
| `facebook` | nullable, url |
| `instagram` | nullable, url |
| `youtube` | nullable, url |
| `whatsapp` | nullable, string, max:50 |
| `footer_*` | various nullable string fields |

**Success Response (302):** Redirect back with status message.

---

### Navigation Links

```
GET    /admin/navigation-links              — Admin list page
POST   /admin/navigation-links              — Store
PUT    /admin/navigation-links/{id}         — Update
DELETE /admin/navigation-links/{id}         — Delete
POST   /admin/navigation-links/reorder      — Reorder
```

**Middleware:** `auth:admin`, `admin`, + permission checks  
**Permissions:** `navigation-links.view-any|navigation-links.create|navigation-links.update|navigation-links.delete|navigation-links.reorder`

#### Admin List

```
GET /admin/navigation-links
```

**Inertia Props:**
```json
{
    "headerLinks": [
        {
            "id": 1,
            "type": "header",
            "label": "Home",
            "url": "/",
            "is_visible": true,
            "sort_order": 1
        }
    ],
    "footerLinks": [
        {
            "id": 10,
            "type": "footer",
            "label": "Contact",
            "url": "/contact",
            "is_visible": true,
            "sort_order": 1
        }
    ]
}
```

#### Store Navigation Link

```
POST /admin/navigation-links
```

**Request Body:**
```json
{
    "type": "header",
    "label": "New Page",
    "url": "/new-page",
    "is_visible": true
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `type` | required, in:header,footer |
| `label` | required, string, max:100 |
| `url` | required, string, max:255 |
| `is_visible` | boolean |

**Success Response (302):** Redirect to navigation-links index.

#### Update Navigation Link

```
PUT /admin/navigation-links/{id}
```

**Request Body:** Same fields as store, all optional.
```json
{
    "label": "Updated Label",
    "url": "/updated-url",
    "is_visible": false
}
```

#### Delete Navigation Link

```
DELETE /admin/navigation-links/{id}
```

#### Reorder Navigation Links

```
POST /admin/navigation-links/reorder
```

**Request Body:**
```json
{
    "links": [
        {"id": 3, "sort_order": 1},
        {"id": 1, "sort_order": 2},
        {"id": 2, "sort_order": 3}
    ]
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `links` | required, array |
| `links.*.id` | required, integer, exists:navigation_links,id |
| `links.*.sort_order` | required, integer |

**Success Response (302):** Redirect to navigation-links index.

---

### Admin Users

```
GET    /admin/admins              — List
GET    /admin/admins/create       — Create form (Super Admin only)
POST   /admin/admins              — Store (Super Admin only)
GET    /admin/admins/{id}         — Show
GET    /admin/admins/{id}/edit    — Edit form
PUT    /admin/admins/{id}         — Update
DELETE /admin/admins/{id}         — Delete (Super Admin only)
```

**Middleware:** `auth:admin`, `admin`, + permission checks  
**Permissions:** `admins.view-any|admins.view|admins.create|admins.update`  
**Super Admin Restriction:** Create and delete operations require `super-admin` middleware.

#### List Admin Users

```
GET /admin/admins
```

**Inertia Props:**
```json
{
    "admins": [
        {
            "id": 1,
            "username": "admin",
            "roles": [
                {"id": 1, "name": "Super Admin"}
            ]
        }
    ],
    "isSuperAdmin": true
}
```

#### Create Admin User

```
POST /admin/admins
```

**Request Body:**
```json
{
    "username": "newadmin",
    "password": "securepassword123",
    "role": "Admin"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `username` | required, string, max:100, unique:admins,username |
| `password` | required, string, min:8 |
| `role` | required, string, exists:roles,name |

**Success Response (302):** Redirect to `/admin/admins` with flash message.

#### Update Admin User

```
PUT /admin/admins/{id}
```

**Request Body:**
```json
{
    "username": "updatedadmin",
    "password": "newpassword123",
    "role": "Receptionist"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `username` | required, string, max:100, unique:admins,username (except current) |
| `password` | nullable, string, min:8 |
| `role` | required, string, exists:roles,name |

**Note:** Password is optional for updates. Role is synced via Spatie.

#### Delete Admin User

```
DELETE /admin/admins/{id}
```

**Restrictions:**
- Super Admin cannot be deleted
- Only Super Admin can delete other admins

**Error Response (403):**
```json
{
    "message": "Cannot delete a Super Admin."
}
```

---

## 🔑 RBAC Management

---

### Roles

```
GET    /admin/roles              — List
GET    /admin/roles/create       — Create form
POST   /admin/roles              — Store
GET    /admin/roles/{id}/edit    — Edit form (with permission grid)
PUT    /admin/roles/{id}         — Update (with permission sync)
DELETE /admin/roles/{id}         — Delete
```

**Middleware:** `auth:admin`, `permission:roles.view-any`  
**Permissions:** `roles.create|roles.edit|roles.delete` (individual)

#### List Roles

```
GET /admin/roles
```

**Inertia Props:**
```json
{
    "roles": [
        {
            "id": 1,
            "name": "Super Admin",
            "description": null,
            "guard_name": "admin",
            "permissions_count": 0,
            "users_count": 1
        },
        {
            "id": 2,
            "name": "Admin",
            "description": null,
            "guard_name": "admin",
            "permissions_count": 85,
            "users_count": 0
        }
    ]
}
```

**Note:** Super Admin permissions bypass — `permissions_count` shows 0 since no explicit permissions are assigned.

#### Create Role

```
POST /admin/roles
```

**Request Body:**
```json
{
    "name": "Nurse Manager",
    "description": "Manages nursing staff and schedules"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255, unique:roles,name |
| `description` | nullable, string, max:500 |

#### Edit Role

```
GET /admin/roles/{id}/edit
```

**Inertia Props:**
```json
{
    "role": {
        "id": 2,
        "name": "Admin",
        "description": null
    },
    "groupedPermissions": {
        "appointments": [
            {"id": 1, "name": "appointments.view-any", "slug": "appointments.view-any"},
            {"id": 2, "name": "appointments.view", "slug": "appointments.view"}
        ],
        "doctors": [
            {"id": 10, "name": "doctors.view-any", "slug": "doctors.view-any"}
        ]
    },
    "assignedPermissionIds": [1, 2, 3, 10]
}
```

#### Update Role

```
PUT /admin/roles/{id}
```

**Request Body:**
```json
{
    "name": "Admin",
    "description": "Full admin access to all resources",
    "permission_ids": [1, 2, 3, 10, 11, 12, 20, 21, 22]
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255, unique:roles,name (except current) |
| `description` | nullable, string, max:500 |
| `permission_ids` | optional, array |

**Note:** `permission_ids` triggers `syncPermissions()` to update the role's permissions.

#### Delete Role

```
DELETE /admin/roles/{id}
```

**Restrictions:**
- Cannot delete system roles (Super Admin, Admin, Receptionist)
- Cannot delete roles with assigned users

**Error Response (400):**
```json
{
    "error": "Cannot delete system role."
}
```

---

### Permissions

```
GET    /admin/permissions              — List
GET    /admin/permissions/create       — Create form
POST   /admin/permissions              — Store
GET    /admin/permissions/{id}/edit    — Edit form
PUT    /admin/permissions/{id}         — Update
DELETE /admin/permissions/{id}         — Delete
```

**Middleware:** `auth:admin`, `permission:permissions.view-any`  
**Permissions:** `permissions.create|permissions.edit|permissions.delete`

#### List Permissions

```
GET /admin/permissions
```

**Inertia Props:**
```json
{
    "groupedPermissions": {
        "appointments": [
            {
                "id": 1,
                "name": "appointments.view-any",
                "slug": "appointments.view-any",
                "group": "appointments",
                "roles_count": 2
            }
        ],
        "doctors": [
            {
                "id": 10,
                "name": "doctors.view-any",
                "slug": "doctors.view-any",
                "group": "doctors",
                "roles_count": 1
            }
        ]
    }
}
```

#### Create Permission

```
POST /admin/permissions
```

**Request Body:**
```json
{
    "name": "View Reports",
    "slug": "reports.view",
    "group": "reports"
}
```

**Automatic Preparation:**
- If `slug` is empty, auto-generated from `name` (lowercased, spaces → hyphens)
- If `group` is empty, auto-extracted from `slug` (first segment before `.`)

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `name` | required, string, max:255 |
| `slug` | required, string, max:255, unique:permissions,name |
| `group` | required, string, max:255 |

#### Edit Permission

```
GET /admin/permissions/{id}/edit
```

**Inertia Props:**
```json
{
    "permission": {
        "id": 1,
        "name": "appointments.view-any",
        "slug": "appointments.view-any",
        "group": "appointments"
    }
}
```

#### Delete Permission

```
DELETE /admin/permissions/{id}
```

**Restriction:** Cannot delete permissions that are assigned to any role.

**Error Response (400):**
```json
{
    "error": "Cannot delete permission assigned to roles."
}
```

---

## 💾 Backup & Restore

All backup routes require `auth:admin`, `admin` middleware.

---

### List Backups

```
GET /admin/backups
```

**Middleware:** `permission:backups.view-any`

**Inertia Props:**
```json
{
    "backups": [
        {
            "filename": "2026-06-15-10-30-00.zip",
            "size": 15728640,
            "size_formatted": "15 MB",
            "created_at": "2026-06-15 10:30:00"
        }
    ]
}
```

---

### Create Backup

```
POST /admin/backups
```

**Middleware:** `permission:backups.create`

**Success Response (200):**
```json
{
    "message": "Backup created successfully",
    "filename": "2026-06-15-10-35-00.zip"
}
```

**Error Response (500):**
```json
{
    "message": "Backup failed. Check server logs for details.",
    "output": "...artisan output..."
}
```

---

### Download Backup

```
GET /admin/backups/download/{filename}
```

**Middleware:** `permission:backups.download`  
**Note:** `{filename}` accepts dot notation (e.g., `my-backup.zip`)

**Success Response:** Binary file download (streamed).

**Error Response (404):**
```json
{
    "message": "Backup file not found"
}
```

---

### Delete Backup

```
DELETE /admin/backups/{filename}
```

**Middleware:** `permission:backups.delete`

**Success Response (200):**
```json
{
    "message": "Backup deleted successfully"
}
```

---

### Restore from Existing Backup

```
POST /admin/backups/restore/{filename}
```

**Middleware:** `permission:backups.restore`

**Success Response (200):**
```json
{
    "message": "Backup restored successfully",
    "output": "...artisan output..."
}
```

**Error Response (500):**
```json
{
    "message": "Restore failed",
    "output": "...artisan output..."
}
```

---

### Upload & Restore

```
POST /admin/backups/upload-restore
```

**Middleware:** `permission:backups.restore`  
**Content-Type:** `multipart/form-data`

**Request Body:**
| Field | Type | Rules |
|-------|------|-------|
| `backup_file` | file | required, mimes:zip,gz,tar, max:512000 (500MB) |

**Accepted Formats:** `.zip` (spatie), `.tar.gz` (legacy)

**Success Response (200):**
```json
{
    "message": "Backup restored successfully from uploaded file",
    "output": "...artisan output..."
}
```

**Error Response (422):**
```json
{
    "message": "Only .zip and .tar.gz backup files are accepted"
}
```

---

## ⚙️ Settings

---

### Profile Settings

```
GET   /admin/settings/profile    — Edit profile
PATCH /admin/settings/profile    — Update profile
DELETE /admin/settings/profile   — Delete account
```

**Middleware:** `auth:admin` + permission checks  
**Permissions:** `profile.edit|profile.update`

#### Update Profile

```
PATCH /admin/settings/profile
```

**Request Body:**
```json
{
    "name": "Admin User",
    "email": "admin@raddiantplus.com"
}
```

#### Delete Profile

```
DELETE /admin/settings/profile
```

Logs out the admin and deletes the account. Redirects to login page.

---

### Security Settings

```
GET /admin/settings/security    — Security page (with 2FA setup)
```

**Middleware:** `auth:admin` + permission check  
**Permissions:** `security.edit`

**Inertia Props:**
```json
{
    "twoFactorEnabled": false,
    "twoFactorQrCode": "otpauth://totp/...",
    "twoFactorSecret": "JBSWY3DPEHPK3PXP",
    "recoveryCodes": null
}
```

---

### Update Password

```
PUT /admin/settings/password
```

**Middleware:** `auth:admin`, throttle:6,1

**Request Body:**
```json
{
    "current_password": "old-password-123",
    "password": "new-password-456",
    "password_confirmation": "new-password-456"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| `current_password` | required, string |
| `password` | required, string, confirmed, min:8 |

**Success Response (302):** Redirect back with status message.

**Error Response (422):**
```json
{
    "errors": {
        "current_password": ["The current password is incorrect."]
    }
}
```

---

### Enable Two-Factor Authentication

```
POST /admin/settings/two-factor/enable
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permission:** `two-factor.enable`

**Request Body:**
```json
{
    "two_factor_code": "123456"
}
```

Verifies the TOTP code against the generated secret, then saves the secret and generates 8 recovery codes.

**Success Response (302):** Redirect back with status message.

---

### Disable Two-Factor Authentication

```
POST /admin/settings/two-factor/disable
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permission:** `two-factor.disable`

**Request Body:**
```json
{
    "current_password": "my-password"
}
```

**Success Response (302):** Redirect back with status message.

---

### Regenerate Recovery Codes

```
POST /admin/settings/two-factor/regenerate
```

**Middleware:** `auth:admin`, `admin`, + permission check  
**Permission:** `two-factor.regenerate-codes`

**Request Body:**
```json
{
    "current_password": "my-password"
}
```

**Success Response (302):** Redirect back with new recovery codes in session.

---

### Appearance Settings

```
GET /admin/settings/appearance
```

**Middleware:** `auth:admin`  
**Permission:** `appearance.edit`

Renders the appearance settings page (theme toggle).

**Response:** Inertia page (`admin/settings/appearance`)

---

## 🖼️ File Uploads

### Upload Image

```
POST /upload/image
```

**Authentication:** None (TinyMCE-compatible)

**Content-Type:** `multipart/form-data`

**Request Body:**
| Field | Type | Rules |
|-------|------|-------|
| `image` | file | required, image, mimes:jpeg,png,jpg,gif,webp, max:5120 (5MB) |
| `filename` | string | optional, used to generate slugified filename |

**Success Response (200):**
```json
{
    "url": "http://localhost:8000/storage/uploads/image-1718461800.jpg",
    "path": "uploads/image-1718461800.jpg"
}
```

**Error Response (422):**
```json
{
    "errors": {
        "image": ["The image must be a file of type: jpeg, png, jpg, gif, webp."]
    }
}
```

---

### Delete Image

```
DELETE /upload/image
```

**Authentication:** None

**Request Body:**
```json
{
    "path": "uploads/image-1718461800.jpg"
}
```

**Success Response (200):**
```json
{
    "success": true
}
```

**Error Response (404):**
```json
{
    "success": false
}
```

---

## 🔧 Utility Routes

These routes have **no middleware** and are intended for development use.

---

### Fresh Migration & Seed

```
GET /migrate-fresh-seed
```

Drops all tables, runs all migrations, and seeds the database.

**Response (200):**
```json
{
    "output": "Migration and seeding output..."
}
```

---

### Run Migrations

```
GET /migrate
```

Runs any pending migrations.

**Response (200):**
```json
{
    "output": "Migration output..."
}
```

---

### Create Storage Symlink

```
GET /storage-link
```

Creates a symbolic link from `public/storage` to `storage/app/public`.

**Response (200):**
```json
{
    "message": "✅ Symlink created successfully"
}
```

**Possible Responses:**
- `⚠️ Symlink already exists`
- `⚠️ A file/folder named storage already exists - delete first`
- `❌ symlink() function is disabled`

---

## ❌ Error Responses

### Validation Error (422)
```json
{
    "errors": {
        "field_name": ["The field_name field is required."],
        "another_field": ["Validation error message."]
    }
}
```

### Authentication Error (401)
```json
{
    "message": "Unauthenticated."
}
```

### Permission Error (403)
```json
{
    "message": "You do not have permission to access this resource."
}
```

### Not Found (404)
```json
{
    "message": "Resource not found."
}
```

### Rate Limited (429)
```json
{
    "message": "Too many attempts. Please try again in 60 seconds."
}
```

### Server Error (500)
```json
{
    "message": "Server Error"
}
```

---

## 📝 Inertia Page Conventions

All admin routes return Inertia page responses (not raw JSON), rendering React components from `resources/js/pages/admin/`. The page data is passed as props:

| Route | Page Component | Props |
|-------|---------------|-------|
| `GET /admin/dashboard` | `admin/dashboard` | `stats`, `recentAppointments`, `recentInquiries`, `appointmentChart`, `inquiryChart`, `isAdmin` |
| `GET /admin/appointments` | `admin/appointments/index` | `appointments` |
| `GET /admin/appointments/create` | `admin/appointments/create` | `specializations`, `doctors` |
| `GET /admin/doctors` | `admin/doctors/index` | `doctors` |
| `GET /admin/doctors/create` | `admin/doctors/create` | `specializations` |
| `GET /admin/blogs` | `admin/blogs/index` | `blogs` |
| `GET /admin/blogs/create` | `admin/blogs/create` | — |
| `GET /admin/roles` | `admin/roles/index` | `roles` |
| `GET /admin/roles/{id}/edit` | `admin/roles/edit` | `role`, `groupedPermissions`, `assignedPermissionIds` |
| `GET /admin/permissions` | `admin/permissions/index` | `groupedPermissions` |
| `GET /admin/settings/profile` | `admin/settings/profile` | `mustVerifyEmail`, `status` |
| `GET /admin/backups` | `admin/backups/index` | `backups` |

All create/edit forms POST/PUT to the same URL and redirect back to the index on success.

---

## ✅ Response Status Code Summary

| Code | Meaning | When |
|------|---------|------|
| **200** | OK | GET list, POST store (JSON API) |
| **302** | Redirect | Form submission success (Inertia) |
| **401** | Unauthorized | Not logged in |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **422** | Validation Error | Invalid request data |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Server Error | Internal error |
