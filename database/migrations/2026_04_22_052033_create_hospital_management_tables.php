<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Specializations (Services)
        Schema::create('specializations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 2. Doctors (Specialists)
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('specialization_id')->nullable()->constrained('specializations')->nullOnDelete();
            $table->string('education', 100)->nullable(); // e.g., MD, DM
            $table->string('image')->nullable();
            $table->string('availability')->nullable(); // e.g., Mon-Sat 10AM-4PM
            $table->timestamps();
        });

        // 3. Testimonials
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('specialization_id')->nullable()->constrained('specializations')->cascadeOnDelete();
            $table->string('patient_name');
            $table->string('patient_type', 100)->nullable(); // e.g., cardiac, maternity
            $table->text('description');
            $table->string('profile_image')->nullable();
            $table->timestamps();
        });

        // 4. Contact Info
        Schema::create('contact_info', function (Blueprint $table) {
            $table->id();
            $table->text('address');
            $table->string('phone', 50);
            $table->string('email');
            $table->string('open_hours');
            $table->text('map_link')->nullable();
            $table->timestamps();
        });

        // 5. Appointments
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('phone', 50);
            $table->string('email')->nullable();
            $table->integer('age')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();
            $table->enum('visit_type', ['Emergency', 'OPD']);
            $table->foreignId('specialization_id')->nullable()->constrained('specializations')->nullOnDelete();
            $table->foreignId('doctor_id')->nullable()->constrained('doctors')->nullOnDelete();
            $table->date('preferred_date');
            $table->string('time_slot', 50);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // 6. Bed Availability
        Schema::create('bed_availability', function (Blueprint $table) {
            $table->id();
            $table->integer('total_beds');
            $table->integer('available_beds');
            $table->enum('status', ['Good', 'Limited', 'Full']);
            $table->timestamps(); // includes updated_at for tracking the last refresh
        });

        // 7. Health Packages
        Schema::create('health_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });

        // 8. Insurance & TPA Partners
        Schema::create('insurance_partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo')->nullable();
            $table->timestamps();
        });

        // 9. Blogs
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category', 100);
            $table->string('image')->nullable();
            $table->text('description');
            $table->string('read_time', 50)->nullable(); // e.g., '8 min read'
            $table->timestamps();
        });

        // 10. Gallery
        Schema::create('gallery', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->timestamps();
        });

        // 11. Careers (Renamed from Jobs to avoid conflict with Laravel's queue `jobs` table)
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('specialization', 100)->nullable();
            $table->string('title');
            $table->string('salary', 100)->nullable(); // Stored as string for ranges "50k-70k"
            $table->string('location');
            $table->enum('job_type', ['Full-time', 'Part-time', 'Contract']);
            $table->string('experience', 100)->nullable();
            $table->text('description');
            $table->timestamps();
        });

        // 12. Job Applications
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id')->constrained('careers')->cascadeOnDelete();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone', 50);
            $table->string('experience', 100)->nullable();
            $table->string('resume_url');
            $table->timestamps();
        });

        // 13. Admin (Separate from the default users table)
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('username', 100)->unique();
            $table->string('password'); // Laravel handles hashing via models/auth automatically
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop in reverse order to respect foreign key constraints
        Schema::dropIfExists('admins');
        Schema::dropIfExists('job_applications');
        Schema::dropIfExists('careers');
        Schema::dropIfExists('gallery');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('insurance_partners');
        Schema::dropIfExists('health_packages');
        Schema::dropIfExists('bed_availability');
        Schema::dropIfExists('appointments');
        Schema::dropIfExists('contact_info');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('doctors');
        Schema::dropIfExists('specializations');
    }
};