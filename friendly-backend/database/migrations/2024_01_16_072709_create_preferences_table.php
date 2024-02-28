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
        Schema::create('preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Foreign key referencing the 'id' column in 'users' table
            $table->string('language');
            $table->time('breakfast');
            $table->time('lunch');
            $table->time('dinner');
            $table->time('wake_time');
            $table->time('bed_time');
            $table->boolean('weight');
            $table->boolean('height');
            $table->boolean('blood_glucose');
            $table->boolean('cholestrol');
            $table->boolean('blood_pressure');
            $table->boolean('distance');
            $table->boolean('system_emails');
            $table->boolean('member_service_emails');
            $table->boolean('sms');
            $table->boolean('phone_call');
            $table->boolean('post');
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
        Schema::dropIfExists('preferences');
    }
};
