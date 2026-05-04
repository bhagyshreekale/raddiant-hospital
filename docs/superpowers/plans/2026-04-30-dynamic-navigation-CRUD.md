# Dynamic Navigation CRUD - Implementation Plan

**For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete CRUD system for dynamic navigation links (header and footer), replacing old website_settings storage.

**Architecture:** Single `navigation_links` table with `type` enum区分header/footer, dedicated controller, admin panel with drag-drop reordering.

**Tech Stack:** Laravel 13, Inertia.js v3 React, React DnD Kit

---
## File Mapping

### New Files
- `database/migrations/2026_04_30_123456_create_navigation_links_table.php` - migration
- `app/Models/NavigationLink.php` - model
- `app/Http/Controllers/Admin/NavigationLinkController.php` - controller
- `app/Http/Requests/StoreNavigationLinkRequest.php` - form request
- `app/Http/Requests/UpdateNavigationLinkRequest.php` - form request
- `resources/js/pages/admin/navigation-links.tsx` - admin page
- `routes/admin/navigation-links.php` - API routes
- `database/seeders/NavigationLinkSeeder.php` - seeder

### Modify Files
- `routes/web.php` - add routes
- `app/Providers/AppServiceProvider.php` - add seeder
- `resources/js/components/layout/Navbar.jsx` - use new API
- `resources/js/components/layout/Footer.jsx` - use new API
- `resources/js/pages/admin/website-settings.tsx` - remove nav links
- `app/Http/Controllers/SiteDataController.php` - remove nav links
- `database/migrations/2026_04_30_066310_create_website_settings_table.php` - remove old nav fields

### Existing Patterns to Follow
- Admin pages: `resources/js/pages/admin/website-settings.tsx`
- Model: `app/Models/WebsiteSettings.php`
- Controller: `app/Http/Controllers/Admin/WebsiteSettingsController.php`

---

## Task 1: Migration

**Files:**
- Create: `database/migrations/2026_04_30_123456_create_navigation_links_table.php`

- [ ] **Step 1: Create migration**

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('navigation_links', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['header', 'footer']);
            $table->string('label', 100);
            $table->string('url', 255);
            $table->boolean('is_visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['type', 'sort_order']);
            $table->unique(['type', 'label']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navigation_links');
    }
};
```

- [ ] **Step 2: Commit**

```bash
git add database/migrations/2026_04_30_123456_create_navigation_links_table.php
git commit -m "feat: add navigation_links migration"
```

---

## Task 2: NavigationLink Model

**Files:**
- Create: `app/Models/NavigationLink.php`

- [ ] **Step 1: Create model**

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationLink extends Model
{
    protected $fillable = [
        'type',
        'label',
        'url',
        'is_visible',
        'sort_order',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function scopeForType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/Models/NavigationLink.php
git commit -m "feat: add NavigationLink model"
```

---

## Task 3: Form Requests

**Files:**
- Create: `app/Http/Requests/StoreNavigationLinkRequest.php`
- Create: `app/Http/Requests/UpdateNavigationLinkRequest.php`

- [ ] **Step 1: Create StoreNavigationLinkRequest**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNavigationLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'required|in:header,footer',
            'label' => 'required|string|max:100',
            'url' => 'required|string|max:255',
            'is_visible' => 'boolean',
        ];
    }
}
```

- [ ] **Step 2: Create UpdateNavigationLinkRequest**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNavigationLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'in:header,footer',
            'label' => 'string|max:100',
            'url' => 'string|max:255',
            'is_visible' => 'boolean',
        ];
    }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/Http/Requests/StoreNavigationLinkRequest.php app/Http/Requests/UpdateNavigationLinkRequest.php
git commit -m "feat: add navigation link form requests"
```

---

## Task 4: Controller

**Files:**
- Create: `app/Http/Controllers/Admin/NavigationLinkController.php`

- [ ] **Step 1: Create controller**

