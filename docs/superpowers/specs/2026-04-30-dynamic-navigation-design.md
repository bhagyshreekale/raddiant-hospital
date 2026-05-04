# Dynamic Navigation CRUD - Design Spec

**Created:** 2026-04-30
**Status:** Approved

## Overview

Create a complete CRUD system for managing dynamic navigation links for both header (navbar) and footer sections. This replaces the existing hardcoded navigation links stored in `website_settings` table with a dedicated `navigation_links` table.

---

## Architecture

### Database
- **Table:** `navigation_links`
- **Type:** Header links (navbar) and Footer links (quick links, specialties)
- **Storage:** Single table with `type` enum for distinction

### Data Fields
| Field | Type | Description |
|-------|------|-------------|
| id | bigint (PK) | Auto-increment |
| type | enum('header', 'footer') | Link section |
| label | varchar(100) | Display name |
| url | varchar(255) | Target URL |
| is_visible | boolean | Show/hide toggle |
| sort_order | integer | Display order |
| created_at | timestamp | Creation time |
| updated_at | timestamp | Update time |

---

## Implementation

### 1. Migration
- Create `navigation_links` table with all fields above
- Add unique index on (type, sort_order)
- Add unique index on (type, label)

### 2. Model
- `app/Models/NavigationLink.php`
- Fillable: type, label, url, is_visible, sort_order
- Casts: is_visible -> boolean
- Scopes: forType($type), visible(), ordered()

### 3. Controller
- `app/Http/Controllers/Admin/NavigationLinkController.php`
- Methods: index, store, update, destroy, reorder (bulk update)
- Validation rules per type
- API response format: JSON

### 4. Routes
- POST `/admin/navigation-links` - list (filtered by type)
- POST `/admin/navigation-links/store` - create
- POST `/admin/navigation-links/update` - update
- POST `/admin/navigation-links/delete` - delete
- POST `/admin/navigation-links/reorder` - bulk reorder

### 5. Admin Panel
- Dedicated admin page: `/admin/navigation-links`
- Two tabs: Header Links | Footer Links
- Features per link: label, URL, visibility toggle
- Drag-and-drop reordering with react-beautiful-dnd or @dnd-kit
- Add new / Edit inline / Delete with confirmation
- Empty state with "Add your first link" CTA

### 6. Frontend Components
- **Navbar.jsx** - Fetch from `/api/navigation-links?type=header`
- **Footer.jsx** - Fetch from `/api/navigation-links?type=footer`
- Display only visible links ordered by sort_order
- Handle empty/none gracefully

### 7. Cleanup
- Remove from `website_settings` table:
  - footer_quick_links
  - footer_column3_links
  - footer_specialties_links
  - Any nav_links stored as JSON

---

## API Endpoints

### GET /api/navigation-links
Returns visible links ordered by sort_order.

**Query Params:**
- type: 'header' | 'footer' (required)

**Response:**
```json
{
  "links": [
    {"id": 1, "label": "Home", "url": "/", "is_visible": true},
    {"id": 2, "label": "About Us", "url": "/about", "is_visible": true}
  ]
}
```

### GET /admin/navigation-links
Returns all links for admin management.

**Query Params:**
- type: 'header' | 'footer'

---

## Default Data (Seeded)

### Header Links
1. Home - `/` - visible
2. About Us - `/about` - visible
3. Services - `/services` - visible
4. Facilities - `/facilities` - visible
5. Gallery - `/gallery` - visible
6. Contact - `/contact` - visible
7. Book Appointment - `/appointment` - visible

### Footer Links
1. Home - `/` - visible
2. About Us - `/about` - visible
3. Services - `/services` - visible
4. Doctors - `/doctors` - visible
5. Facilities - `/facilities` - visible
6. Gallery - `/gallery` - visible
7. Blog - `/blog` - visible

---

## Acceptance Criteria

1. Admin can view all header/footer links in separate sections
2. Admin can add new links with label, URL, visibility
3. Admin can edit existing links
4. Admin can delete links with confirmation modal
5. Admin can reorder links via drag-and-drop
6. Frontend displays only visible links in correct order
7. Both desktop and mobile navigation work correctly
8. Old navigation links removed from website_settings