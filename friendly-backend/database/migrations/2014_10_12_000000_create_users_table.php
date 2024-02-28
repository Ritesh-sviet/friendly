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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone_number')->unique();
            $table->string('password');
            $table->tinyInteger('status'); 
            $table->timestamps(); // Creates created_at and updated_at columns
            $table->softDeletes(); // Adds deleted_at column for soft deletion
            $table->boolean('is_deleted')->default(false); //Adds a boolean column for soft deletion, defaulting to 'false' (not deleted).
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};