# 🏥 Raddiant Plus Hospital — Admin User Manual

**Audience:** Receptionists, Administrators, and Super Admins  
**Purpose:** Step-by-step guide for daily operations

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Dashboard Overview](#-dashboard-overview)
- [Managing Appointments](#-managing-appointments)
- [Handling Inquiries](#-handling-inquiries)
- [Managing Doctors & Specializations](#-managing-doctors--specializations)
- [Managing Services & Testimonials](#-managing-services--testimonials)
- [Content Management (Blogs & Gallery)](#-content-management-blogs--gallery)
- [Careers & Job Applications](#-careers--job-applications)
- [Health Packages & Insurance Partners](#-health-packages--insurance-partners)
- [Bed Availability](#-bed-availability)
- [Contact Information](#-contact-information)
- [Website Settings](#-website-settings)
- [Navigation Links](#-navigation-links)
- [Admin Users & RBAC](#-admin-users--rbac)
- [Backup & Restore](#-backup--restore)
- [Profile & Security](#-profile--security)

---

## 🔐 Getting Started

### Logging In

1. Navigate to `/admin/login` in your browser
2. Enter your **username** and **password**
3. Click **Login**

**Default Credentials:**

| Role | Username | Password |
|------|----------|----------|
| Super Admin | `admin` | `admin123` |
| Receptionist | `receptionist` | `receptionist123` |

> ⚠️ Change your password after first login via **Settings → Security**.

### Two-Factor Authentication (2FA)

If 2FA is enabled for your account:

1. After entering credentials, you'll see a **2FA Challenge** screen
2. Open your authenticator app (Google Authenticator, Authy, etc.)
3. Enter the 6-digit code displayed in the app
4. Click **Verify**

**If you lose access to your authenticator app:** Use one of your **recovery codes** (provided during 2FA setup). Each code can be used only once.

### Understanding the Sidebar

The left sidebar shows different menu items based on your role:

- **Super Admin / Admin:** Full sidebar with all resources (Dashboard, Doctors, Appointments, Inquiries, Bed Availability, Specializations, Services, Testimonials, Blogs, Gallery, Careers, Job Applications, Health Packages, Insurance Partners, Website Settings, Navigation Links, Admins, Roles, Permissions, Backups)
- **Receptionist:** Limited sidebar (Dashboard, Appointments, Inquiries, Bed Availability, Job Applications)

---

## 📊 Dashboard Overview

The dashboard is your home screen after login. It shows:

### Statistics Cards (Top Row)

| Card | Description |
|------|-------------|
| **Today's Appointments** | Number of appointments scheduled for today |
| **Total Doctors** | Total doctor records in the system |
| **New Inquiries** | Unread patient inquiries |
| **This Month** | Total appointments this month |

Click any card to navigate to that section.

### Charts & Lists

- **Appointments This Month** — Bar chart showing daily appointment counts
- **Recent Appointments** — Latest 5 appointments with patient name, doctor, date, and time
- **Inquiry Status** — Donut chart showing inquiry distribution (new, contacted, completed, cancelled)
- **Recent Inquiries** — Latest 4 inquiries with status badges

### Quick Actions Panel

Shortcuts to frequently used features:
- **Manage Appointments** — View and update patient appointments
- **Handle Inquiries** — Process new patient inquiries
- **Bed Availability** (Receptionist) — Update hospital bed status
- **Manage Doctors** (Admin) — Add or update doctor records
- **Job Applications** (Admin) — Review candidate applications

### Role Differences

**Receptionists** see an additional **Bed Availability** card with current bed counts and status.  
**Admins** see an **Admin Overview** section with blog counts, job applications, and completed inquiries.

---

## 📅 Managing Appointments

### Viewing Appointments

1. Click **Appointments** in the sidebar
2. You'll see a table of all appointments with:
   - Patient name, phone, email
   - Specialization & doctor
   - Preferred date & time slot
   - Visit type (OPD / Emergency)
3. Use the search/filter to find specific appointments

### Creating an Appointment

1. Click **Appointments** in the sidebar
2. Click the **Create Appointment** button
3. Fill in the form:
   - **Full Name** (required)
   - **Phone** (required)
   - **Email** (optional)
   - **Age** (optional)
   - **Gender** (optional)
   - **Visit Type** (required — OPD or Emergency)
   - **Specialization** (select from dropdown)
   - **Doctor** (select from dropdown)
   - **Preferred Date** (required)
   - **Time Slot** (required)
   - **Description / Notes** (optional)
4. Click **Save**

### Updating an Appointment

1. Find the appointment in the list
2. Click the **Edit** button
3. Modify the fields
4. Click **Update**

### Deleting an Appointment

1. Find the appointment in the list
2. Click the **Delete** button
3. Confirm the deletion

---

## 📨 Handling Inquiries

Inquiries are patient messages submitted through the public **Contact** page.

### Viewing Inquiries

1. Click **Inquiries** in the sidebar
2. You'll see a table with:
   - Reference ID (e.g., `RPH-A1B2C3D4`)
   - Name, phone, email
   - Department
   - Status badge (color-coded)
   - Submitted date

### Updating Inquiry Status

Inquiries follow a status workflow: **New → Contacted → Completed / Cancelled**

1. Find the inquiry in the list
2. Click the status dropdown or **Edit** button
3. Select the new status:
   - **New** — Freshly submitted, awaiting action
   - **Contacted** — You've reached out to the patient
   - **Completed** — Issue resolved
   - **Cancelled** — No longer relevant
4. Save

### Deleting an Inquiry

1. Find the inquiry in the list
2. Click the **Delete** button
3. Confirm

> 💡 **Tip:** Always mark inquiries as "Contacted" after reaching out so your team knows the status.

---

## 👨‍⚕️ Managing Doctors & Specializations

### Adding a Doctor

1. Go to **Doctors** in the sidebar
2. Click **Create Doctor**
3. Fill in:
   - **Name** (required)
   - **Specialization** (select from dropdown)
   - **Education** (e.g., "MD, DM Cardiology")
   - **Image** (upload photo)
   - **Availability** (e.g., "Mon-Sat 9AM-5PM")
4. Click **Save**

### Editing a Doctor

1. Click the **Edit** button next to the doctor
2. Update the fields
3. Click **Update**

### Deleting a Doctor

1. Click the **Delete** button
2. Confirm

### Managing Specializations

Specializations are medical categories (Cardiology, Orthopedics, etc.):

1. Go to **Specializations** in the sidebar
2. **Create** — Add name, image, description
3. **Edit** — Modify existing specialization
4. **Delete** — Remove (only if no doctors are linked)

> ⚠️ Deleting a specialization that has linked doctors may cause issues. Reassign doctors first.

---

## 🏥 Managing Services & Testimonials

### Services

Services are displayed on the public **Services** page.

1. Go to **Services** in the sidebar
2. **Create** — Add title, image, description, color
3. Services auto-categorize into: Diagnostics, Surgery, Emergency, Specialty
4. **Edit / Delete** — Standard CRUD operations

### Testimonials

Patient reviews displayed on the homepage.

1. Go to **Testimonials** in the sidebar
2. **Create:**
   - **Specialization** (select — determines color theme)
   - **Patient Name** (required)
   - **Patient Type** (e.g., "Patient", "Family Member")
   - **Description / Review** (required)
   - **Profile Image** (optional)
3. The homepage shows up to 3 testimonials with gradient color theming

---

## 📝 Content Management (Blogs & Gallery)

### Blog Posts

1. Go to **Blogs** in the sidebar
2. **Create Blog:**
   - **Title** (required)
   - **Category** (required)
   - **Description** — Rich text editor (TinyMCE) for full formatting
   - **Read Time** (e.g., "5 min read")
   - **Image** — Upload (JPEG, PNG, WebP, max 2MB)
3. **Edit / Delete** — Standard operations. Deleting a blog also removes its image from storage.

### Gallery Images

1. Go to **Gallery** in the sidebar
2. **Create:**
   - **Image** (required)
   - **Title** (optional)
   - **Category** (optional — used for filtering on public page)
3. Category options match the filter tabs on the public gallery page

---

## 💼 Careers & Job Applications

### Job Postings

1. Go to **Careers** in the sidebar
2. **Create:**
   - **Specialization** (e.g., "Cardiology")
   - **Title** (e.g., "Senior Cardiologist" — required)
   - **Salary** (e.g., "₹25,00,000 - ₹35,00,000")
   - **Location** (required)
   - **Job Type** (required — Full-time, Part-time, or Contract)
   - **Experience** (e.g., "5-10 years")
   - **Description** (required — full job description)

### Reviewing Job Applications

When candidates apply through the public Careers page:

1. Go to **Job Applications** in the sidebar
2. View the list with:
   - Applicant name, email, phone
   - Experience
   - Applied position (linked career)
   - Resume file
3. **View Details** — Click to see full application
4. **Download Resume** — Click the download icon to get the resume file (PDF/DOC/DOCX)
5. **Delete** — Remove unwanted applications

---

## 🏷️ Health Packages & Insurance Partners

### Health Packages

Displayed on the public **Facilities** page as pricing cards.

1. Go to **Health Packages** in the sidebar
2. **Create:**
   - **Name** (required, e.g., "Full Body Checkup")
   - **Description** (required)
   - **Price** (required, numeric)
   - **Features** — Add individual feature items (e.g., "Complete Blood Count", "Lipid Profile")
   - **Featured** — Toggle to highlight the package
3. **Edit / Delete** — Standard operations

### Insurance Partners

Displayed on the public **Facilities** page.

1. Go to **Insurance Partners** in the sidebar
2. **Create:**
   - **Name** (required)
   - **Category** (required — Public, Private, or TPA)
   - **Logo** (upload image)
3. Partners are grouped by category on the public page

---

## 🛏️ Bed Availability

Track hospital bed status in real-time.

1. Go to **Bed Availability** in the sidebar
2. **Create:**
   - **Total Beds** (required)
   - **Available Beds** (required)
   - **Status** (required — Good, Limited, or Full)
3. **Edit** — Update bed counts as admissions/discharges happen
4. **Delete** — Remove a ward entry

**Status Indicators:**
- 🟢 **Good** — More than 50% beds available
- 🟡 **Limited** — Between 20-50% beds available
- 🔴 **Full** — Less than 20% beds available

> 💡 **Tip:** Update bed availability at the start of each shift so the front desk has accurate information.

---

## 📞 Contact Information

Manage hospital contact details.

1. Go to **Contact** in the sidebar
2. Fields:
   - **Email** (required)
   - **Phone**
   - **Address**
   - **Open Hours**
   - **Map Link** (Google Maps URL)
3. Only one contact record is maintained — edits update the existing record

---

## ⚙️ Website Settings

Central configuration for the public website appearance and content.

1. Go to **Website Settings** in the sidebar
2. Configure these groups:

### Logo
- Upload a hospital logo (recommended: 320×170px)

### Header Information
- Hospital name, tagline, phone, WhatsApp, email, emergency number, address

### Social Links
- Facebook, Instagram, YouTube profile URLs

### Footer Information
- Tagline and description text

### Specialties
- Manage the list of specialties shown in the footer
- Click **Add Specialty** to add new items
- Click **Remove** to delete

### Contact Information
- Contact title, address, phone, email, timing (footer)

3. Click **Save Settings** when done

> 💡 **Tip:** Changes are reflected on the public website immediately after saving.

---

## 🔗 Navigation Links

Manage the public website's navigation menu with drag-and-drop reordering.

1. Go to **Navigation Links** in the sidebar
2. You'll see two sections:
   - **Header Links** — Main navigation bar
   - **Footer Links** — Footer quick links

### Adding a Link

1. Click **Add Link**
2. Select **Type** (Header or Footer)
3. Enter **Label** (e.g., "About Us")
4. Enter **URL** (e.g., "/about")
5. Toggle **Visible** on/off
6. Click **Save**

### Reordering Links

- Drag and drop links to reorder them
- Changes save automatically via AJAX

### Editing a Link

- Click the **Edit** button next to a link
- Update label or URL inline
- Toggle visibility to show/hide

### Deleting a Link

- Click the **Delete** button
- Confirm

---

## 👥 Admin Users & RBAC

> 🔒 **Super Admin only** for creating and deleting admin users.

### Managing Admin Users

1. Go to **Admins** in the sidebar
2. View all admin accounts with their roles
3. **Create:**
   - Username (unique)
   - Password (min 8 characters)
   - Role (Super Admin, Admin, or Receptionist)
4. **Edit:** Update username, password, or role
5. **Delete:** Remove an admin account (cannot delete Super Admin)

### Roles Management

1. Go to **Roles** in the sidebar
2. View roles with permission counts and assigned users
3. **Create:** Name and description
4. **Edit:** Update name, description, and assign permissions via the permission grid
5. **Delete:** Remove unused roles (system roles Super Admin, Admin, Receptionist are protected)

### Editing a Role's Permissions

1. Click **Edit** next to a role
2. You'll see a **permission grid** grouped by resource:
   - Each group has a **Select All** / **Deselect All** toggle
   - Check individual permissions as needed
3. Click **Update** to save

### Permissions Management

1. Go to **Permissions** in the sidebar
2. View all permissions grouped by resource
3. **Create:** Name, slug (e.g., `reports.view`), group (e.g., `reports`)
4. **Edit / Delete** — Standard operations (cannot delete permissions assigned to roles)

> ⚠️ **Important:** Changes to roles and permissions take effect immediately. Be careful when modifying permissions for roles that have active users.

---

## 💾 Backup & Restore

### Creating a Backup

1. Go to **Backups** in the sidebar
2. Click **Create Backup**
3. Wait for the process to complete (may take a few seconds)
4. The new backup appears in the list with filename, size, and date

### Downloading a Backup

1. Find the backup in the list
2. Click the **Download** button
3. The backup file (`.zip`) will download to your computer

### Deleting a Backup

1. Find the backup in the list
2. Click the **Delete** button
3. Confirm

### Restoring from a Backup

> ⚠️ **Warning:** Restoring will overwrite your current database. This action cannot be undone.

#### Option 1: Restore an Existing Backup

1. Find the backup in the list
2. Click the **Restore** button
3. Confirm the action
4. Wait for the restore process to complete

#### Option 2: Upload & Restore

1. Click **Upload & Restore**
2. Select a `.zip` or `.tar.gz` backup file from your computer
3. Click **Upload & Restore**
4. Confirm the action
5. Wait for the restore process to complete

---

## 👤 Profile & Security

### Editing Your Profile

1. Click your avatar/name in the bottom-left of the sidebar
2. Select **Profile**
3. Update your name, email, or photo
4. Click **Save**

### Changing Your Password

1. Go to **Settings → Security**
2. Under **Change Password:**
   - Enter current password
   - Enter new password (min 8 characters)
   - Confirm new password
3. Click **Update Password**

### Enabling Two-Factor Authentication (2FA)

1. Go to **Settings → Security**
2. Click **Enable Two-Factor Authentication**
3. Scan the QR code with your authenticator app
4. Enter the 6-digit code from the app
5. Click **Verify**
6. **Save your recovery codes** in a safe place (these are shown once)

### Disabling 2FA

1. Go to **Settings → Security**
2. Click **Disable Two-Factor Authentication**
3. Enter your current password
4. Click **Confirm**

### Regenerating Recovery Codes

1. Go to **Settings → Security**
2. Click **Regenerate Recovery Codes**
3. Enter your current password
4. Save the new recovery codes

### Changing Appearance

1. Click your avatar/name in the bottom-left
2. Select **Appearance**
3. Choose: **Light**, **Dark**, or **System** theme

---

## ❓ FAQ

**Q: I forgot my password. What should I do?**
A: On the login page, click **Forgot Password**. Enter your email to receive a reset link.

**Q: I'm locked out because of 2FA. How do I get back in?**
A: Use one of your recovery codes. If you've lost those too, contact a Super Admin to disable 2FA on your account.

**Q: Why can't I see certain menu items in the sidebar?**
A: Your role determines what you can access. Contact a Super Admin if you need additional permissions.

**Q: How do I switch between light and dark mode?**
A: Click your avatar in the sidebar → **Appearance** → select your preferred theme.

**Q: A patient is asking about their appointment status. Where can I check?**
A: Go to **Appointments** and search by the patient's name or phone number.

**Q: How do I generate a report of today's activity?**
A: The dashboard shows today's appointments and new inquiries. For detailed reports, check the respective sections.

---

## 🎯 Quick Reference

### Color-Coded Status Badges

| Badge | Meaning |
|-------|---------|
| 🔴 Red (new) | Fresh inquiry, needs attention |
| 🟡 Amber (contacted) | Patient has been reached |
| 🟢 Green (completed) | Issue resolved |
| ⚪ Grey (cancelled) | No longer relevant |

### Bed Status Colors

| Indicator | Meaning |
|-----------|---------|
| 🟢 Good | >50% beds available |
| 🟡 Limited | 20-50% beds available |
| 🔴 Full | <20% beds available |

### Visit Types

| Type | Description |
|------|-------------|
| **OPD** | Outpatient — scheduled consultation |
| **Emergency** | Urgent care — walk-in |