```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNavigationLinkRequest;
use App\Http\Requests\UpdateNavigationLinkRequest;
use App\Models\NavigationLink;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NavigationLinkController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $type = $request->input('type', 'header');
        
        $links = NavigationLink::forType($type)
            ->ordered()
            ->get();

        return response()->json(['links' => $links]);
    }

    public function store(StoreNavigationLinkRequest $request): JsonResponse
    {
        $maxOrder = NavigationLink::forType($request->type)
            ->max('sort_order') ?? 0;

        $link = NavigationLink::create([
            ...$request->validated(),
            'sort_order' => $maxOrder + 1,
        ]);

        return response()->json(['link' => $link, 'message' => 'Link created successfully']);
    }

    public function update(UpdateNavigationLinkRequest $request, NavigationLink $navigationLink): JsonResponse
    {
        $navigationLink->update($request->validated());

        return response()->json(['link' => $navigationLink, 'message' => 'Link updated successfully']);
    }

    public function destroy(NavigationLink $navigationLink): JsonResponse
    {
        $navigationLink->delete();

        return response()->json(['message' => 'Link deleted successfully']);
    }

    public function reorder(Request $request): JsonResponse
    {
        $request->validate([
            'links' => 'required|array',
            'links.*.id' => 'required|integer|exists:navigation_links,id',
            'links.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->input('links') as $linkData) {
            NavigationLink::where('id', $linkData['id'])
                ->update(['sort_order' => $linkData['sort_order']]);
        }

        return response()->json(['message' => 'Links reordered successfully']);
    }

    public function adminList(Request $request): JsonResponse
    {
        $type = $request->input('type', 'header');
        
        $links = NavigationLink::forType($type)
            ->ordered()
            ->get();

        return response()->json(['links' => $links]);
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/Http/Controllers/Admin/NavigationLinkController.php
git commit -m "feat: add NavigationLinkController with CRUD"
```

---

## Task 5: Routes

**Files:**
- Create: `routes/admin/navigation-links.php`

- [ ] **Step 1: Create API routes file**

```php
<?php

use App\Http\Controllers\Admin\NavigationLinkController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api'])->group(function () {
    Route::get('/navigation-links', [NavigationLinkController::class, 'index']);
    Route::get('/navigation-links/admin', [NavigationLinkController::class, 'adminList']);
    Route::post('/navigation-links', [NavigationLinkController::class, 'store']);
    Route::put('/navigation-links/{navigationLink}', [NavigationLinkController::class, 'update']);
    Route::delete('/navigation-links/{navigationLink}', [NavigationLinkController::class, 'destroy']);
    Route::post('/navigation-links/reorder', [NavigationLinkController::class, 'reorder']);
});
```

- [ ] **Step 2: Modify routes/web.php to include**

Add to routes/web.php:
```php
require __DIR__.'/admin/navigation-links.php';
```

- [ ] **Step 3: Commit**

```bash
git add routes/admin/navigation-links.php routes/web.php
git commit -m "feat: add navigation links API routes"
```

---

## Task 6: Seeder

**Files:**
- Create: `database/seeders/NavigationLinkSeeder.php`

- [ ] **Step 1: Create seeder**

```php
<?php

namespace Database\Seeders;

use App\Models\NavigationLink;
use Illuminate\Database\Seeder;

class NavigationLinkSeeder extends Seeder
{
    public function run(): void
    {
        $headerLinks = [
            ['label' => 'Home', 'url' => '/', 'is_visible' => true, 'sort_order' => 1],
            ['label' => 'About Us', 'url' => '/about', 'is_visible' => true, 'sort_order' => 2],
            ['label' => 'Services', 'url' => '/services', 'is_visible' => true, 'sort_order' => 3],
            ['label' => 'Facilities', 'url' => '/facilities', 'is_visible' => true, 'sort_order' => 4],
            ['label' => 'Gallery', 'url' => '/gallery', 'is_visible' => true, 'sort_order' => 5],
            ['label' => 'Contact', 'url' => '/contact', 'is_visible' => true, 'sort_order' => 6],
            ['label' => 'Book Appointment', 'url' => '/appointment', 'is_visible' => true, 'sort_order' => 7],
        ];

        foreach ($headerLinks as $link) {
            NavigationLink::create(['type' => 'header', ...$link]);
        }

        $footerLinks = [
            ['label' => 'Home', 'url' => '/', 'is_visible' => true, 'sort_order' => 1],
            ['label' => 'About Us', 'url' => '/about', 'is_visible' => true, 'sort_order' => 2],
            ['label' => 'Services', 'url' => '/services', 'is_visible' => true, 'sort_order' => 3],
            ['label' => 'Doctors', 'url' => '/doctors', 'is_visible' => true, 'sort_order' => 4],
            ['label' => 'Facilities', 'url' => '/facilities', 'is_visible' => true, 'sort_order' => 5],
            ['label' => 'Gallery', 'url' => '/gallery', 'is_visible' => true, 'sort_order' => 6],
            ['label' => 'Blog', 'url' => '/blog', 'is_visible' => true, 'sort_order' => 7],
        ];

        foreach ($footerLinks as $link) {
            NavigationLink::create(['type' => 'footer', ...$link]);
        }
    }
}
```

