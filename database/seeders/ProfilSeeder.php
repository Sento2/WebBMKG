<?php

namespace Database\Seeders;

use App\Models\Profil;
use Illuminate\Database\Seeder;

class ProfilSeeder extends Seeder
{
    public function run(): void
    {
        Profil::updateOrCreate(
            ['id' => 1],
            [
                'nama_stasiun' => 'BMKG Samarinda',
                'nama_lengkap' => 'Stasiun Meteorologi Kelas II Aji Pangeran Tumenggung Pranoto Samarinda',
                'kelas' => 'Kelas II',
                'kode_wmo' => '96665',
                'alamat' => 'Bandara APT Pranoto, Sungai Siring, Kec. Samarinda Utara, Kota Samarinda, Kalimantan Timur 75116',
                'telepon' => '(0541) XXXXXX',
                'email' => 'stamet.aptpranoto@bmkg.go.id',
                'website' => 'https://stamet-samarinda.bmkg.go.id',
                'latitude' => -0.375833,
                'longitude' => 117.251944,
                'visi' => 'Mewujudkan BMKG yang handal, tanggap dan mampu dalam rangka mendukung keselamatan masyarakat serta keberhasilan pembangunan nasional, dan berperan aktif di tingkat Internasional.',
                'misi' => "1. Mengamati dan memahami fenomena meteorologi, klimatologi, kualitas udara dan geofisika.\n2. Menyediakan data, informasi dan jasa meteorologi, klimatologi, kualitas udara dan geofisika yang handal dan terpercaya.\n3. Mengkoordinasikan dan memfasilitasi kegiatan di bidang meteorologi, klimatologi, kualitas udara dan geofisika.\n4. Berpartisipasi aktif dalam kegiatan internasional di bidang meteorologi, klimatologi, kualitas udara dan geofisika.",
                'tugas_pokok' => 'Melaksanakan pengamatan, pengumpulan dan penyebaran data, pengolahan, analisa dan prakiraan dalam bidang meteorologi.',
                'fungsi' => "1. Pengamatan unsur-unsur meteorologi.\n2. Pengelolaan data meteorologi.\n3. Pelayanan jasa meteorologi untuk penerbangan dan masyarakat umum.\n4. Pemeliharaan alat meteorologi.",
                'jam_operasional' => 'Senin - Minggu: 24 Jam (Operasional Penerbangan)',
                'sosial_media' => [
                    'instagram' => 'https://instagram.com/bmkg_samarinda',
                    'facebook' => 'https://facebook.com/bmkgsamarinda',
                    'youtube' => 'https://youtube.com/c/bmkgsamarinda',
                ],
            ]
        );
    }
}
