# Public Website / CMS

## Overview

The public-facing website is a server-rendered Laravel application with Inertia.js. It showcases hospital information, services, doctors, and allows patient interactions (appointments, inquiries, job applications).

## Routes

```
GET  /                              → SiteController@home
GET  /home                          → SiteController@home
GET  /about                         → SiteController@about
GET  /services                      → SiteController@services
GET  /doctors                       → SiteController@doctors
GET  /facilities                    → SiteController@facilities
GET  /gallery                       → SiteController@gallery
GET  /blog                          → SiteController@blog
GET  /blog/{blog}                   → SiteController@blogShow
GET  /contact                       → SiteController@contact
GET  /careers                       → SiteController@careers
GET  /appointment                   → SiteController@appointment
GET  /appoinment                    → SiteController@appointment (alias)
GET  /faq                           → SiteController@faq
```

## Controller

**File:** `app/Http/Controllers/SiteController.php`

## Public Pages

### Homepage (`/`)
**File:** `resources/js/pages/home.tsx`

Sections:
- **Hero Section** - Hospital tagline, CTA buttons
- **Services Section** - Featured services grid
- **Doctors Section** - Featured doctors
- **Testimonials Section** - Patient testimonials
- **About Preview** - Brief about section
- **Why Choose Us** - Hospital differentiators
- **CTA Banner** - Call-to-action

### About Page (`/about`)
**File:** `resources/js/pages/about.tsx`

Content:
- Hospital overview
- Team/doctors listing
- Mission/vision

### Services Page (`/services`)
**File:** `resources/js/pages/services.tsx`

Content:
- All hospital services
- Service cards with images

### Doctors Page (`/doctors`)
**File:** `resources/js/pages/doctors.tsx`

Content:
- All doctors with specializations
- Filter by specialization

### Facilities Page (`/facilities`)
**File:** `resources/js/pages/facilities.tsx`

Content:
- Health packages
- Package pricing and features

### Gallery Page (`/gallery`)
**File:** `resources/js/pages/gallery.tsx`

Content:
- Photo gallery with categories
- Filter by category

### Blog Page (`/blog`)
**File:** `resources/js/pages/blog.tsx`

Content:
- Blog listing with categories
- Featured posts

### Blog Show (`/blog/{blog}`)
**File:** `resources/js/pages/blog/show.tsx`

Content:
- Single blog post
- Related posts

### Contact Page (`/contact`)
**File:** `resources/js/pages/contact.tsx`

Content:
- Contact information
- Patient inquiry form
- Google Maps integration

### Careers Page (`/careers`)
**File:** `resources/js/pages/careers.tsx`

Content:
- Job listings
- Application form

### Appointment Page (`/appointment`)
**File:** `resources/js/pages/appoinment.tsx`

Content:
- Appointment booking form
- Specialization/doctor selection
- Date/time slot selection

### FAQ Page (`/faq`)
**File:** `resources/js/pages/faq.tsx`

Content:
- Frequently asked questions
- Accordion-style display

## Public Components

### Sections (`resources/js/components/sections/`)

| Component | File | Purpose |
|-----------|------|---------|
| HeroSection | `HeroSection.jsx` | Homepage hero banner |
| ServicesSection | `ServicesSection.jsx` | Services showcase |
| DoctorsSection | `DoctorsSection.jsx` | Doctors listing |
| TestimonialsSection | `TestimonialsSection.jsx` | Patient testimonials |
| AboutPreview | `AboutPreview.jsx` | About section preview |
| CTABanner | `CTABanner.jsx` | Call-to-action banner |
| WhyChooseUs | `WhyChooseUs.jsx` | Why choose us section |
| PatientInquiryForm | `PatientInquiryForm.jsx` | Patient inquiry form |
| Faqsection | `Faqsection.tsx` | FAQ section |
| MapSection | `MapSection.tsx` | Google Maps section |
| JobListingsClient | `JobListingsClient.jsx` | Job listings section |
| EmergencyBanner | `EmergencyBanner.jsx` | Emergency banner |

### Layout (`resources/js/components/layout/`)

| Component | File | Purpose |
|-----------|------|---------|
| Navbar | `Navbar.jsx` | Public navigation bar |
| Footer | `Footer.jsx` | Public footer |

### Design Components (`resources/js/components/design/`)

| Component | File | Purpose |
|-----------|------|---------|
| DoctorCard | `DoctorCard.jsx` | Doctor card display |
| ServiceCard | `ServiceCard.jsx` | Service card display |
| TestimonialCard | `TestimonialCard.jsx` | Testimonial card |
| SectionHeader | `SectionHeader.jsx` | Section headers |
| FloatingActions | `FloatingActions.jsx` | Floating action buttons |
| FloatingButtons | `FloatingButtons.jsx` | WhatsApp/phone buttons |

### Blog Components (`resources/js/components/blog/`)

| Component | File | Purpose |
|-----------|------|---------|
| BlogCard | `BlogCard.tsx` | Blog post card |
| BlogModal | `BlogModal.tsx` | Blog post modal |
| FeaturedCard | `FeaturedCard.tsx` | Featured blog card |
| Newsletter | `Newsletter.tsx` | Newsletter subscription |

## Public Forms

### Patient Inquiry
- **Endpoint:** `POST /inquiry`
- **Fields:** name, phone, email, department, visit_type, preferred_date, preferred_time, message
- **Response:** JSON with reference_id

### Appointment Booking
- **Endpoint:** `POST /appointment`
- **Fields:** full_name, phone, email, age, gender, visit_type, specialization_id, doctor_id, preferred_date, time_slot, description
- **Response:** JSON with confirmation

### Job Application
- **Endpoint:** `POST /job-application`
- **Fields:** job_id, full_name, email, phone, experience, resume
- **Response:** JSON with confirmation

## Data Sources

All public pages fetch data from the database:
- Services → `services` table
- Doctors → `doctors` table (with specialization)
- Specializations → `specializations` table
- Blogs → `blogs` table
- Testimonials → `testimonials` table
- Gallery → `gallery` table
- Health Packages → `health_packages` table
- Careers → `careers` table
- Contact Info → `contact_info` table
- Navigation Links → `navigation_links` table
- Website Settings → `website_settings` table

---

## Related Documentation

- [Doctors](./doctors.md) - Doctor profiles displayed on public site
- [Specializations](./specializations.md) - Medical departments for doctor filtering
- [Services](./services.md) - Hospital services showcase
- [Blog](./blog.md) - Blog posts and categories
- [Testimonials](./testimonials.md) - Patient testimonials
- [Gallery](./gallery.md) - Photo gallery with categories
- [Health Packages](./health-packages.md) - Facilities/health packages
- [Careers](./careers.md) - Job listings
- [Inquiries](./inquiries.md) - Patient inquiry submissions
- [Appointments](./appointments.md) - Appointment booking form
- [Contact Info](./contact-info.md) - Contact page data
- [Website Settings](./website-settings.md) - Site configuration and navigation
- [Site Data API](./site-data-api.md) - JSON API for site data
- [Image Upload](./image-upload.md) - Image handling for uploads
- [README](./README.md) - Application overview