- [ ] **Step 2: Add to DatabaseSeeder**

Add to `database/seeders/DatabaseSeeder.php`:
```php
$this->call([
    NavigationLinkSeeder::class,
]);
```

- [ ] **Step 3: Commit**

```bash
git add database/seeders/NavigationLinkSeeder.php database/seeders/DatabaseSeeder.php
git commit -m "feat: add NavigationLinkSeeder with default data"
```

---

## Task 7: Admin Panel Page

**Files:**
- Create: `resources/js/pages/admin/navigation-links.tsx`

- [ ] **Step 1: Create admin navigation links page**

```tsx
"use client";

import { useState, useEffect } from "react";
import { useHttp } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { LinkItem } from "./LinkItem";

interface NavigationLink {
  id: number;
  type: string;
  label: string;
  url: string;
  is_visible: boolean;
  sort_order: number;
}

export default function NavigationLinksPage() {
  const [activeType, setActiveType] = useState<"header" | "footer">("header");
  const [links, setLinks] = useState<NavigationLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ label: "", url: "/", is_visible: true });
  const http = useHttp();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchLinks();
  }, [activeType]);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await http.get(`/api/navigation-links/admin?type=${activeType}`);
      const data = await res.json();
      setLinks(data.links || []);
    } catch (error) {
      console.error("Failed to fetch links", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    const newLinks = arrayMove(links, oldIndex, newIndex).map((link, index) => ({
      ...link,
      sort_order: index + 1,
    }));

    setLinks(newLinks);

    try {
      await http.post("/api/navigation-links/reorder", {
        links: newLinks.map((l) => ({ id: l.id, sort_order: l.sort_order })),
      });
    } catch (error) {
      console.error("Failed to reorder", error);
      fetchLinks();
    }
  };

  const handleAddLink = async () => {
    if (!newLink.label.trim()) return;

    try {
      await http.post("/api/navigation-links", {
        type: activeType,
        ...newLink,
      });
      setNewLink({ label: "", url: "/", is_visible: true });
      setIsAdding(false);
      fetchLinks();
    } catch (error) {
      console.error("Failed to add link", error);
    }
  };

  const handleUpdateLink = async (link: NavigationLink) => {
    try {
      await http.put(`/api/navigation-links/${link.id}`, link);
      fetchLinks();
    } catch (error) {
      console.error("Failed to update link", error);
    }
  };

  const handleDeleteLink = async (id: number) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      await http.delete(`/api/navigation-links/${id}`);
      fetchLinks();
    } catch (error) {
      console.error("Failed to delete link", error);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Navigation Links</h1>
        <p className="text-muted-foreground">Manage header and footer navigation links</p>
      </div>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveType("header")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeType === "header"
              ? "border-blue-600 text-blue-600"
              : "border-transparent"
          }`}
        >
          Header Links
        </button>
        <button
          onClick={() => setActiveType("footer")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeType === "footer"
              ? "border-blue-600 text-blue-600"
              : "border-transparent"
          }`}
        >
          Footer Links
        </button>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add New Link"}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-muted p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Label</Label>
              <Input
                value={newLink.label}
                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                placeholder="Link label"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="/about"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={newLink.is_visible}
              onCheckedChange={(checked) => setNewLink({ ...newLink, is_visible: checked })}
            />
            <Label>Visible</Label>
          </div>
          <Button onClick={handleAddLink}>Save Link</Button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : links.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No links found. Add your first link!
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetectionStrategy={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {links.map((link) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  onUpdate={handleUpdateLink}
                  onDelete={handleDeleteLink}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create LinkItem sortable component**

```tsx
"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { NavigationLink } from "../navigation-links";

