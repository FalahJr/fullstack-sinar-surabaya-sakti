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
        Schema::create('company_profiles', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('name')->default('PT. Sinar Surabayasakti');
            $blueprint->text('address')->nullable();
            $blueprint->string('phone')->nullable();
            $blueprint->string('email')->nullable();
            $blueprint->string('whatsapp_number')->nullable();
            $blueprint->text('google_maps_iframe')->nullable();
            $blueprint->string('logo_path')->nullable();
            $blueprint->text('about_us')->nullable();
            $blueprint->text('vision')->nullable();
            $blueprint->text('mission')->nullable();
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};
