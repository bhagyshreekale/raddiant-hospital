# Website Settings

## Overview

Dynamic CMS configuration for hospital website settings. Key-value store for site name, logo, contact info, social links, footer content, and navigation menu.

## Routes

```
GET  /admin/website-settings      → WebsiteSettingsController@index
POST /admin/website-settings      → WebsiteSettingsController@update

GET  /admin/navigation-links      → NavigationLinkController@index
POST /admin/navigation-links      → NavigationLinkController@update
```

## Controllers

- `app/Http/Controllers/Admin/WebsiteSettingsController.php`
- `app/Http/Controllers/Admin/NavigationLinkController.php`

## Models

### WebsiteSettings

**File:** `app/Models/WebsiteSettings.php`

#### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| key | string | Setting key (unique) |
| value | text, nullable | Setting value |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

#### Static Methods

```php
WebsiteSettings::getSetting('hospital_name');
WebsiteSettings::setSetting('hospital_name', 'Raddiant Plus');
```

#### Configurable Settings

| Key | Description |
|-----|-------------|
| `hospital_name` | Hospital name |
| `logo` | Logo image path |
| `tagline` | Hospital tagline |
| `phone` | Contact phone |
| `email` | Contact email |
| `address` | Physical address |
| `emergency_number` | Emergency contact |
| `facebook` | Facebook URL |
| `instagram` | Instagram URL |
| `youtube` | YouTube URL |
| `whatsapp` | WhatsApp number |
| `footer_tagline` | Footer tagline |
| `footer_description` | Footer description |
| `footer_specialties` | Footer specialties text |
| `footer_contact_info` | Footer contact info |
| `footer_timing` | Footer timing info |
| `navigation_menu` | JSON navigation structure |

### NavigationLink

**File:** `app/Models/NavigationLink.php`

#### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| type | string | Type: header or footer |
| label | string | Display label |
| url | string | Link URL |
| is_visible | boolean | Show/hide link |
| sort_order | integer | Display order |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

#### Type Values

| Type | Description |
|------|-------------|
| `header` | Main navigation links |
| `footer` | Footer navigation links |

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_website_settings` | View site settings |
| `edit_website_settings` | Edit site settings |
| `view_navigation_links` | View navigation links |
| `edit_navigation_links` | Edit navigation links |

## Frontend Pages

| Page | File | Purpose |
|------|------|---------|
| Website Settings | `resources/js/pages/admin/website-settings.tsx` | Site configuration |
| Navigation Links | `resources/js/pages/admin/navigation-links.tsx` | Navigation management |

## Features

- Key-value settings storage
- Social media link management
- Dynamic navigation menu
- Header and footer link management
- Drag-and-drop reordering
- Visibility toggle for links

---

## Related Documentation

- [Public Website](./public-website.md) - Settings used across public site
- [Contact Info](./contact-info.md) - Contact information settings
- [Site Data API](./site-data-api.md) - Settings available via JSON API
- [RBAC](./rbac.md) - Website settings management permissions
- [Database Schema](./database-schema.md) - Website settings and navigation link table structures
- [README](./README.md) - Application overview
