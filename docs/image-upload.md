# Image Upload

## Overview

Centralized image upload and deletion endpoint used throughout the admin panel for uploading images to various entities (doctors, services, blogs, etc.).

## Routes

```
POST   /upload/image    → ImageController@store
DELETE /upload/image    → ImageController@destroy
```

## Controller

**File:** `app/Http/Controllers/ImageController.php`

## Endpoints

### Upload Image

**POST `/upload/image`**

**Request:**
- Content-Type: `multipart/form-data`
- Field: `file` (image file)

**Response:**
```json
{
    "success": true,
    "url": "/storage/uploads/image-123456.jpg"
}
```

**Validation:**
- File must be an image
- Max size: 5MB (or as configured)
- Allowed types: jpg, jpeg, png, gif, webp

### Delete Image

**DELETE `/upload/image`**

**Request:**
- Content-Type: `application/json`
- Body: `{ "path": "uploads/image-123456.jpg" }`

**Response:**
```json
{
    "success": true
}
```

## Storage Configuration

Images are stored in the `public` disk:

```php
// config/filesystems.php
'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL') . '/storage',
    'visibility' => 'public',
],
```

## Frontend Component

**File:** `resources/js/components/ui/image-upload.tsx`

A reusable React component that:
- Provides drag-and-drop upload
- Shows image preview
- Handles upload via the `/upload/image` endpoint
- Returns the image URL for form submission

## Usage Example

```tsx
import ImageUpload from '@/components/ui/image-upload';

function DoctorForm() {
    const [image, setImage] = useState('');

    return (
        <ImageUpload
            value={image}
            onChange={setImage}
            onRemove={() => setImage('')}
        />
    );
}
```

## Security Notes

- Only authenticated admin users can upload images
- File type validation on server side
- File size limits enforced
- Images stored in public directory (accessible via URL)

---

## Related Documentation

- [Doctors](./doctors.md) - Doctor profile images
- [Specializations](./specializations.md) - Specialization icons
- [Services](./services.md) - Service images
- [Blog](./blog.md) - Blog featured images
- [Gallery](./gallery.md) - Gallery photos
- [Testimonials](./testimonials.md) - Patient profile images
- [Insurance Partners](./insurance-partners.md) - Partner logos
- [Careers](./careers.md) - Resume uploads
- [RBAC](./rbac.md) - Upload permissions
- [README](./README.md) - Application overview
