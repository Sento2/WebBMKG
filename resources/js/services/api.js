/**
 * API Service untuk Web BMKG Palu
 * Terhubung langsung ke API Laravel (/api/...) dengan fallback data realistis
 * untuk Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu, Sulawesi Tengah.
 */

const API_BASE = '/api';
const ADMIN_PREFIX = 'bmkg-portal-sulteng'; // Sesuai config/admin.php dan .env

// --- MOCK FALLBACK DATA JIKA DATABASE MASIH KOSONG / OFFLINE ---
export const FALLBACK_PROFIL = {
    nama_stasiun: 'BMKG Palu',
    nama_lengkap: 'Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu',
    kelas: 'Kelas II',
    kode_wmo: '97180',
    alamat: 'Bandara Mutiara Sis Al-Jufri, Jl. Sis Al-Jufri No. 1, Kel. Tipo, Kec. Ulujadi, Kota Palu, Sulawesi Tengah 94228',
    telepon: '(0451) 491059 / 0822-9262-9991',
    email: 'stamet.palu@bmkg.go.id',
    website: 'https://stamet-palu.bmkg.go.id',
    latitude: -0.918133,
    longitude: 119.909978,
    visi: 'Mewujudkan BMKG yang handal, tanggap dan mampu dalam rangka mendukung keselamatan masyarakat serta keberhasilan pembangunan nasional, dan berperan aktif di tingkat Internasional.',
    misi: `1. Mengamati dan memahami fenomena meteorologi, klimatologi, kualitas udara dan geofisika secara berkelanjutan.\n2. Menyediakan data, informasi dan jasa meteorologi, klimatologi, kualitas udara dan geofisika yang cepat, tepat, dan terpercaya.\n3. Mengkoordinasikan dan memfasilitasi kegiatan di bidang meteorologi, klimatologi, kualitas udara dan geofisika di Sulawesi Tengah.\n4. Berpartisipasi aktif dalam mitigasi bencana hidrometeorologi dan gempa bumi di wilayah Sulawesi Tengah.`,
    tugas_pokok: 'Melaksanakan pengamatan, pengumpulan dan penyebaran data, pengolahan, analisa dan prakiraan cuaca serta pelayanan jasa meteorologi bagi penerbangan dan masyarakat umum di wilayah Sulawesi Tengah.',
    fungsi: `1. Pengamatan unsur-unsur meteorologi permukaan dan penerbangan 24 jam.\n2. Pengolahan, validasi, dan penyebaran data sandi meteorologi (METAR, SPECI, TAF).\n3. Pelayanan jasa meteorologi publik, maritim, dan penerbangan sipil.\n4. Pemberian peringatan dini cuaca ekstrem di wilayah Sulawesi Tengah.\n5. Pemeliharaan dan kalibrasi peralatan instrumentasi meteorologi otomatis (AWOS).`,
    jam_operasional: 'Senin - Minggu: 24 Jam (Operasional Meteorologi & Penerbangan)',
    sosial_media: {
        instagram: 'https://instagram.com/bmkg_palu',
        facebook: 'https://facebook.com/bmkgpalu',
        youtube: 'https://youtube.com/@bmkg.sulteng',
    }
};

export const FALLBACK_PERINGATAN = {
    id: 1,
    level_bahaya: 'Waspada',
    judul_peringatan: 'Peringatan Dini Cuaca Sulawesi Tengah',
    deskripsi_wilayah: 'Berpotensi terjadi Hujan Sedang-Lebat yang dapat disertai Kilat/Petir dan Angin Kencang di wilayah Kota Palu (Palu Selatan, Palu Timur), Kab. Sigi (Sigi Biromaru, Palolo), Kab. Donggala (Banawa, Banawa Tengah) dan sekitarnya.',
    berlaku_mulai: '2026-09-07 11:00 WITA',
    berlaku_sampai: '2026-09-07 17:00 WITA',
    tampilkan_di_web: true,
};

