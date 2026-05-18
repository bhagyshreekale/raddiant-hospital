# Billing System Design Spec

**Date:** 2026-05-11
**Topic:** Billing Support for Hospital Management System

---

## Context

Hospital management system has appointments, doctors, specializations, health packages, and insurance partners. No billing exists yet. Patients are records attached to appointments — no patient accounts.

---

## Scope

- Bills generated from appointment data (no patient accounts)
- Manual payment recording by staff
- Online payment via Razorpay integration
- Insurance partner linking with auto-coverage calculation
- Basic reporting: bill list, status filter, totals

---

## Data Model

### bills
| Column | Type | Notes |
|--------|------|-------|
| id | bigint unsigned | PK |
| bill_number | varchar(50) | Auto-generated, unique, YYYYMM-XXXX format |
| appointment_id | bigint unsigned nullable | FK to appointments |
| patient_name | varchar(255) | From appointment |
| patient_phone | varchar(50) | From appointment |
| patient_email | varchar(255) | From appointment |
| insurance_partner_id | bigint unsigned nullable | FK to insurance_partners |
| insurance_coverage_percent | decimal(5,2) | e.g., 80.00 |
| subtotal | decimal(10,2) | Before insurance |
| insurance_amount | decimal(10,2) | Calculated: subtotal × coverage % |
| discount_amount | decimal(10,2) | Manual discounts |
| total_amount | decimal(10,2) | Final: subtotal - insurance - discount |
| status | enum('pending', 'partially_paid', 'paid', 'cancelled') | |
| notes | text nullable | Internal notes |
| created_by | bigint unsigned | FK to admins |
| created_at | timestamp | |
| updated_at | timestamp | |

### bill_items
| Column | Type | Notes |
|--------|------|-------|
| id | bigint unsigned | PK |
| bill_id | bigint unsigned | FK to bills |
| description | varchar(255) | Service/procedure name |
| quantity | decimal(10,2) | Default 1 |
| unit_price | decimal(10,2) | Per unit |
| amount | decimal(10,2) | quantity × unit_price |

### bill_payments
| Column | Type | Notes |
|--------|------|-------|
| id | bigint unsigned | PK |
| bill_id | bigint unsigned | FK to bills |
| amount | decimal(10,2) | Payment amount |
| payment_mode | enum('cash', 'card', 'upi', 'netbanking', 'razorpay') | |
| transaction_reference | varchar(255) nullable | Gateway reference if online |
| razorpay_payment_id | varchar(255) nullable | For reconciliation |
| collected_by | bigint unsigned | FK to admins |
| notes | text nullable | |
| created_at | timestamp | |

---

## Architecture

### Backend
- `Bill` model with relationships: appointment, insurancePartner, items, payments, creator
- `BillItem` model (belongs to Bill)
- `BillPayment` model (belongs to Bill)
- `BillController` — CRUD operations
- `BillApiController` — Razorpay webhook handling and payment verification
- Policy for authorization
- Factory + Seeder for test data

### Frontend
- `/admin/bills` — List page with filters (status, date range, search by patient/bill number)
- `/admin/bills/create` — Create bill with line items, link appointment, apply insurance
- `/admin/bills/{id}` — View bill details with payment history
- `/admin/bills/{id}/edit` — Edit bill items and amounts
- `/admin/bills/{id}/payments` — Add payment recording
- Sidebar nav: Billing menu item (visible to Admin only)

### Razorpay Integration
- Admin creates bill → initiates Razorpay order → returns payment link
- Patient pays via link → webhook updates bill status
- Manual payments recorded by staff directly

### Permissions
- `bills.view`, `bills.create`, `bills.update`, `bills.delete` — per billing action
- Super Admin has all by default

---

## Key Flows

### Create Bill
1. Staff goes to `/admin/bills/create`
2. Optionally link to existing appointment (auto-fills patient info)
3. Add line items (description, qty, price)
4. Optionally select insurance partner — coverage % auto-fills
5. Optionally apply manual discount
6. Totals calculated live
7. Save → bill created with `pending` status

### Record Payment
1. Staff opens bill detail page
2. Clicks "Add Payment"
3. Enters amount, selects mode, adds notes
4. Save → bill status updated (pending → partially_paid → paid)
5. If fully paid, status = `paid`

### Online Payment
1. Staff clicks "Send Payment Link"
2. System creates Razorpay order
3. Payment link returned → copied/shared to patient
4. Patient pays → Razorpay webhook → system updates bill status

---

## Out of Scope (Future)
- Refunds
- Credit notes
- Recurring billing
- Patient self-service portal
- Appointment revenue reports
- Daily/date-range revenue reports
- Insurance claim status tracking

---

## Design Decisions

- **Bill number format:** `YYYYMM-XXXX` — e.g., `202605-0001`. Auto-increments per month.
- **Status transitions:** pending → partially_paid → paid. Can go backwards if refund issued (future).
- **Insurance calculation:** `insurance_amount = subtotal × (coverage_percent / 100)`. Rounded to 2 decimals.
- **Total calculation:** `total = subtotal - insurance_amount - discount_amount`
- **Line items are immutable after bill creation** — editing creates new bill if needed. For v1, allow item edits on pending bills only.
- **No invoice template yet** — display-only for v1. PDF generation is future scope.

---

## Testing Strategy
- Feature tests for bill CRUD
- Feature tests for payment recording
- Feature tests for insurance calculation
- Feature tests for Razorpay flow mocking
