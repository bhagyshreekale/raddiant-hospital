# Site Data API

## Overview

Public JSON API that returns hospital website data for external integrations or mobile apps.

## Routes

```
GET /api/site-data          → SiteDataController@index
GET /api/navigation-links   → SiteDataController@navigation
```

## Controller

**File:** `app/Http/Controllers/SiteDataController.php`

## Endpoints

### GET `/api/site-data`

Returns comprehensive hospital information as JSON.

**Response:**
```json
{
    "hospital_name": "Raddiant Plus Hospital",
    "tagline": "Your Health, Our Priority",
    "phone": "+91 1234567890",
    "email": "info@raddianthospital.com",
    "address": "123 Medical Center Road, City",
    "emergency_number": "1800-123-456",
    "facebook": "https://facebook.com/...",
    "instagram": "https://instagram.com/...",
    "youtube": "https://youtube.com/...",
    "whatsapp": "+91 1234567890",
    "footer_tagline": "...",
    "footer_description": "...",
    "footer_specialties": "...",
    "footer_contact_info": "...",
    "footer_timing": "...",
    "navigation": [
        {
            "label": "Home",
            "url": "/",
            "type": "header"
        },
        ...
    ]
}
```

### GET `/api/navigation-links`

Returns only navigation links.

**Response:**
```json
{
    "header": [
        { "label": "Home", "url": "/" },
        { "label": "About", "url": "/about" },
        ...
    ],
    "footer": [
        { "label": "Privacy Policy", "url": "/privacy" },
        ...
    ]
}
```

## Data Sources

- Hospital settings from `website_settings` table
- Navigation links from `navigation_links` table

## Use Cases

- Mobile app integration
- Third-party website embeds
- External service integrations
- Widget development

## Authentication

No authentication required. These are public endpoints.

## Caching

Consider implementing caching for production:

```php
// Example cache implementation
$settings = Cache::remember('site-data', 3600, function () {
    return WebsiteSettings::all()->pluck('value', 'key')->toArray();
});
```

---

## Related Documentation

- [Public Website](./public-website.md) - Public pages using site data
- [Website Settings](./website-settings.md) - Settings stored in database
- [Contact Info](./contact-info.md) - Contact data in API response
- [README](./README.md) - Application overview