export const FALLBACK_CUACA_PENERBANGAN = [
    {
        id: 1,
        nama_bandara: 'Bandara Mutiara Sis Al-Jufri Palu (WAML / PLW)',
        waktu_pengamatan: '07 Sep 2026, 11:00 WITA',
        arah_kecepatan_angin: '300° / 06 knot (Barat Laut)',
        jarak_pandang: '9.000 meter (9 km)',
        kondisi_cuaca: 'Cerah Berawan (Few Clouds 2000ft)',
        suhu: 33,
        titik_embun: 22,
        tekanan_udara: 1009,
    },
    {
        id: 2,
        nama_bandara: 'Bandara Syukuran Aminuddin Amir Luwuk (WAMW / LUW)',
        waktu_pengamatan: '07 Sep 2026, 11:00 WITA',
        arah_kecepatan_angin: '090° / 08 knot (Timur)',
        jarak_pandang: '8.000 meter (8 km)',
        kondisi_cuaca: 'Berawan Sebagian',
        suhu: 30,
        titik_embun: 24,
        tekanan_udara: 1011,
    },
    {
        id: 3,
        nama_bandara: 'Bandara Kasiguncu Poso (WAMP / PSJ)',
        waktu_pengamatan: '07 Sep 2026, 10:30 WITA',
        arah_kecepatan_angin: '180° / 05 knot (Selatan)',
        jarak_pandang: '7.000 meter (7 km)',
        kondisi_cuaca: 'Hujan Ringan Lokal',
        suhu: 29,
        titik_embun: 24,
        tekanan_udara: 1010,
    }
];

export const FALLBACK_CUACA_MARITIM = [
    {
        id: 1,
        wilayah_perairan: 'Teluk Palu dan Sekitarnya',
        waktu_berlaku_mulai: '2026-09-07 08:00 WITA',
        waktu_berlaku_sampai: '2026-09-07 20:00 WITA',
        kondisi_cuaca: 'Cerah Berawan',
        arah_angin: 'Barat Laut - Utara',
        angin_min: 5,
        angin_max: 12,
        gelombang_min: 0.25,
        gelombang_max: 0.75,
        kategori_gelombang: 'Tenang',
        peringatan_risiko: 'Aman untuk semua jenis kapal. Tetap waspadai angin kencang lokal di sekitar kawasan pegunungan.',
    },
    {
        id: 2,
        wilayah_perairan: 'Selat Makassar (Perairan Donggala - Mamuju)',
        waktu_berlaku_mulai: '2026-09-07 08:00 WITA',
        waktu_berlaku_sampai: '2026-09-07 20:00 WITA',
        kondisi_cuaca: 'Berawan Tebal',
        arah_angin: 'Selatan - Tenggara',
        angin_min: 10,
        angin_max: 22,
        gelombang_min: 1.0,
        gelombang_max: 2.5,
        kategori_gelombang: 'Sedang',
        peringatan_risiko: 'Harap diperhatikan risiko keselamatan pelayaran bagi: Perahu Nelayan, Kapal Feri antar pulau.',
    },
    {
        id: 3,
        wilayah_perairan: 'Perairan Tojo Una-Una & Kepulauan Togian',
        waktu_berlaku_mulai: '2026-09-07 08:00 WITA',
        waktu_berlaku_sampai: '2026-09-07 20:00 WITA',
        kondisi_cuaca: 'Hujan Ringan',
        arah_angin: 'Timur Laut - Timur',
        angin_min: 8,
        angin_max: 18,
        gelombang_min: 0.5,
        gelombang_max: 1.5,
        kategori_gelombang: 'Rendah',
        peringatan_risiko: 'Waspadai gelombang sedang di sekitar Kepulauan Togian. Hati-hati bagi perahu kecil dan nelayan.',
    },
    {
        id: 4,
        wilayah_perairan: 'Perairan Banggai & Laut Banda Barat',
        waktu_berlaku_mulai: '2026-09-07 08:00 WITA',
        waktu_berlaku_sampai: '2026-09-07 20:00 WITA',
        kondisi_cuaca: 'Berawan',
        arah_angin: 'Barat - Barat Daya',
        angin_min: 12,
        angin_max: 25,
        gelombang_min: 1.5,
        gelombang_max: 3.0,
        kategori_gelombang: 'Tinggi',
        peringatan_risiko: 'BERBAHAYA untuk Perahu Nelayan dan Kapal Tongkang. Gelombang tinggi berpotensi di Laut Banda Barat.',
    }
];

