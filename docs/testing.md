# 🧪 Raddiant Plus Hospital — Testing Guide

**Audience:** Developers  
**Framework:** Pest PHP 4 + PHPUnit 12  
**Purpose:** How to write, run, and maintain tests

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Test Structure](#-test-structure)
- [Writing Tests](#-writing-tests)
- [Factory Usage](#-factory-usage)
- [Test Database](#-test-database)
- [Testing RBAC & Permissions](#-testing-rbac--permissions)
- [Testing Inertia Pages](#-testing-inertia-pages)
- [Testing API Endpoints](#-testing-api-endpoints)
- [Running Tests](#-running-tests)
- [CI Integration](#-ci-integration)
- [Common Patterns](#-common-patterns)

---

## 🚀 Getting Started

### Prerequisites

```bash
# Install dependencies (including dev)
composer install

# Create test database (SQLite is used by default for tests)
touch database/database.sqlite
```

### Verify Setup

```bash
php artisan test --compact
```

If everything is configured correctly, you should see:

```
   PASS  Tests\Feature\RoleAndPermissionTest
  ✓ creates default roles
  ✓ assigns correct permissions to Admin role
  ✓ assigns correct permissions to Receptionist role
  ✓ checks Super Admin via role
  ✓ checks Admin has admin access
  ✓ checks Receptionist has receptionist access only
  ✓ prevents receptionist from accessing admin-only pages via middleware
```

---

## 📁 Test Structure

```
tests/
├── Feature/           # Feature tests (most tests go here)
│   └── RoleAndPermissionTest.php
├── Unit/              # Unit tests
├── Pest.php           # Pest configuration
└── TestCase.php       # Base test case class
```

### Pest Configuration (`tests/Pest.php`)

```php
pest()->extend(TestCase::class)->in('Feature');
```

This tells Pest to use the project's `TestCase` for all tests in the `Feature` directory. The `TestCase` extends Laravel's base test case and sets up the application environment.

---

## ✍️ Writing Tests

### Basic Test Structure

```php
<?php

use function Pest\Laravel\get;

// Simple test
it('loads the home page', function () {
    $response = get('/');
    $response->assertStatus(200);
});

// Test with expectations
it('has a title', function () {
    $response = get('/');
    $response->assertSee('Raddiant Plus Hospital');
});
```

### Using `test()` vs `it()`

Both work identically — use whichever reads better:

```php
test('the home page loads successfully', function () {
    // ...
});

it('loads successfully', function () {
    // ...
});
```

### Grouping Tests with `describe()`

```php
describe('appointment creation', function () {
    it('requires a patient name', function () {
        // ...
    });

    it('requires a valid phone number', function () {
        // ...
    });

    it('accepts valid appointment data', function () {
        // ...
    });
});
```

---

## 🏭 Factory Usage

### Available Factories

| Factory | Model | Key Fields |
|---------|-------|------------|
| `AdminFactory` | `App\Models\Admin` | username, password |
| `UserFactory` | `App\Models\User` | name, email |

### Using Factories

```php
use App\Models\Admin;
use App\Models\Doctor;
use App\Models\Appointment;

// Create a single record
$admin = Admin::factory()->create();

// Create multiple records
$doctors = Doctor::factory()->count(5)->create();

// Create with custom attributes
$admin = Admin::factory()->create([
    'username' => 'custom_admin',
]);

// Create and assign role
$admin = Admin::factory()->create();
$admin->assignRole('Admin');

// Create relationships
$appointment = Appointment::factory()->create([
    'doctor_id' => Doctor::factory(),
]);
```

> ⚠️ **Note:** Currently only `AdminFactory` and `UserFactory` exist in the project. Factory examples using `Doctor::factory()`, `Specialization::factory()`, or other models require creating the corresponding factory first via `php artisan make:factory ModelNameFactory --model=ModelName`.

### Creating Custom Factories

```bash
php artisan make:factory DoctorFactory --model=Doctor
```

Example factory:

```php
namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    protected $model = Doctor::class;

    public function definition(): array
    {
        return [
            'name' => 'Dr. ' . fake()->name(),
            'specialization_id' => Specialization::factory(),
            'education' => 'MD, ' . fake()->randomElement(['Cardiology', 'Neurology', 'Orthopedics']),
            'availability' => 'Mon-Sat 9AM-5PM',
        ];
    }
}
```

> ⚠️ Note: Only `AdminFactory` and `UserFactory` exist currently. Other factories need to be created before they can be used in tests.

---

## 🗄️ Test Database

### Configuration

The test database is configured in `phpunit.xml.dist`:

```xml
<server name="DB_CONNECTION" value="sqlite"/>
<server name="DB_DATABASE" value=":memory:"/>
```

Tests use an **in-memory SQLite database** by default. This means:
- ✅ Fast test execution (no disk I/O)
- ✅ Fresh database per test (with `RefreshDatabase` trait)
- ❌ Can't test MySQL-specific features (JSON columns, full-text search)
- ❌ Different SQL syntax from production MySQL

### Using MySQL for Tests (Optional)

If you need to test MySQL-specific features, override environment variables in `phpunit.xml`:

```xml
<server name="DB_CONNECTION" value="mysql"/>
<server name="DB_DATABASE" value="raddiant_testing"/>
<server name="DB_USERNAME" value="root"/>
<server name="DB_PASSWORD" value=""/>
```

Or via `.env.testing`:

```bash
cp .env.example .env.testing
# Edit .env.testing to use MySQL
```

### Testing with Factory States

```php
it('creates an admin', function () {
    $admin = Admin::factory()->create([
        'username' => 'test_admin',
    ]);

    expect($admin->username)->toBe('test_admin');
    expect($admin->exists)->toBeTrue();
});
```

---

## 🔐 Testing RBAC & Permissions

### The Pattern

The existing `RoleAndPermissionTest` shows the standard pattern:

```php
<?php

use App\Models\Admin;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

beforeEach(function () {
    seed(RoleAndPermissionSeeder::class);
});

it('creates default roles', function () {
    expect(Role::where('guard_name', 'admin')->count())->toBe(3)
        ->and(Role::where('name', 'Super Admin')->exists())->toBeTrue();
});

it('assigns correct permissions to Admin role', function () {
    $adminRole = Role::where('name', 'Admin')->first();
    expect($adminRole->permissions->count())->toBeGreaterThan(0);
    expect($adminRole->hasPermissionTo('doctors.view-any'))->toBeTrue();
});
```

### Testing Permission Checks

```php
it('prevents receptionist from accessing admin-only page', function () {
    // Seed roles and permissions
    seed(RoleAndPermissionSeeder::class);

    // Create and authenticate a receptionist
    $receptionist = Admin::factory()->create();
    $receptionist->assignRole('Receptionist');
    $this->actingAs($receptionist, 'admin');

    // Try to access admin-only page
    $response = $this->get('/admin/settings/website-settings');
    $response->assertForbidden();  // or assertStatus(403)
});
```

### Testing Super Admin Bypass

```php
it('allows super admin to access admin-only page', function () {
    seed(RoleAndPermissionSeeder::class);

    $superAdmin = Admin::factory()->create();
    $superAdmin->assignRole('Super Admin');
    $this->actingAs($superAdmin, 'admin');

    $response = $this->get('/admin/website-settings');
    $response->assertStatus(200);
});
```

### Testing Permission Assertions

```php
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

it('checks permission exists', function () {
    seed(RoleAndPermissionSeeder::class);

    expect(Permission::where('name', 'appointments.view-any')->exists())->toBeTrue();
    expect(Permission::where('name', 'nonexistent-permission')->exists())->toBeFalse();
});

it('checks role has permission', function () {
    seed(RoleAndPermissionSeeder::class);

    $doctorRole = Role::where('name', 'Admin')->first();
    expect($doctorRole->hasPermissionTo('doctors.create'))->toBeTrue();
    expect($doctorRole->hasPermissionTo('website-settings.view'))->toBeTrue();
});
```

---

## 🖥️ Testing Inertia Pages

### Page Rendering

```php
it('renders the dashboard page', function () {
    seed(RoleAndPermissionSeeder::class);

    $admin = Admin::factory()->create();
    $admin->assignRole('Admin');
    $this->actingAs($admin, 'admin');

    $response = $this->get('/admin/dashboard');
    $response->assertStatus(200);

    // Check Inertia page component
    $response->assertInertia(fn ($page) => $page
        ->component('admin/dashboard')
        ->has('stats')
        ->has('recentAppointments')
    );
});
```

### Testing Inertia Props

```php
use Inertia\Testing\AssertableInertia as Assert;

it('passes doctor data to the doctors page', function () {
    $admin = Admin::factory()->create();
    $admin->assignRole('Admin');
    $this->actingAs($admin, 'admin');

    Doctor::factory()->count(3)->create();

    $response = $this->get('/admin/doctors');
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/doctors/index')
        ->has('doctors', 3)
        ->has('doctors.0', fn (Assert $doctor) => $doctor
            ->has('name')
            ->has('specialization')
        )
    );
});
```

---

## 🔌 Testing API Endpoints

### Public API

```php
it('returns site data', function () {
    $response = $this->getJson('/api/site-data');

    $response->assertStatus(200);
    $response->assertJsonStructure([
        'name',
        'tagline',
        'phone',
        'email',
        'social',
        'footer',
    ]);
});

it('stores an appointment', function () {
    $response = $this->post('/appointment', [
        'name' => 'John Doe',
        'phone' => '+91 9876543210',
        'date' => '2026-06-20',
        'time' => '10:30 AM',
        'service' => 'Cardiology',
        'gender' => 'Male',
    ]);

    $response->assertStatus(302);  // Redirect on success
    $this->assertDatabaseHas('appointments', [
        'full_name' => 'John Doe',
        'phone' => '+91 9876543210',
    ]);
});
```

### Admin API with Authentication

```php
it('creates a new doctor', function () {
    seed(RoleAndPermissionSeeder::class);

    $admin = Admin::factory()->create();
    $admin->assignRole('Admin');
    $this->actingAs($admin, 'admin');

    $specialization = Specialization::factory()->create();

    $response = $this->post('/admin/doctors', [
        'name' => 'Dr. Test',
        'specialization_id' => $specialization->id,
        'education' => 'MD',
        'availability' => 'Mon-Sat 9AM-5PM',
    ]);

    $response->assertStatus(302);
    $this->assertDatabaseHas('doctors', [
        'name' => 'Dr. Test',
    ]);
});
```

### Validation Testing

```php
it('validates required fields for doctor creation', function () {
    seed(RoleAndPermissionSeeder::class);

    $admin = Admin::factory()->create();
    $admin->assignRole('Admin');
    $this->actingAs($admin, 'admin');

    $response = $this->post('/admin/doctors', []);
    $response->assertSessionHasErrors(['name']);
});

it('validates phone format for appointments', function () {
    $response = $this->post('/appointment', [
        'name' => 'John',
        'phone' => 'invalid',
        'date' => '2026-06-20',
        'time' => '10:00',
    ]);

    $response->assertSessionHasErrors(['phone']);
});
```

---

## 🏃 Running Tests

### Basic Commands

```bash
# Run all tests
php artisan test --compact

# Run a specific test file
php artisan test --compact tests/Feature/RoleAndPermissionTest.php

# Run tests matching a name
php artisan test --compact --filter=creates

# Run tests in a specific directory
php artisan test --compact tests/Feature/

# Run with verbose output
php artisan test

# Run without compact
php artisan test -v
```

### Filtering Examples

```bash
# Run all tests with "appointment" in the name
php artisan test --compact --filter=appointment

# Run tests containing "role" (case-insensitive)
php artisan test --compact --filter=role

# Run a specific test by exact name
php artisan test --compact --filter="it creates default roles"
```

### Watching for Changes

```bash
# Run tests continuously (using pail or watch)
php artisan test --compact --watch

# Or use a file watcher
npx chokidar-cli 'tests/**/*.php' -c 'php artisan test --compact --filter=created'
```

### Parallel Testing

For faster test execution:

```bash
# Run tests in parallel (requires multiple cores)
php artisan test --compact --parallel
```

> Note: Parallel tests require the `brianium/paratest` package or Pest's built-in parallel support.

---

## 🔄 CI Integration

### GitHub Actions Workflow

Create `.github/workflows/tests.yml`:

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: 8.5
          extensions: mbstring, xml, gd, zip, pdo_mysql
          coverage: none

      - name: Install Composer dependencies
        run: composer install --no-interaction

      - name: Copy environment
        run: cp .env.example .env

      - name: Generate key
        run: php artisan key:generate

      - name: Install Node dependencies
        run: npm ci

      - name: Build frontend assets
        run: npm run build

      - name: Run tests
        run: php artisan test --compact
```

> ⚠️ **Note:** The `npm ci` and `npm run build` steps are required for tests that render Inertia pages. If your tests only hit API-like endpoints (no page rendering), you can omit the frontend build steps.

---

## 📐 Common Patterns

### Pattern: Authenticated Admin Test

```php
<?php

use App\Models\Admin;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\seed;

uses(RefreshDatabase::class);

function createAuthenticatedAdmin(string $role = 'Admin'): Admin
{
    seed(RoleAndPermissionSeeder::class);
    $admin = Admin::factory()->create();
    $admin->assignRole($role);
    $this->actingAs($admin, 'admin');
    return $admin;
}

it('can access the dashboard', function () {
    createAuthenticatedAdmin();

    $response = $this->get('/admin/dashboard');
    $response->assertStatus(200);
});
```

### Pattern: Testing CRUD Operations

```php
describe('admin CRUD for doctors', function () {
    beforeEach(function () {
        createAuthenticatedAdmin('Admin');
    });

    it('lists doctors', function () {
        Doctor::factory()->count(3)->create();
        $response = $this->get('/admin/doctors');
        $response->assertStatus(200);
    });

    it('creates a doctor', function () {
        $specialization = Specialization::factory()->create();
        $response = $this->post('/admin/doctors', [
            'name' => 'Dr. Test',
            'specialization_id' => $specialization->id,
        ]);
        $response->assertStatus(302);
        $this->assertDatabaseCount('doctors', 1);
    });

    it('updates a doctor', function () {
        $doctor = Doctor::factory()->create();
        $response = $this->put("/admin/doctors/{$doctor->id}", [
            'name' => 'Dr. Updated',
        ]);
        $response->assertStatus(302);
        expect($doctor->fresh()->name)->toBe('Dr. Updated');
    });

    it('deletes a doctor', function () {
        $doctor = Doctor::factory()->create();
        $response = $this->delete("/admin/doctors/{$doctor->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('doctors', ['id' => $doctor->id]);
    });
});
```

### Pattern: Testing Role-Based Access

```php
it('restricts receptionist from creating doctors', function () {
    createAuthenticatedAdmin('Receptionist');

    $response = $this->post('/admin/doctors', [
        'name' => 'Dr. Unauthorized',
    ]);

    $response->assertForbidden();
});

it('allows admin to access website settings', function () {
    createAuthenticatedAdmin('Admin');
    $response = $this->get('/admin/website-settings');
    $response->assertStatus(200);
});

it('prevents receptionist from accessing website settings', function () {
    createAuthenticatedAdmin('Receptionist');
    $response = $this->get('/admin/website-settings');
    $response->assertForbidden();
});
```

### Pattern: Database Assertions

```php
// Assert a record exists
$this->assertDatabaseHas('users', ['email' => 'john@example.com']);

// Assert a record is missing
$this->assertDatabaseMissing('users', ['email' => 'deleted@example.com']);

// Assert count
$this->assertDatabaseCount('users', 5);

// Assert soft deleted
$this->assertSoftDeleted('users', ['id' => $user->id]);
```

---

## 📝 Best Practices

1. **Use `RefreshDatabase`** for all feature tests that modify the database
2. **Seed roles/permissions** in `beforeEach` when testing RBAC
3. **Use factories** instead of manually creating model instances
4. **Test permissions** — always test that unauthorized users get a 403
5. **Test validation** — always test that invalid data returns errors
6. **Name tests descriptively** — `it('prevents unauthenticated access to admin pages')`
7. **Keep tests focused** — one assertion concept per test
8. **Use `describe()`** to group related tests for readability
9. **Run tests before committing** — `php artisan test --compact`

---

## ❓ Troubleshooting Tests

### `SQLSTATE[HY000] [1045] Access denied`

**Problem:** SQLite in-memory database isn't being used.

**Solution:** Check `phpunit.xml.dist` — ensure `DB_CONNECTION` is set to `sqlite` and `DB_DATABASE` is `:memory:`.

### `Base table or view not found`

**Problem:** Migrations haven't run.

**Solution:** Ensure your test or `beforeEach` uses the `RefreshDatabase` trait.

### `Class "Database\Factories\...Factory" not found`

**Problem:** Factory is referenced but doesn't exist.

**Solution:** Create the factory with `php artisan make:factory ModelNameFactory --model=ModelName`.

### `Too few arguments to function`

**Problem:** Missing required parameters.

**Solution:** Check that you're passing all required fields in POST/PUT requests.
