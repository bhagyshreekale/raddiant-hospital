# Gallery Management

## Overview

Manage photo gallery with categories. Images are displayed on the public gallery page with category filtering.

## Routes

```
GET  /admin/gallery              → GalleryController@index
GET  /admin/gallery/create       → GalleryController@create
POST /admin/gallery              → GalleryController@store
GET  /admin/gallery/{gallery}    → GalleryController@edit
PUT  /admin/gallery/{gallery}    → GalleryController@update
DELETE /admin/gallery/{gallery}  → GalleryController@destroy

GET  /gallery                    → SiteController@gallery (public)
```

## Controller

**File:** `app/Http/Controllers/GalleryController.php`

## Model

**File:** `app/Models/Gallery.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| image | string | Image path |
| title | string | Image title |
| category | string | Image category |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_gallery` | View gallery items |
| `create_gallery` | Upload gallery items |
| `edit_gallery` | Edit gallery items |
| `delete_gallery` | Delete gallery items |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/gallery/index.tsx` | Gallery listing |
| Create | `resources/js/pages/admin/gallery/create.tsx` | Upload new image |
| Edit | `resources/js/pages/admin/gallery/edit.tsx` | Edit image details |

### Public

| Page | File | Purpose |
|------|------|---------|
| Gallery | `resources/js/pages/gallery.tsx` | Public gallery page |

## Public Components

| Component | File | Purpose |
|-----------|------|---------|
| GalleryGrid | `resources/js/components/gallery/GalleryGrid.jsx` | Gallery grid display |

## Features

- Category-based organization
- Image upload with preview
- Category filtering on public site
- Responsive grid layout

---

## Related Documentation

- [Public Website](./public-website.md) - Gallery displayed on public site
- [Image Upload](./image-upload.md) - Gallery image handling
- [RBAC](./rbac.md) - Gallery management permissions
- [Database Schema](./database-schema.md) - Gallery table structure
- [README](./README.md) - Application overview
