# Insurance Partners

## Overview

Manage insurance company partnerships. Insurance partners are categorized as public, private, or TPA (Third Party Administrator).

## Routes

```
GET  /admin/insurance-partners              → InsurancePartnerController@index
GET  /admin/insurance-partners/create       → InsurancePartnerController@create
POST /admin/insurance-partners              → InsurancePartnerController@store
GET  /admin/insurance-partners/{partner}    → InsurancePartnerController@edit
PUT  /admin/insurance-partners/{partner}    → InsurancePartnerController@update
DELETE /admin/insurance-partners/{partner}  → InsurancePartnerController@destroy
```

## Controller

**File:** `app/Http/Controllers/InsurancePartnerController.php`

## Model

**File:** `app/Models/InsurancePartner.php`

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name | string | Insurance company name |
| category | string | Category: public, private, tpa |
| logo | string | Company logo path |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Category Values

| Category | Description |
|----------|-------------|
| `public` | Public sector insurance |
| `private` | Private insurance companies |
| `tpa` | Third Party Administrators |

### Relationships

None (standalone model)

## RBAC Permissions

| Permission | Description |
|-----------|-------------|
| `view_insurance_partners` | View insurance list |
| `create_insurance_partners` | Add insurance partners |
| `edit_insurance_partners` | Edit insurance partners |
| `delete_insurance_partners` | Delete insurance partners |

## Frontend Pages

| Page | File | Purpose |
|------|------|---------|
| List | `resources/js/pages/admin/insurance-partners/index.tsx` | Insurance partner listing |
| Create | `resources/js/pages/admin/insurance-partners/create.tsx` | Add new partner |
| Edit | `resources/js/pages/admin/insurance-partners/edit.tsx` | Edit partner |

## Features

- Category-based organization (public/private/TPA)
- Logo upload for partner branding
- Filter by category

---

## Related Documentation

- [Image Upload](./image-upload.md) - Partner logo handling
- [RBAC](./rbac.md) - Insurance partner management permissions
- [Database Schema](./database-schema.md) - Insurance partner table structure
- [README](./README.md) - Application overview
