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
