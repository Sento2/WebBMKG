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
        Schema::create('peringatan_dinis', function (Blueprint $table) {
            $table->id();
            $table->enum('level_bahaya', ['waspada', 'siaga', 'awas']);
            $table->string('judul_peringatan');
            $table->text('deskripsi_wilayah');
            $table->dateTime('berlaku_mulai')->nullable();
            $table->dateTime('berlaku_sampai')->nullable();
            $table->boolean('tampilkan_di_web')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peringatan_dinis');
    }
};
