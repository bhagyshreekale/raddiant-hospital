# Testimonials Management

## Overview

Manage patient testimonials linked to specializations. Testimonials are displayed on the public homepage to build trust.

## Routes

```
GET  /admin/testimonials              → TestimonialController@index
GET  /admin/testimonials/create       → TestimonialController@create
POST /admin/testimonials              → TestimonialController@store
GET  /admin/testimonials/{test}       → TestimonialController@edit
PUT  /admin/testimonials/{test}       → TestimonialController@update
DELETE /admin/testimonials/{test}     → TestimonialController@destroy
```

## Controller

**File:** `app/Http/Controllers/TestimonialController.php`

## Model

**File:** `app/Models/Testimonial.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| specialization_id | bigint (FK) | Links to `specializations` table |
| patient_name | string | Patient's name |
| patient_type | string | Type of patient |
| description | text | Testimonial text |
| profile_image | string, nullable | Patient profile image |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

| Relationship | Type | Related Model |
|-------------|------|---------------|
| `specialization` | belongsTo | `Specialization` |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_testimonials` | View testimonial list |
| `create_testimonials` | Create new testimonials |
| `edit_testimonials` | Edit testimonials |
| `delete_testimonials` | Delete testimonials |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/testimonials/index.tsx` | Testimonial listing |
| Create | `resources/js/pages/admin/testimonials/create.tsx` | Create new testimonial |
| Edit | `resources/js/pages/admin/testimonials/edit.tsx` | Edit testimonial |

### Public

| Component | File | Purpose |
|-----------|------|---------|
| TestimonialsSection | `resources/js/components/sections/TestimonialsSection.jsx` | Homepage testimonials |
| TestimonialCard | `resources/js/components/design/TestimonialCard.jsx` | Testimonial card |

## Features

- Specialization association
- Profile image upload
- Patient type categorization
- Displayed on homepage

---

## Related Documentation

- [Specializations](./specializations.md) - Specializations linked to testimonials
- [Public Website](./public-website.md) - Testimonials displayed on homepage
- [Image Upload](./image-upload.md) - Testimonial image handling
- [RBAC](./rbac.md) - Testimonial management permissions
- [Database Schema](./database-schema.md) - Testimonial table structure
- [README](./README.md) - Application overview