export const FALLBACK_PRAKIRAAN_CUACA = [
    {
        id: 1,
        wilayah: 'Palu (Mutiara Sis Al-Jufri)',
        waktu_prakiraan: '2026-09-07 12:00:00',
        kondisi: 'Cerah Berawan',
        ikon_cuaca: 'https://api.bmkg.go.id/storage/images/icon/cuaca/cerah-berawan-am.png',
        suhu: 34,
        kelembapan: 65,
        arah_kecepatan_angin: 'Barat Laut, 10 km/jam',
    },
    {
        id: 2,
        wilayah: 'Donggala',
        waktu_prakiraan: '2026-09-07 12:00:00',
        kondisi: 'Berawan',
        ikon_cuaca: 'https://api.bmkg.go.id/storage/images/icon/cuaca/berawan-am.png',
        suhu: 31,
        kelembapan: 72,
        arah_kecepatan_angin: 'Barat, 8 km/jam',
    },
    {
        id: 3,
        wilayah: 'Sigi Biromaru',
        waktu_prakiraan: '2026-09-07 12:00:00',
        kondisi: 'Hujan Ringan',
        ikon_cuaca: 'https://api.bmkg.go.id/storage/images/icon/cuaca/hujan-ringan-am.png',
        suhu: 28,
        kelembapan: 85,
        arah_kecepatan_angin: 'Selatan, 12 km/jam',
    },
    {
        id: 4,
        wilayah: 'Poso',
        waktu_prakiraan: '2026-09-07 12:00:00',
        kondisi: 'Berawan',
        ikon_cuaca: 'https://api.bmkg.go.id/storage/images/icon/cuaca/berawan-am.png',
        suhu: 30,
        kelembapan: 78,
        arah_kecepatan_angin: 'Tenggara, 9 km/jam',
    },
    {
        id: 5,
        wilayah: 'Luwuk (Banggai)',
        waktu_prakiraan: '2026-09-07 12:00:00',
        kondisi: 'Hujan Petir',
        ikon_cuaca: 'https://api.bmkg.go.id/storage/images/icon/cuaca/hujan-petir-am.png',
        suhu: 27,
        kelembapan: 90,
        arah_kecepatan_angin: 'Timur, 15 km/jam',
    },
    {
        id: 6,
        wilayah: 'Toli-Toli',
        waktu_prakiraan: '2026-09-07 12:00:00',
        kondisi: 'Cerah',
        ikon_cuaca: 'https://api.bmkg.go.id/storage/images/icon/cuaca/cerah-am.png',
        suhu: 32,
        kelembapan: 68,
        arah_kecepatan_angin: 'Utara, 11 km/jam',
    }
];

export const FALLBACK_BERITA = [
    {
        id: 1,
        judul: 'Sosialisasi Cuaca Penerbangan dan Keselamatan Transportasi Udara di Bandara Mutiara Sis Al-Jufri Palu',
        slug: 'sosialisasi-cuaca-penerbangan-mutiara-palu',
        thumbnail_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
        konten: 'Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu menggelar sosialisasi pemanfaatan informasi radar cuaca dan METAR kepada maskapai penerbangan dan operator bandara guna meningkatkan keselamatan penerbangan sipil menjelang musim peralihan di Sulawesi Tengah.',
        status: 'published',
        published_at: '05 September 2026',
    },
    {
        id: 2,
        judul: 'Prakiraan Musim Hujan Wilayah Sulawesi Tengah dan Antisipasi Bencana Hidrometeorologi',
        slug: 'prakiraan-musim-hujan-sulteng',
        thumbnail_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
        konten: 'BMKG Palu merilis analisis iklim dan prakiraan awal musim hujan di wilayah Sulawesi Tengah, mengingatkan pemerintah daerah dan masyarakat untuk mengantisipasi potensi banjir dan longsor mengingat kondisi topografi wilayah Sulteng yang berbukit.',
        status: 'published',
        published_at: '03 September 2026',
    },
    {
        id: 3,
        judul: 'Layanan Data Informasi Meteorologi Gratis (Tarif Rp0) untuk Riset Skripsi Mahasiswa Sulteng',
        slug: 'layanan-data-meteorologi-gratis-ptsp-mahasiswa-sulteng',
        thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        konten: 'Sesuai PP No. 47 Tahun 2018, BMKG Palu membuka akses permohonan data cuaca historis, curah hujan, dan klimatologi bertarif Rp0 melalui layanan Pelayanan Terpadu Satu Pintu (PTSP) online khusus untuk keperluan tugas akhir pendidikan mahasiswa di Sulawesi Tengah.',
        status: 'published',
        published_at: '01 September 2026',
    }
];

// --- FUNGSI PANGGILAN API PUBLIK ---

