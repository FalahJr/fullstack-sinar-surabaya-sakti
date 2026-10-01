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
        Schema::create('products', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->foreignId('category_id')->constrained('product_categories')->onDelete('cascade');
            $blueprint->string('name');
            $blueprint->string('slug')->unique();
            $blueprint->string('sku')->nullable();
            $blueprint->text('description')->nullable();
            $blueprint->string('image_path')->nullable();
            $blueprint->string('datasheet_path')->nullable();
            $blueprint->boolean('is_featured')->default(false);
            $blueprint->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
