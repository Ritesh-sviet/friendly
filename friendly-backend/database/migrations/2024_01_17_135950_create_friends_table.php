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
        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('name');
            $table->string('email');
            $table->longText('message');
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
        Schema::dropIfExists('friends');
    }
};
