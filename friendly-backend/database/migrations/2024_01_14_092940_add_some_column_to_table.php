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
        Schema::table('users', function (Blueprint $table) {
            // social security number
            $table->string('social_security_number')->nullable();
            // address one
            $table->string('address_one')->nullable();
            // address two
            $table->string('address_two')->nullable();
            // city
            $table->string('city')->nullable();
            // state
            $table->string('state')->nullable();
            // Zip code
            $table->string('zip_code')->nullable();
            // DOB
            $table->date('date_of_birth')->nullable();
            // Gender
            $table->string('gender')->nullable();
            // Martial Status
            $table->string('martial_status')->nullable();
            // social media
            $table->string('social_media')->nullable();
            // kids 
            $table->string('kids')->nullable();
            // profile Photo
            $table->string('profile_photo')->nullable();
            //username
            $table->string('username')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};