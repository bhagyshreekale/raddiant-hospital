# 🏥 Raddiant Plus Hospital — Management System

A comprehensive hospital management system built with **Laravel 13**, **Inertia.js v3**, **React 19**, and **Tailwind CSS v4**. This application serves both as a public-facing hospital website and a full-featured administrative panel with Role-Based Access Control (RBAC).

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Public Features](#-public-features)
- [Admin Features](#-admin-features)
- [Roles & Permissions](#-roles--permissions)
- [Admin Navigation](#-admin-navigation)
- [Installation & Setup](#-installation--setup)
- [Development Commands](#-development-commands)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | PHP 8.5, Laravel 13 |
| **Frontend** | React 19, Inertia.js v3 |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Auth** | Laravel Fortify v1 (Admin 2FA, Password Reset) |
| **RBAC** | Spatie Laravel Permission v7 |
| **Backups** | Spatie Laravel Backup v10 |
| **Database** | MySQL / MariaDB |
| **Build** | Vite, Laravel Wayfinder (typed routes) |
| **Testing** | Pest PHP 4 |

---

## 🏛️ Architecture Overview

The application uses a **monolithic Laravel** backend with an **Inertia.js SPA** frontend. All page rendering is handled server-side via `Inertia::render()`, while navigation and interactions feel like a modern SPA.

```
┌─────────────────────────────────────────────┐
│            Public Website                    │
│  (Home, Services, Doctors, Blog, etc.)       │
├─────────────────────────────────────────────┤
│         Admin Panel (Inertia SPA)            │
│  ┌──────────────────────────────────────┐   │
│  │  Super Admin    │  Admin  │ Receptionist│
│  └──────────────────────────────────────┘   │
│          Spatie Laravel Permission           │
├─────────────────────────────────────────────┤
│         Laravel 13 Backend (API/SSR)         │
│  ┌──────────────────────────────────────┐   │
│  │  Controllers  │  Models  │  Services  │   │
│  └──────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│                  MySQL DB                    │
└─────────────────────────────────────────────┘
```

- **Public pages** are server-rendered via Inertia and pass `siteData` (hospital name, logo, contact info, navigation visibility) to the frontend.
- **Admin pages** use Inertia's SPA navigation with permission checks on both the backend (middleware) and frontend (sidebar filtering).
- **Dynamic site data** is managed through the `WebsiteSettings` model and exposed via API (`/api/site-data`).

---

## 🌐 Public Features

### 1. Home Page (`/` or `/home`)
- **Hero Section** — prominent banner with hospital branding and CTA
- **Emergency Banner** — clickable emergency contact strip
- **About Preview** — hospital highlights and ethos
- **Services Section** — up to 8 services with icons and colored backgrounds
- **Why Choose Us** — differentiators and trust signals
- **Doctors Section** — featured doctor profiles (up to 3)
- **Testimonials Section** — patient reviews with specialization-based color theming
- **CTA Banner** — "Book an Appointment" call-to-action
- **Footer** — dynamic with specialties, quick links, contact info
- **Floating Actions** — WhatsApp quick-chat and back-to-top button

### 2. About Us (`/about`)
- Hospital overview with images
- Featured doctors preview
- Mission, vision, and values
- Contact and location info from site settings

### 3. Services (`/services`)
- Complete list of hospital services
- Services auto-categorized into: Diagnostics, Surgery, Emergency, Specialty
- Each service shows image, title, description, and color indicator
- Data managed via admin panel

### 4. Gallery (`/gallery`)
- Filterable image gallery with category tabs (All, Facilities, etc.)
- Title and category metadata per image
- Images stored via storage uploads

### 5. Facilities (`/facilities`)
- **Health Packages** — Pricing cards with feature lists (e.g., "Full Body Checkup," "Cancer Screening")
- **Bed Availability** — Real-time bed status per ward type (General Ward, ICU, NICU, etc.) with color indicators
- **Insurance Partners** — Categorized partner logos (Public, Private, TPA)

### 6. Doctors (`/doctors`)
- Doctor directory by specialization
- Each card: photo, name, specialty, qualifications, availability
- Data linked to `Specialization` model

### 7. Blog (`/blog`, `/blog/{id}`)
- Blog listing page with featured images and read times
- Single blog view with full content and recent posts sidebar
- Categories for filtering

### 8. Contact (`/contact`)
- Contact form with reference ID generation (`RPH-XXXX`)
- Real-time inquiry submission tracking
- Maps integration placeholder
- Address, phone, email from site settings

### 9. Careers (`/careers`)
- Job listing with title, specialization, salary, location, job type, experience
- Per-job application form with resume upload (PDF, DOC, DOCX, max 5MB)
- Categories: Full-time, Part-time, Contract

### 10. Appointment Booking (`/appointment`)
- Multi-step booking form:
  1. Personal info (name, phone, email, gender)
  2. Appointment details (specialty, preferred doctor, date, time slots)
- Time slot grid with visual selection
- Confirmation screen with appointment summary
- Validation: phone, email, required fields
- Success/error feedback with flash messages

### 11. FAQ (`/faq`)
- Static FAQ page with common hospital questions

---

## 🔐 Admin Features

### Authentication

| Feature | Details |
|---------|---------|
| **Login** | `/admin/login` — Admin-only login with separate guard (`auth:admin`) |
| **2FA** | Two-Factor Authentication via TOTP (QR code + recovery codes) |
| **Password Reset** | Forgot password flow with email link |
| **Rate Limiting** | 5 attempts per minute on login and 2FA verification |
| **Session Security** | Separate session for admin guard |

### 1. Dashboard (`/admin/dashboard`)

**Role-aware dashboard** with contextual data:

| Metric | Receptionist | Admin |
|--------|:------------:|:-----:|
| Today's Appointments | ✅ | ✅ |
| Total Doctors | ✅ | ✅ |
| New Inquiries | ✅ | ✅ |
| Monthly Appointments | ✅ | ✅ |
| Appointment Chart (30-day) | ✅ | ✅ |
| Inquiry Status Donut Chart | ✅ | ✅ |
| Recent Appointments List | ✅ | ✅ |
| Recent Inquiries List | ✅ | ✅ |
| Bed Availability Card | ✅ | ✅ |
| Total Blogs | ❌ | ✅ |
| Job Applications | ❌ | ✅ |
| Completed Inquiries | ❌ | ✅ |

**Quick Actions panel** provides shortcuts to appointments, inquiries, doctors, bed availability, and job applications.

### 2. Appointment Management
**Route:** `/admin/appointments`

| Action | Permission |
|--------|-----------|
| List all appointments | `appointments.view-any` |
| View appointment details | `appointments.view` |
| Update appointment | `appointments.update` |
| Delete appointment | `appointments.delete` |

Fields: patient name, phone, email, age, gender, visit type (Emergency/OPD), specialization, doctor, preferred date, time slot, description.

### 3. Doctor Management
**Route:** `/admin/doctors`

| Action | Permission |
|--------|-----------|
| List doctors | `doctors.view-any` |
| View doctor | `doctors.view` |
| Create doctor | `doctors.create` |
| Update doctor | `doctors.update` |
| Delete doctor | `doctors.delete` |

Fields: name, specialization (dropdown), education, image, availability.

### 4. Specialization Management
**Route:** `/admin/specializations`

CRUD for medical specializations (Cardiology, Orthopedics, Neurology, etc.). Fields: name, image, description. Linked to doctors, testimonials, and appointments.

### 5. Service Management
**Route:** `/admin/services`

CRUD for hospital services displayed on the Services page. Fields: title, image, description, color.

### 6. Testimonial Management
**Route:** `/admin/testimonials`

CRUD for patient testimonials. Fields: specialization (dropdown), patient name, patient type, description, profile image. Displayed on the homepage with gradient color theming based on specialization.

### 7. Blog Management
**Route:** `/admin/blogs`

Full CRUD with:
- Title, category, description (rich text via TinyMCE), read time
- Image upload (JPEG, PNG, WebP, max 2MB)
- Automatic image storage cleanup on delete
- Recent posts sidebar on the public blog page

### 8. Gallery Management
**Route:** `/admin/gallery`

CRUD for gallery images. Fields: image (required), title, category. Categories are used for the filterable gallery on the public site.

### 9. Career / Job Posting Management
**Route:** `/admin/careers`

CRUD for job postings. Fields: specialization, title, salary, location, job type (Full-time/Part-time/Contract), experience, description. Published careers appear on the public Careers page.

### 10. Job Application Management
**Route:** `/admin/job-applications`

| Action | Permission |
|--------|-----------|
| List applications | `job-applications.view-any` |
| View application | `job-applications.view` |
| Delete application | `job-applications.delete` |
| Download resume | `job-applications.download` |

Supports resume file upload (PDF, DOC, DOCX, max 5MB) with secure download.

### 11. Inquiry Management
**Route:** `/admin/inquiries`

| Action | Permission |
|--------|-----------|
| List inquiries | `inquiries.view-any` |
| Delete inquiry | `inquiries.delete` |
| Update status | `inquiries.update-status` |

Status workflow: `new → contacted → completed → cancelled`. Each inquiry generates a unique reference ID (`RPH-XXXX`).

### 12. Bed Availability
**Route:** `/admin/bed-availability`

Manage bed counts per ward. Fields: total beds, available beds, status (Good/Limited/Full). Shown on the Facilities page and dashboard (receptionist).

### 13. Health Package Management
**Route:** `/admin/health-packages`

CRUD for health checkup packages. Fields: name, description, price, features (array), is_featured (boolean). Displayed on the Facilities page with pricing cards.

### 14. Insurance Partner Management
**Route:** `/admin/insurance-partners`

CRUD for insurance partners. Fields: name, category (public/private/tpa), logo. Logo upload with automatic storage cleanup. Displayed on the Facilities page.

### 15. Contact Info Management
**Route:** `/admin/contact`

Manage contact information entries. Fields: email, phone, address, open hours, map link.

### 16. Navigation Links (`/admin/navigation-links`)

**Dynamic navigation** with drag-and-drop reordering (via `@dnd-kit`):

| Feature | Details |
|---------|---------|
| Header links | Main navigation bar items |
| Footer links | Footer quick links |
| Drag-drop reorder | Visual sortable list |
| Visibility toggle | Show/hide individual links |
| Inline editing | Edit label and URL directly |

Permissions: `navigation-links.view-any`, `.create`, `.update`, `.delete`, `.reorder`.

### 17. Website Settings (`/admin/website-settings`)

Centralized configuration hub with the following groups:

| Group | Settings |
|-------|----------|
| **Branding** | Hospital name, tagline, logo |
| **Contact** | Phone, email, address, emergency number, WhatsApp |
| **Social** | Facebook, Instagram, YouTube URLs |
| **Navigation Visibility** | Toggle visibility for: Home, About, Services, Facilities, Blog, Gallery, Contact, Careers, Appointment |
| **Footer** | Tagline, description, specialties list, contact info, timing |

All settings persisted via key-value `website_settings` table.

### 18. Admin User Management (`/admin/admins`)
**🔒 Super Admin only for create/delete**

| Action | Permission | Restriction |
|--------|-----------|-------------|
| List admins | `admins.view-any` | — |
| Create admin | `admins.create` | Super Admin only |
| Edit admin | `admins.update` | — |
| Delete admin | `admins.delete` | Super Admin only (cannot delete Super Admin) |

Each admin can be assigned a role (Super Admin, Admin, Receptionist) via Spatie roles.

### 19. Role Management (`/admin/roles`)

| Action | Permission |
|--------|-----------|
| List roles | `roles.view-any` |
| Create role | `roles.create` |
| Edit role | `roles.edit` |
| Delete role | `roles.delete` |

**Edit page features a permission grid:**
- Permissions grouped by resource (appointments, doctors, blogs, etc.)
- Select All / Deselect All per group
- Visual checkbox grid with permission slugs
- Cannot delete system roles (Super Admin, Admin, Receptionist)
- Cannot delete roles with assigned users

### 20. Permission Management (`/admin/permissions`)

| Action | Permission |
|--------|-----------|
| List permissions | `permissions.view-any` |
| Create permission | `permissions.create` |
| Edit permission | `permissions.edit` |
| Delete permission | `permissions.delete` |

Permissions are auto-grouped by the first segment of the dot-notation name (e.g., `doctors.view-any` → group `doctors`). Cannot delete permissions that are assigned to roles.

### 21. Backup & Restore (`/admin/backups`)

Powered by `spatie/laravel-backup` with a custom restore command:

| Action | Permission |
|--------|-----------|
| View backups | `backups.view-any` |
| Create backup | `backups.create` |
| Download backup | `backups.download` |
| Delete backup | `backups.delete` |
| Restore from backup | `backups.restore` |

**Features:**
- Create on-demand database backups
- Upload a `.zip` backup file and restore from it
- Download backup files to local machine
- Delete old backups
- Supports `.zip` (spatie) and `.tar.gz` (legacy) formats
- File size display with human-readable formatting

### 22. Profile & Security Settings

| Feature | Permission | Details |
|---------|-----------|---------|
| Profile editing | `profile.edit`, `profile.update` | Admin username |
| Password change | `security.update-password` | Rate-limited (6/hour) |
| 2FA enable | `two-factor.enable` | QR code + recovery codes |
| 2FA disable | `two-factor.disable` | Confirmation required |
| Regenerate codes | `two-factor.regenerate-codes` | Reset recovery codes |
| Appearance | `appearance.edit` | Theme preference |

### 23. Task Management (`/admin/tasks`)
Basic CRUD for internal tasks. Fields: title, description.

### 24. Image Upload
**Routes:** `POST /upload/image`, `DELETE /upload/image`

TinyMCE-compatible image upload endpoint for rich text editors.

---

## 👥 Roles & Permissions

### Role Hierarchy

```
Super Admin (gate bypass — all permissions)
    └── Admin (all granular permissions)
         └── Receptionist (limited subset)
```

### Role Definitions

| Role | Description | Permissions Count |
|------|-------------|-------------------|
| **Super Admin** | Full system access via Spatie gate bypass | All (no explicit assignment) |
| **Admin** | Full CRUD on all resources | ~80+ granular permissions |
| **Receptionist** | Front desk operations | ~20 permissions |

### Receptionist Permissions

| Resource | Permissions |
|----------|-------------|
| **Appointments** | view-any, view, update, delete |
| **Bed Availability** | view-any, view, create, update, delete |
| **Inquiries** | view-any, delete, update-status |
| **Job Applications** | view-any, view, delete, download |
| **Profile** | edit, update |
| **Security** | edit, update-password |
| **Appearance** | edit |

### Admin-Only Permissions

| Resource | Permissions |
|----------|-------------|
| **Website Settings** | view, update |
| **Navigation Links** | view-any, create, update, delete, reorder |
| **Doctors** | view-any, view, create, update, delete |
| **Specializations** | view-any, view, create, update, delete |
| **Services** | view-any, view, create, update, delete |
| **Testimonials** | view-any, view, create, update, delete |
| **Blogs** | view-any, view, create, update, delete |
| **Gallery** | view-any, view, create, update, delete |
| **Careers** | view-any, view, create, update, delete |
| **Health Packages** | view-any, view, create, update, delete |
| **Insurance Partners** | view-any, view, create, update, delete |
| **Contact** | view-any, view, create, update, delete |
| **Roles** | view-any, create, edit, delete |
| **Permissions** | view-any, create, edit, delete |
| **Admins** | view-any, view, update |
| **Backups** | view-any, create, download, delete, restore |
| **Two-Factor** | enable, disable, regenerate-codes |

---

## 🧭 Admin Navigation

The sidebar is role-aware:

### Super Admin & Admin Sidebar
Dashboard → Doctors → Appointments → Inquiries → Bed Availability → Specializations → Services → Testimonials → Blogs → Gallery → Careers → Job Applications → Health Packages → Insurance Partners → Website Settings → Navigation Links → Admins → Roles → Permissions → Backups

### Receptionist Sidebar
Dashboard → Appointments → Inquiries → Bed Availability → Job Applications

---

## 🚀 Installation & Setup

### Prerequisites
- PHP 8.5+
- Composer
- MySQL / MariaDB
- Node.js 20+
- npm / pnpm / yarn

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd raddiant-hospital

# 2. Install PHP dependencies
composer install

# 3. Install JavaScript dependencies
npm install

# 4. Environment setup
cp .env.example .env
php artisan key:generate

# 5. Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=raddiant_hospital
DB_USERNAME=root
DB_PASSWORD=

# 6. Run migrations and seeders
php artisan migrate:fresh --seed

# 7. Create storage symlink
php artisan storage:link

# 8. Build frontend assets
npm run build

# 9. Start the development server
php artisan serve

# Or use Laravel Valet, Herd, or Sail
```

### Default Credentials

| Role | Username | Password |
|------|----------|----------|
| **Super Admin** | `admin` | `admin123` |
| **Receptionist** | `receptionist` | `receptionist123` |

### mysqldump for Backups

The backup system requires `mysqldump` to be available. For macOS (Homebrew):

```bash
# The binary path is configured in config/database.php as:
# dump_binary_path => '/opt/homebrew/bin/'
```

---

## 🔧 Development Commands

```bash
# Run Laravel dev server
php artisan serve

# Run Vite dev server for frontend hot-reload
npm run dev

# Or run both simultaneously
composer run dev

# Build assets for production
npm run build

# Run migrations
php artisan migrate

# Fresh migrate + seed
php artisan migrate:fresh --seed

# Run tests
php artisan test --compact

# Run specific test
php artisan test --compact --filter=testName

# Generate Wayfinder typed routes
php artisan wayfinder:generate

# Format PHP code
vendor/bin/pint --format agent

# Create a backup
php artisan backup:run --disable-notifications

# List routes
php artisan route:list

# Run tinker (interactive shell)
php artisan tinker
```

---

## 🗄️ Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `admins` | Admin users (separate guard from `users`) |
| `users` | Public users (inactive — Fortify routes return 404) |
| `permissions` | Spatie permissions with `group` column |
| `roles` | Spatie roles |
| `model_has_roles` | Role assignments |
| `role_has_permissions` | Permission assignments |

### Business Tables

| Table | Model | Key Fields |
|-------|-------|------------|
| `specializations` | Specialization | name, image, description |
| `doctors` | Doctor | name, specialization_id, education, image, availability |
| `services` | Service | title, image, description, color |
| `appointments` | Appointment | full_name, phone, specialization_id, doctor_id, preferred_date, time_slot, visit_type |
| `inquiries` | Inquiry | reference_id, name, phone, email, department, status |
| `blogs` | Blog | title, category, image, description, read_time |
| `gallery` | Gallery | image, title, category |
| `testimonials` | Testimonial | specialization_id, patient_name, patient_type, description, profile_image |
| `careers` | Career | specialization, title, salary, location, job_type, experience, description |
| `job_applications` | JobApplication | job_id, full_name, email, phone, experience, resume_url |
| `health_packages` | HealthPackage | name, description, price, features (JSON), is_featured |
| `insurance_partners` | InsurancePartner | name, category, logo |
| `bed_availability` | BedAvailability | total_beds, available_beds, status |
| `contact_info` | ContactInfo | email, phone, address, open_hours, map_link |
| `navigation_links` | NavigationLink | type, label, url, is_visible, sort_order |
| `website_settings` | WebsiteSettings | key, value |
| `tasks` | Task | title, description |

---

## 🔌 API Endpoints

### Public API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/site-data` | GET | Full site configuration (branding, nav, footer) |
| `/api/navigation-links?type=header` | GET | Navigation links for a specific type |

### Admin Routes (all prefixed with `/admin`)

| Resource | Methods | Middleware |
|----------|---------|-----------|
| `/admin/login` | GET, POST | guest:admin |
| `/admin/2fa/verify` | POST | throttle:5,1 |
| `/admin/logout` | POST | auth:admin |
| `/admin/forgot-password` | GET, POST | guest:admin |
| `/admin/reset-password/{token}` | GET, POST | guest:admin |
| `/admin/dashboard` | GET | auth:admin |
| `/admin/appointments` | GET, PUT, DELETE | permission-based |
| `/admin/bed-availability` | GET, POST, PUT, DELETE | permission-based |
| `/admin/inquiries` | GET, DELETE | permission-based |
| `/admin/inquiries/{id}/status` | PUT | permission-based |
| `/admin/job-applications` | GET, DELETE | permission-based |
| `/admin/job-applications/{id}/download` | GET | permission-based |
| `/admin/doctors` | FULL CRUD | permission-based |
| `/admin/specializations` | FULL CRUD | permission-based |
| `/admin/services` | FULL CRUD | permission-based |
| `/admin/testimonials` | FULL CRUD | permission-based |
| `/admin/blogs` | FULL CRUD | permission-based |
| `/admin/gallery` | FULL CRUD | permission-based |
| `/admin/careers` | FULL CRUD | permission-based |
| `/admin/health-packages` | FULL CRUD | permission-based |
| `/admin/insurance-partners` | FULL CRUD | permission-based |
| `/admin/contact` | FULL CRUD | permission-based |
| `/admin/navigation-links` | GET, POST, PUT, DELETE | permission-based |
| `/admin/navigation-links/reorder` | POST | permission-based |
| `/admin/website-settings` | GET, POST, PATCH | permission-based |
| `/admin/admins` | GET, POST, PUT, DELETE | permission-based + Super Admin |
| `/admin/roles` | FULL CRUD | permission-based |
| `/admin/permissions` | FULL CRUD | permission-based |
| `/admin/backups` | GET, POST, DELETE | permission-based |
| `/admin/backups/restore/{filename}` | POST | permission-based |
| `/admin/backups/upload-restore` | POST | permission-based |
| `/admin/settings/profile` | GET, PATCH | permission-based |
| `/admin/settings/security` | GET | permission-based |
| `/admin/settings/password` | PUT | throttle:6,1 |
| `/admin/settings/two-factor/*` | POST | permission-based |

### Utility Routes (no middleware)

| Endpoint | Description |
|----------|-------------|
| `/migrate-fresh-seed` | Run `migrate:fresh --seed` |
| `/migrate` | Run `migrate` |
| `/storage-link` | Create storage symlink via PHP |

---

## 📁 Project Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Admin/           # Admin panel controllers
│   │   │   ├── BackupController.php
│   │   │   ├── DashboardController.php
│   │   │   ├── NavigationLinkController.php
│   │   │   ├── PermissionsController.php
│   │   │   ├── RolesController.php
│   │   │   ├── WebsiteSettingsController.php
│   │   │   └── Settings/    # Profile & Security controllers
│   │   ├── Auth/            # Admin auth controllers
│   │   ├── Settings/        # Admin profile controller
│   │   ├── SiteController.php        # Public pages
│   │   ├── DoctorController.php      # Doctor CRUD + public
│   │   ├── BlogController.php        # Blog CRUD + public
│   │   └── ...              # Other resource controllers
│   ├── Middleware/           # EnsureUserIsAdmin, etc.
│   └── Requests/            # Form request validation
├── Models/                   # Eloquent models (20+)
└── Console/Commands/         # Custom Artisan commands
resources/
├── js/
│   ├── pages/               # Inertia page components
│   │   ├── admin/           # Admin panel pages (80+ files)
│   │   ├── admin/auth/      # Admin auth pages
│   │   └── *.tsx            # Public pages
│   ├── components/          # Shared UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Navbar, Footer, etc.
│   │   └── sections/        # Homepage sections
│   └── lib/                 # Utilities
routes/
├── web.php                  # Public + admin routes
└── admin.php                # Admin-specific routes
database/
├── migrations/              # 20+ migration files
└── seeders/                 # 15+ seeder files
docs/                        # Documentation and plans
```

---

## 🧪 Testing

```bash
# Run all tests
php artisan test --compact

# Run a specific test file
php artisan test --compact --filter=RolePermissionTest

# Run feature tests
php artisan test --compact tests/Feature
```

---

## 🔐 Security Features

- **Rate limiting** on login (5 attempts/min) and 2FA verification
- **Two-Factor Authentication** via TOTP (Fortify)
- **Separate admin guard** with own session
- **Permission-based middleware** on every admin route
- **Super Admin gate** for critical operations (admin CRUD)
- **Protected system roles** from deletion
- **File upload validation** (type, size limits)
- **Password hashing** via Laravel's bcrypt
- **Environment-based configuration**

---

## 📄 License

This is a proprietary hospital management system.