interface LinkItemProps {
  link: NavigationLink;
  onUpdate: (link: NavigationLink) => void;
  onDelete: (id: number) => void;
}

export function LinkItem({ link, onUpdate, onDelete }: LinkItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(link);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border rounded-lg p-4 flex items-center gap-4"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </div>

      {isEditing ? (
        <div className="flex-1 grid grid-cols-3 gap-4">
          <Input
            value={editData.label}
            onChange={(e) => setEditData({ ...editData, label: e.target.value })}
          />
          <Input
            value={editData.url}
            onChange={(e) => setEditData({ ...editData, url: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <Switch
              checked={editData.is_visible}
              onCheckedChange={(checked) => setEditData({ ...editData, is_visible: checked })}
            />
            <Button size="sm" onClick={handleSave}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <span className="font-medium">{link.label}</span>
            <span className="text-muted-foreground ml-2 text-sm">{link.url}</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={link.is_visible}
              onCheckedChange={(checked) => onUpdate({ ...link, is_visible: checked })}
            />
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(link.id)}>Delete</Button>
          </div>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Add route to app.ts (Wayfinder)**

Add route in routes or wherever admin pages are defined:
```typescript
navigation-links: inertia("admin/navigation-links"),
```

- [ ] **Step 4: Commit**

```bash
git add resources/js/pages/admin/navigation-links.tsx resources/js/pages/admin/LinkItem.tsx
git commit -m "feat: add admin navigation links page with drag-drop reordering"
```

---

## Task 8: Update Navbar Component

**Files:**
- Modify: `resources/js/components/layout/Navbar.jsx`

- [ ] **Step 1: Update to use new API**

Replace the fetch in Navbar.jsx:

```jsx
useEffect(() => {
  fetch('/api/navigation-links?type=header')
    .then(res => res.json())
    .then(data => {
      setLinks(data.links || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
```

Then in render, replace nav link mapping with:
```jsx
{standardLinks.map((link) => (
  <a key={link.id} href={link.url} ...>
    {link.label}
  </a>
))}
```

- [ ] **Step 2: Also update CTA detection logic**

Find links where label contains "appointment" or "book" for CTA button.

- [ ] **Step 3: Commit**

```bash
git add resources/js/components/layout/Navbar.jsx
git commit -m "feat: update Navbar to use navigation links API"
```

---

## Task 9: Update Footer Component

**Files:**
- Modify: `resources/js/components/layout/Footer.jsx`

- [ ] **Step 1: Update to use new API**

Add to useEffect:
```jsx
useEffect(() => {
  fetch('/api/navigation-links?type=footer')
    .then(res => res.json())
    .then(data => {
      setLinks(data.links || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
```

Then in render map footer links where `column3Title` comes from footer settings (not from links).

- [ ] **Step 2: Commit**

```bash
git add resources/js/components/layout/Footer.jsx
git commit -m "feat: update Footer to use navigation links API"
```

---

## Task 10: Remove Old Website Settings Fields

**Files:**
- Modify: `database/migrations/2026_04_30_066310_create_website_settings_table.php`

- [ ] **Step 1: Remove nav-related fields**

Remove from migration:
- footer_quick_links
- footer_column3_links  
- footer_specialties_links

Or create a separate migration to drop these columns.

- [ ] **Step 2: Commit**

```bash
git add database/migrations/...
git commit -m "feat: remove old nav link fields from website_settings"
```

---

## Task 11: Final - Run Tests and Verify

**Files:**
- Test: Feature tests for navigation links

- [ ] **Step 1:Run migration and seeder**

```bash
php artisan migrate:fresh --seed
```

- [ ] **Step 2: Test API endpoints**

```bash
# Header links
curl http://localhost/api/navigation-links?type=header

# Footer links  
curl http://localhost/api/navigation-links?type=footer
```

- [ ] **Step 3: Verify admin page loads**

Navigate to /admin/navigation-links

- [ ] **Step 4: Veriffy frontend**

Navigate to homepage, test header and footer links work

- [ ] **Step 5: Final commit**

```bash
git commit -m "feat: complete dynamic navigation CRUD system"
```

---

## Plan Complete

**Execution Option:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**