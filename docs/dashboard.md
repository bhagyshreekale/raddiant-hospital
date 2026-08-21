# Admin Dashboard

## Overview

The admin dashboard provides a comprehensive overview of hospital operations with statistics, charts, and recent activity. It's role-aware and shows different data based on the user's role.

## Route

```
GET /admin/dashboard → Admin\DashboardController@index
```

## Controller

**File:** `app/Http/Controllers/Admin/DashboardController.php`

## Dashboard Features

### Statistics Cards

#### For All Admins
- Total Doctors
- Total Appointments
- Total Inquiries
- Today's Appointments
- This Week's Appointments
- This Month's Appointments

#### For Admin/Super Admin (additional)
- Total Blogs
- Total Job Applications
- New Inquiries (status: 'new')
- Pending Inquiries (status: 'pending')

#### For Receptionist (additional)
- Today's Appointments list

### Charts

1. **Appointment Trend (30 days)**
   - Type: Line/Area chart
   - Data: Daily appointment counts for last 30 days

2. **Inquiry Status Distribution**
   - Type: Pie/Donut chart
   - Data: Count of inquiries by status (new, contacted, completed, cancelled)

### Recent Data

1. **Recent Appointments**
   - Last 5 appointments
   - Shows: Patient name, specialization, doctor, date, status

2. **Recent Inquiries**
   - Last 5 inquiries
   - Shows: Name, email, department, status, created date

## Frontend Page

**File:** `resources/js/pages/admin/dashboard.tsx`

### Components Used
- Shadcn/UI Cards for statistics
- Chart.js for data visualization
- Responsive grid layout

### Data Passed to View

```php
return Inertia::render('admin/dashboard', [
    'totalDoctors' => $totalDoctors,
    'totalAppointments' => $totalAppointments,
    'totalInquiries' => $totalInquiries,
    'todayAppointments' => $todayAppointments,
    'weekAppointments' => $weekAppointments,
    'monthAppointments' => $monthAppointments,
    'newInquiries' => $newInquiries,
    'pendingInquiries' => $pendingInquiries,
    'totalBlogs' => $totalBlogs,
    'totalJobApplications' => $totalJobApplications,
    'recentAppointments' => $recentAppointments,
    'recentInquiries' => $recentInquiries,
    'appointmentTrend' => $appointmentTrend,
    'inquiryStatusDistribution' => $inquiryStatusDistribution,
]);
```

## Role-Based Display

| Role | Visible Data |
|------|-------------|
| **Super Admin** | All stats, charts, recent data |
| **Admin** | All stats, charts, recent data |
| **Receptionist** | Doctors, Appointments, Inquiries + Today's appointment list |

## RBAC Permissions Required

- `view_appointments` - For appointment statistics
- `view_inquiries` - For inquiry statistics
- `view_blogs` - For blog statistics (Admin only)
- `view_doctors` - For doctor statistics

---

## Related Documentation

- [Authentication](./authentication.md) - Login required to access dashboard
- [RBAC](./rbac.md) - Role-based dashboard content
- [Appointments](./appointments.md) - Appointment data displayed on dashboard
- [Inquiries](./inquiries.md) - Inquiry data displayed on dashboard
- [Doctors](./doctors.md) - Doctor statistics
- [Blog](./blog.md) - Blog statistics (Admin only)
- [Careers](./careers.md) - Job application statistics
- [Bed Availability](./bed-availability.md) - Receptionist bed status widget
- [README](./README.md) - Application overview
