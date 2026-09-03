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
        Schema::create('cuaca_maritims', function (Blueprint $table) {
            $table->id();
            $table->string('wilayah_perairan'); // Misal: "Perairan Manado - Bitung"
            $table->dateTime('waktu_berlaku_mulai');
            $table->dateTime('waktu_berlaku_sampai');
            $table->string('kondisi_cuaca'); // Misal: "Hujan Sedang"
            $table->string('arah_angin'); // Misal: "Selatan - Barat Daya"
            $table->integer('angin_min'); // Knots
            $table->integer('angin_max'); // Knots
            $table->decimal('gelombang_min', 4, 2); // Meter, misal: 1.25
            $table->decimal('gelombang_max', 4, 2); // Meter, misal: 2.50

            // Kolom ini akan diisi otomatis oleh algoritma di Controller
            $table->string('kategori_gelombang')->nullable();
            $table->text('peringatan_risiko')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuaca_maritims');
    }
};
