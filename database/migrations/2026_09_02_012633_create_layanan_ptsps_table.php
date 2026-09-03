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
        Schema::create('layanan_ptsps', function (Blueprint $table) {
            $table->id();
            $table->string('kode_tiket')->unique();
            $table->string('nama_lengkap');
            $table->string('email_whatsapp');
            $table->string('asal_instansi_universitas');
            $table->text('keperluan_data');
            $table->string('file_ktp_surat');
            $table->enum('status_permohonan', ['menunggu', 'diproses', 'selesai'])->default('menunggu');
            $table->string('file_balasan_admin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanan_ptsps');
    }
};
