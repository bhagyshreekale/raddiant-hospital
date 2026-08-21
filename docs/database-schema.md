# Database Schema

## Overview

Complete database schema reference for all tables in the Raddiant Plus Hospital application.

## Tables

### Core System

| Table | Model | Purpose |
|-------|-------|---------|
| `admins` | Admin | Admin users |
| `users` | User | Regular users (currently unused) |
| `cache` | - | Cache storage |
| `jobs` | - | Queue jobs |
| `job_batches` | - | Job batches |
| `failed_jobs` | - | Failed jobs |

### RBAC (Spatie Permission)

| Table | Purpose |
|-------|---------|
| `permissions` | Permission definitions |
| `roles` | Role definitions |
| `model_has_permissions` | User-permission assignments |
| `model_has_roles` | User-role assignments |
| `role_has_permissions` | Role-permission assignments |

### Hospital Management

| Table | Model | Purpose |
|-------|-------|---------|
| `specializations` | Specialization | Medical departments |
| `doctors` | Doctor | Doctor profiles |
| `services` | Service | Hospital services |
| `testimonials` | Testimonial | Patient testimonials |
| `appointments` | Appointment | Patient appointments |
| `bed_availability` | BedAvailability | Bed tracking |
| `health_packages` | HealthPackage | Health checkup packages |
| `insurance_partners` | InsurancePartner | Insurance companies |
| `blogs` | Blog | Blog posts |
| `gallery` | Gallery | Photo gallery |
| `careers` | Career | Job postings |
| `job_applications` | JobApplication | Job applications |
| `contact_info` | ContactInfo | Contact details |
| `inquiries` | Inquiry | Patient inquiries |

### CMS Configuration

| Table | Model | Purpose |
|-------|-------|---------|
| `website_settings` | WebsiteSettings | Key-value settings |
| `navigation_links` | NavigationLink | Header/footer nav |
| `tasks` | Task | Simple task list |

## Detailed Schema

### `admins`

```sql
CREATE TABLE admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    two_factor_secret TEXT NULL,
    two_factor_recovery_codes TEXT NULL,
    two_factor_confirmed_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `specializations`

```sql
CREATE TABLE specializations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    color VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `doctors`

```sql
CREATE TABLE doctors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization_id BIGINT UNSIGNED NOT NULL,
    education VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    availability VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (specialization_id) REFERENCES specializations(id)
);
```

### `services`

