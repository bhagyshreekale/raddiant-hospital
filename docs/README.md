# Raddiant Plus Hospital - Application Documentation

A comprehensive Hospital Management System built with Laravel 13, Inertia.js v3, React 19, and Tailwind CSS v4.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 13 (PHP 8.5) |
| Frontend | Inertia.js v3 + React 19 |
| CSS | Tailwind CSS v4 |
| Auth | Laravel Fortify + Spatie Permission (RBAC) |
| Database | SQLite (dev) / MySQL (prod) |
| Testing | Pest PHP v4 |

## Architecture Overview

- **Two auth guards:** `web` (User model) and `admin` (Admin model)
- **Three roles:** Super Admin, Admin, Receptionist (Satie Permission)
- **Admin panel:** Server-side Inertia rendering (no SPA client-side routing)
- **Public website:** Server-rendered pages with shared layout components
- **Total routes:** 203

## Documentation Index

### Core System
- [Authentication & Authorization](./authentication.md) - Login, 2FA, password reset, auth guards
- [Role-Based Access Control (RBAC)](./rbac.md) - Spatie Permission roles and permissions
- [Admin Users](./admin-users.md) - Admin user management
- [Dashboard](./dashboard.md) - Admin dashboard with stats and charts

### Public Website
- [Public Website / CMS](./public-website.md) - Homepage, about, services, doctors, blog, etc.

### Content Management
- [Doctors Management](./doctors.md) - Doctor profiles and listings
- [Specializations Management](./specializations.md) - Medical specializations
- [Services Management](./services.md) - Hospital services
- [Health Packages / Facilities](./health-packages.md) - Health checkup packages
- [Insurance Partners](./insurance-partners.md) - Insurance company listings

### Patient Interaction
- [Appointments Management](./appointments.md) - Appointment booking and scheduling
- [Bed Availability](./bed-availability.md) - Hospital bed tracking
- [Inquiries Management](./inquiries.md) - Patient inquiry tracking

### Content Publishing
- [Blog Management](./blog.md) - Blog posts and categories
- [Testimonials Management](./testimonials.md) - Patient testimonials
- [Gallery Management](./gallery.md) - Photo gallery with categories

### HR & Recruitment
- [Careers & Job Applications](./careers.md) - Job listings and application management

### System Configuration
- [Contact Info Management](./contact-info.md) - Hospital contact information
- [Website Settings](./website-settings.md) - CMS configuration and site settings
- [Navigation Links](./website-settings.md#navigation-links) - Header/footer navigation
- [Backup & Restore](./backup-restore.md) - Database and file backups

### API & Utilities
- [Site Data API](./site-data-api.md) - Public JSON API for site data
- [Image Upload](./image-upload.md) - Image upload/delete endpoints

### Database
- [Database Schema](./database-schema.md) - Complete database schema reference

## Directory Structure

```
├── app/
│   ├── Actions/Fortify/          # Auth actions
│   ├── Console/Commands/         # Artisan commands
│   ├── Concerns/                 # Shared traits
│   ├── Http/
│   │   ├── Controllers/          # All controllers
│   │   │   ├── Admin/            # Admin-specific controllers
│   │   │   ├── Auth/             # Auth controllers
│   │   │   └── Settings/         # User settings
│   │   └── Middleware/            # Auth & Inertia middleware
│   └── Models/                   # Eloquent models
├── config/                       # Configuration files
├── database/
│   ├── factories/                # Model factories
│   ├── migrations/               # Database migrations
│   └── seeders/                  # Database seeders
├── resources/js/
│   ├── components/               # Reusable React components
│   │   ├── design/               # Design system components
│   │   ├── sections/             # Public website sections
│   │   └── ui/                   # Shadcn/UI components
│   └── pages/                    # Inertia page components
│       ├── admin/                # Admin panel pages
│       └── [public pages]        # Public website pages
├── routes/                       # Route definitions
└── tests/                        # Pest tests
```

## Roles & Permissions Summary

| Role | Access Level |
|------|-------------|
| **Super Admin** | Full access (Gate bypass) |
| **Admin** | All granular permissions |
| **Receptionist** | Limited: appointments, bed-availability, inquiries, job-applications, profile, security, appearance |

## Key Features

1. **Dual Auth System** - Separate admin and user authentication with username-based admin login
2. **2FA Support** - TOTP-based two-factor authentication with recovery codes
3. **RBAC** - Granular permissions organized by feature groups
4. **Public CMS** - Dynamic website content managed via admin panel
5. **Appointment Booking** - Online appointment scheduling with specialization/doctor selection
6. **Backup System** - Automated database and file backups with restore capability
7. **Dark Mode** - System/light/dark appearance toggle
8. **Responsive Design** - Mobile-friendly admin panel and public website

## Feature Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                      CORE SYSTEM                                │
│  [Authentication] ──→ [RBAC] ──→ [Admin Users]                │
│         │                    │                                  │
│         └────────────────────┴──→ [Dashboard]                  │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    HOSPITAL MANAGEMENT                          │
│  [Specializations] ──→ [Doctors]                               │
│         │                    │                                  │
│         └──────→ [Appointments] ←── [Public Website]           │
│                              │                                  │
│  [Services] ────────────────→│                                  │
│  [Health Packages] ─────────→│                                  │
│  [Insurance Partners] ───────→│                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    PATIENT INTERACTION                          │
│  [Inquiries] ←── [Public Website]                              │
│  [Bed Availability] ←── [Dashboard]                            │
│  [Testimonials] ←── [Public Website]                           │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT MANAGEMENT                           │
│  [Blog] ──→ [Public Website]                                   │
│  [Gallery] ──→ [Public Website]                                │
│  [Careers] ──→ [Job Applications]                              │
└─────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    SYSTEM CONFIGURATION                         │
│  [Website Settings] ──→ [Navigation Links]                     │
│  [Contact Info] ──→ [Public Website]                           │
│  [Backup & Restore]                                            │
│  [Image Upload] ──→ [All CRUD Features]                        │
└─────────────────────────────────────────────────────────────────┘
```
