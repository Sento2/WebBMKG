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
        Schema::create('cuaca_penerbangans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_bandara'); // Misal: "Bandara Mutiara SIS Al-Jufrie"
            $table->dateTime('waktu_pengamatan');
            $table->string('arah_kecepatan_angin'); // Misal: "Timur, 10 Knots"
            $table->integer('jarak_pandang'); // Visibility dalam meter (misal: 8000)
            $table->string('kondisi_cuaca'); // Misal: "Berawan", "Hujan Ringan"
            $table->integer('suhu'); // Celcius
            $table->integer('titik_embun'); // Dew point
            $table->integer('tekanan_udara'); // QNH dalam hPa
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuaca_penerbangans');
    }
};
