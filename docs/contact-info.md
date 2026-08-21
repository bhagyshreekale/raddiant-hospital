# Contact Info Management

## Overview

Manage hospital contact information displayed on the public website. Includes email, phone, address, opening hours, and map link.

## Routes

```
GET  /admin/contact              → ContactController@index
GET  /admin/contact/create       → ContactController@create
POST /admin/contact              → ContactController@store
GET  /admin/contact/{contact}    → ContactController@edit
PUT  /admin/contact/{contact}    → ContactController@update
DELETE /admin/contact/{contact}  → ContactController@destroy

GET  /contact                    → SiteController@contact (public)
```

## Controller

**File:** `app/Http/Controllers/ContactController.php`

## Model

**File:** `app/Models/ContactInfo.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| email | string | Contact email |
| phone | string | Contact phone |
| address | text | Physical address |
| open_hours | string | Opening hours text |
| map_link | string | Google Maps link |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_contact` | View contact info |
| `edit_contact` | Edit contact info |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/contact/index.tsx` | Contact info listing |
| Create | `resources/js/pages/admin/contact/create.tsx` | Add contact info |
| Edit | `resources/js/pages/admin/contact/edit.tsx` | Edit contact info |

### Public

| Page | File | Purpose |
|------|------|---------|
| Contact | `resources/js/pages/contact.tsx` | Public contact page |

## Public Components

| Component | File | Purpose |
|-----------|------|---------|
| MapSection | `resources/js/components/sections/MapSection.tsx` | Google Maps embed |

## Features

- Google Maps integration
- Opening hours display
- Multiple contact methods
- Used in footer and contact page

---

## Related Documentation

- [Public Website](./public-website.md) - Contact page and footer display
- [Website Settings](./website-settings.md) - Site configuration includes contact info
- [Site Data API](./site-data-api.md) - Contact info in JSON API
- [RBAC](./rbac.md) - Contact info management permissions
- [Database Schema](./database-schema.md) - Contact info table structure
- [README](./README.md) - Application overview