```sql
CREATE TABLE services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    color VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `appointments`

```sql
CREATE TABLE appointments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(255) NOT NULL,
    visit_type VARCHAR(255) NOT NULL,
    specialization_id BIGINT UNSIGNED NOT NULL,
    doctor_id BIGINT UNSIGNED NOT NULL,
    preferred_date DATE NOT NULL,
    time_slot VARCHAR(255) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (specialization_id) REFERENCES specializations(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

### `bed_availability`

```sql
CREATE TABLE bed_availability (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    total_beds INTEGER NOT NULL,
    available_beds INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `health_packages`

```sql
CREATE TABLE health_packages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    features JSON NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `insurance_partners`

```sql
CREATE TABLE insurance_partners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `blogs`

```sql
CREATE TABLE blogs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    read_time VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `gallery`

```sql
CREATE TABLE gallery (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `testimonials`

```sql
CREATE TABLE testimonials (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    specialization_id BIGINT UNSIGNED NOT NULL,
    patient_name VARCHAR(255) NOT NULL,
    patient_type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    profile_image VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (specialization_id) REFERENCES specializations(id)
);
```

### `careers`

```sql
CREATE TABLE careers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    specialization VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(255) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `job_applications`

```sql
CREATE TABLE job_applications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT UNSIGNED NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    experience VARCHAR(255) NOT NULL,
    resume_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (job_id) REFERENCES careers(id)
);
```

### `contact_info`

```sql
CREATE TABLE contact_info (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    open_hours VARCHAR(255) NOT NULL,
    map_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `inquiries`

```sql
CREATE TABLE inquiries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    reference_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    visit_type VARCHAR(255) NOT NULL,
    preferred_date DATE NULL,
    preferred_time VARCHAR(255) NULL,
    message TEXT NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `website_settings`

```sql
CREATE TABLE website_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `navigation_links`

```sql
CREATE TABLE navigation_links (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `tasks`

```sql
CREATE TABLE tasks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### `permissions` (Spatie)

```sql
CREATE TABLE permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    group_name VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    UNIQUE KEY (name, guard_name)
);
```

### `roles` (Spatie)

```sql
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guard_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    UNIQUE KEY (name, guard_name)
);
```

### `model_has_permissions` (Spatie)

```sql
CREATE TABLE model_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (permission_id, model_id, model_type),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```

### `model_has_roles` (Spatie)

```sql
CREATE TABLE model_has_roles (
    role_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (role_id, model_id, model_type),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

### `role_has_permissions` (Spatie)

```sql
CREATE TABLE role_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    role_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (permission_id, role_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

## Migration History

| Migration | Date | Purpose |
|-----------|------|---------|
| `0001_01_01_000000_create_users_table` | Initial | Users, cache, jobs tables |
| `2026_04_22_052033_create_hospital_management_tables` | 2026-04-22 | Core hospital tables |
| `2026_04_22_100052_add_role_to_admins_table` | 2026-04-22 | Admin role column |
| `2026_04_22_105836_add_two_factor_columns_to_admins_table` | 2026-04-22 | 2FA columns |
| `2026_04_23_000000_add_title_category_to_gallery_table` | 2026-04-23 | Gallery enhancements |
| `2026_04_23_000001_add_color_to_specializations_table` | 2026-04-23 | Spec colors |
| `2026_04_23_060935_add_remember_token_to_admins_table` | 2026-04-23 | Remember token |
| `2026_04_23_072750_create_services_table` | 2026-04-23 | Services table |
| `2026_04_23_100000_drop_color_from_services_table` | 2026-04-23 | Remove color |
| `2026_04_24_070030_add_features_and_is_featured_to_health_packages_table` | 2026-04-24 | Health package features |
| `2026_04_30_052903_add_category_to_insurance_partners_table` | 2026-04-30 | Insurance categories |
| `2026_04_30_066310_create_website_settings_table` | 2026-04-30 | CMS settings |
| `2026_04_30_123456_create_navigation_links_table` | 2026-04-30 | Navigation links |
| `2026_05_01_074431_create_inquiries_table` | 2026-05-01 | Inquiries table |
| `2026_05_09_071223_add_color_to_services_table` | 2026-05-09 | Re-add color |
| `2026_05_11_090644_create_permission_tables` | 2026-05-11 | RBAC tables |
| `2026_05_11_095847_drop_role_column_from_admins_table` | 2026-05-11 | Remove old role |
| `2026_05_12_073717_add_group_to_permissions_table` | 2026-05-12 | Permission groups |

---

## Related Documentation

- [Authentication](./authentication.md) - Admin and user tables
- [RBAC](./rbac.md) - Spatie Permission tables
- [Doctors](./doctors.md) - Doctor table schema
- [Specializations](./specializations.md) - Specialization table schema
- [Services](./services.md) - Service table schema
- [Appointments](./appointments.md) - Appointment table schema
- [Bed Availability](./bed-availability.md) - Bed availability table schema
- [Inquiries](./inquiries.md) - Inquiry table schema
- [Blog](./blog.md) - Blog table schema
- [Health Packages](./health-packages.md) - Health package table schema
- [Insurance Partners](./insurance-partners.md) - Insurance partner table schema
- [Testimonials](./testimonials.md) - Testimonial table schema
- [Gallery](./gallery.md) - Gallery table schema
- [Careers](./careers.md) - Career and job application table schemas
- [Contact Info](./contact-info.md) - Contact info table schema
- [Website Settings](./website-settings.md) - Website settings and navigation link table schemas
- [Admin Users](./admin-users.md) - Admin user table schema
- [README](./README.md) - Application overview
