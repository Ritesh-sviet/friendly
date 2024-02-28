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
        Schema::table('preferences', function (Blueprint $table) {
            $table->string('weight')->default('Kg')->change();
            $table->string('height')->default('cm')->change();
            $table->string('blood_glucose')->default('mg/dl')->change();
            $table->string('cholestrol')->default('mg/dl')->change();
            $table->string('blood_pressure')->default('mmHg')->change();
            $table->string('distance')->default('km')->change();
            $table->boolean('system_emails')->default(false)->change();
            $table->boolean('member_service_emails')->default(true)->change();
            $table->boolean('sms')->default(true)->change();
            $table->boolean('phone_call')->default(false)->change();
            $table->boolean('post')->default(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('preferences', function (Blueprint $table) {
            //
        });
    }
};
