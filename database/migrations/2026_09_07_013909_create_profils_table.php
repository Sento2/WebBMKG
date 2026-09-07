<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils', function (Blueprint $table) {
            $table->id();

            // Identitas Stasiun
            $table->string('nama_stasiun');
            $table->string('nama_lengkap')->nullable();
            $table->string('kelas')->nullable();
            $table->string('kode_wmo')->nullable();

            // Alamat & Kontak
            $table->text('alamat');
            $table->string('telepon')->nullable();
            $table->string('fax')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // Visi & Misi
            $table->text('visi');
            $table->text('misi');

            // Tugas & Fungsi
            $table->text('tugas_pokok');
            $table->text('fungsi');

            // Info Tambahan
            $table->text('sejarah_singkat')->nullable();
            $table->string('foto_kantor')->nullable();
            $table->string('jam_operasional')->nullable();
            $table->json('sosial_media')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils');
    }
};
