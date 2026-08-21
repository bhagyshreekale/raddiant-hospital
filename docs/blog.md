# Blog Management

## Overview

Manage hospital blog posts with categories, images, and read time estimates. Blogs are displayed on the public website.

## Routes

```
GET  /admin/blogs                  → BlogController@index (admin)
GET  /admin/blogs/create           → BlogController@create
POST /admin/blogs                  → BlogController@store
GET  /admin/blogs/{blog}           → BlogController@edit
PUT  /admin/blogs/{blog}           → BlogController@update
DELETE /admin/blogs/{blog}         → BlogController@destroy

GET  /blog                         → SiteController@blog (public listing)
GET  /blog/{blog}                  → SiteController@blogShow (public single)
```

## Controller

**File:** `app/Http/Controllers/BlogController.php`

## Model

**File:** `app/Models/Blog.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| title | string | Blog post title |
| category | string | Blog category |
| image | string | Featured image path |
| description | text | Blog content (HTML/rich text) |
| read_time | string | Estimated read time (e.g., "5 min read") |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_blogs` | View blog list |
| `create_blogs` | Create new blogs |
| `edit_blogs` | Edit blogs |
| `delete_blogs` | Delete blogs |

## Frontend Pages

### Admin

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/blogs/index.tsx` | Blog listing |
| Create | `resources/js/pages/admin/blogs/create.tsx` | Create new blog |
| Edit | `resources/js/pages/admin/blogs/edit.tsx` | Edit blog |

### Public

| Page | File | Purpose |
|------|------|---------|
| Blog List | `resources/js/pages/blog.tsx` | Blog listing page |
| Blog Show | `resources/js/pages/blog/show.tsx` | Single blog post |

## Public Components

| Component | File | Purpose |
|-----------|------|---------|
| BlogCard | `resources/js/components/blog/BlogCard.tsx` | Blog post card |
| FeaturedCard | `resources/js/components/blog/FeaturedCard.tsx` | Featured blog card |
| BlogModal | `resources/js/components/blog/BlogModal.tsx` | Blog post modal |
| Newsletter | `resources/js/components/blog/Newsletter.tsx` | Newsletter subscription |

## Features

- Category-based organization
- Featured image upload
- Rich text content (TinyMCE)
- Read time estimation
- Featured post highlighting
- Category filtering on public site

---

## Related Documentation

- [Public Website](./public-website.md) - Blog displayed on public site
- [Image Upload](./image-upload.md) - Blog image handling
- [Dashboard](./dashboard.md) - Blog statistics
- [RBAC](./rbac.md) - Blog management permissions
- [Database Schema](./database-schema.md) - Blog table structure
- [README](./README.md) - Application overview