export async function fetchBeranda() {
    try {
        const res = await fetch(`${API_BASE}/beranda`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.data || {};
    } catch (err) {
        console.warn('API Beranda offline / error, menggunakan data fallback:', err.message);
        return {
            peringatan: FALLBACK_PERINGATAN,
            berita_terbaru: FALLBACK_BERITA,
            cuaca_hari_ini: FALLBACK_PRAKIRAAN_CUACA,
        };
    }
}

export async function fetchProfil() {
    try {
        const res = await fetch(`${API_BASE}/profil`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.data || FALLBACK_PROFIL;
    } catch (err) {
        console.warn('API Profil offline / error, menggunakan data fallback:', err.message);
        return FALLBACK_PROFIL;
    }
}

export async function fetchCuacaPenerbangan() {
    try {
        const res = await fetch(`${API_BASE}/cuaca-penerbangan`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = json.data || [];
        return data.length > 0 ? data : FALLBACK_CUACA_PENERBANGAN;
    } catch (err) {
        console.warn('API Penerbangan offline / error, menggunakan data fallback:', err.message);
        return FALLBACK_CUACA_PENERBANGAN;
    }
}

export async function fetchCuacaMaritim() {
    try {
        const res = await fetch(`${API_BASE}/cuaca-maritim`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = json.data || [];
        return data.length > 0 ? data : FALLBACK_CUACA_MARITIM;
    } catch (err) {
        console.warn('API Maritim offline / error, menggunakan data fallback:', err.message);
        return FALLBACK_CUACA_MARITIM;
    }
}

export async function fetchCitraSatelit() {
    try {
        const res = await fetch(`${API_BASE}/citra-satelit`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return json.data || null;
    } catch (err) {
        console.warn('API Citra Satelit error, menggunakan struktur fallback:', err.message);
        return {
            produk: {
                enhanced_ir: {
                    nama: 'Enhanced IR (Infrared)',
                    deskripsi: 'Citra suhu puncak awan untuk mendeteksi awan Cumulonimbus (Cb) dan potensi cuaca buruk.',
                    wilayah: {
                        indonesia: {
                            nama: 'Indonesia',
                            url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_EIR_Indonesia.png'
                        },
                        sulawesi: {
                            nama: 'Sulawesi & Selat Makassar',
                            url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_EIR_Sulawesi.png'
                        }
                    }
                },
                visible: {
                    nama: 'Visible (VIS)',
                    deskripsi: 'Citra tutupan awan visual pada siang hari memperlihatkan distribusi awan secara detail.',
                    wilayah: {
                        indonesia: {
                            nama: 'Indonesia',
                            url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_VIS_Indonesia.png'
                        },
                        sulawesi: {
                            nama: 'Sulawesi & Selat Makassar',
                            url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_VIS_Sulawesi.png'
                        }
                    }
                },
                rainfall_potential: {
                    nama: 'Potential Rainfall',
                    deskripsi: 'Estimasi potensi curah hujan berdasarkan analisis suhu puncak awan satelit Himawari-9.',
                    wilayah: {
                        indonesia: {
                            nama: 'Indonesia',
                            url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_RP_Indonesia.png'
                        }
                    }
                }
            },
            terakhir_update: 'Real-time Satelit Himawari-9',
            sumber: 'BMKG Pusat - Satelit Geostasioner Himawari-9'
        };
    }
}

export async function submitPtspForm(formData) {
    try {
        const res = await fetch(`${API_BASE}/layanan-ptsp/kirim`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            }
        });

        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message || 'Gagal mengirim permohonan');
        }
        return json;
    } catch (err) {
        // Jika server Laravel lokal belum jalan, simulasi nomor tiket
        console.warn('Submit PTSP gagal:', err.message);
        throw err;
    }
}

// --- FUNGSI API ADMIN (DILINDUNGI TOKEN) ---

export async function checkAdminAuth(token) {
    const res = await fetch(`${API_BASE}/${ADMIN_PREFIX}/auth-check`, {
        headers: {
            'X-Admin-Token': token,
            'Accept': 'application/json',
        }
    });
    return res.ok;
}

export async function fetchAdminDashboard(token) {
    const res = await fetch(`${API_BASE}/${ADMIN_PREFIX}/dashboard`, {
        headers: {
            'X-Admin-Token': token,
            'Accept': 'application/json',
        }
    });
    if (!res.ok) throw new Error('Akses ditolak atau token tidak valid');
    return await res.json();
}

export async function fetchAdminPtsp(token) {
    const res = await fetch(`${API_BASE}/${ADMIN_PREFIX}/layanan-ptsp`, {
        headers: {
            'X-Admin-Token': token,
            'Accept': 'application/json',
        }
    });
    if (!res.ok) throw new Error('Gagal mengambil data permohonan PTSP');
    return await res.json();
}

export async function updateAdminPtspStatus(token, id, status) {
    const res = await fetch(`${API_BASE}/${ADMIN_PREFIX}/layanan-ptsp/${id}/status`, {
        method: 'PATCH',
        headers: {
            'X-Admin-Token': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ status_permohonan: status })
    });
    if (!res.ok) throw new Error('Gagal memperbarui status permohonan');
    return await res.json();
}

export async function updateAdminPeringatan(token, payload) {
    const res = await fetch(`${API_BASE}/${ADMIN_PREFIX}/peringatan-dini/update`, {
        method: 'POST',
        headers: {
            'X-Admin-Token': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Gagal mengupdate peringatan dini');
    return await res.json();
}
