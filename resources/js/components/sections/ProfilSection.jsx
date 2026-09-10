import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
    Info, 
    Target, 
    Compass, 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Building, 
    ExternalLink, 
    Award, 
    CheckCircle2 
} from 'lucide-react';

export default function ProfilSection() {
    const { profil } = useApp();

    return (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>Profil Unit Pelaksana Teknis (UPT)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Mengenal lebih dekat peran dan tugas Stasiun Meteorologi BMKG di gerbang udara utama Kota Palu, Ibu Kota Provinsi Sulawesi Tengah.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    
                    {/* Left Column: Profil Identitas & Kontak */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo_BMKG_%28Badan_Meteorologi%2C_Klimatologi%2C_dan_Geofisika%29.png" 
                                    alt="Logo BMKG" 
                                    className="w-12 h-12 object-contain shrink-0 drop-shadow"
                                />
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                                        {profil?.nama_stasiun || 'BMKG Palu'}
                                    </h3>
                                    <p className="text-xs text-blue-700 font-semibold mt-0.5">
                                        Klasifikasi: {profil?.kelas || 'Stasiun Meteorologi Kelas II'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 text-xs text-slate-600">
                                <div className="flex items-start gap-2.5">
                                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Kode WMO Internasional</span>
                                        <strong className="text-slate-800 text-sm font-mono">{profil?.kode_wmo || '97180'}</strong>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Alamat Lengkap</span>
                                        <span className="text-slate-800 leading-relaxed">
                                            {profil?.alamat || 'Bandara Mutiara Sis Al-Jufri, Jl. Sis Al-Jufri No. 1, Kel. Tipo, Kota Palu, Sulteng 94228'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Compass className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Koordinat Geografis</span>
                                        <span className="text-slate-800 font-mono">
                                            Lat: {profil?.latitude || '-0.375833'}, Long: {profil?.longitude || '117.251944'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Phone className="w-4 h-4 text-purple-600 shrink-0" />
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Telepon / Call Center</span>
                                        <span className="text-slate-800 font-semibold">{profil?.telepon || '(0541) 7808001'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-rose-600 shrink-0" />
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Email Resmi</span>
                                        <span className="text-slate-800 font-semibold break-all">{profil?.email || 'stamet.samarinda@bmkg.go.id'}</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Clock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-slate-400 block text-[10px]">Jam Operasional Pengamatan</span>
                                        <span className="text-slate-800 font-semibold">
                                            {profil?.jam_operasional || '24 Jam Nonstop (Senin - Minggu)'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Peta Lokasi Button */}
                            <div className="pt-2">
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${profil?.latitude || -0.918133},${profil?.longitude || 119.909978}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs transition flex items-center justify-center gap-2 border border-blue-200"
                                >
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span>Buka Peta Lokasi Bandara Mutiara Sis Al-Jufri</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visi, Misi, Tugas & Fungsi */}
                    <div className="lg:col-span-7 space-y-6">
                        
                        {/* Visi */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Target className="w-5 h-5 text-blue-600" />
                                <span>Visi BMKG</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                "{profil?.visi || 'Mewujudkan BMKG yang handal, tanggap dan mampu dalam rangka mendukung keselamatan masyarakat serta keberhasilan pembangunan nasional, dan berperan aktif di tingkat Internasional.'}"
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                <span>Misi BMKG</span>
                            </h3>
                            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed space-y-2">
                                {profil?.misi || `1. Mengamati dan memahami fenomena meteorologi, klimatologi, kualitas udara dan geofisika.
2. Menyediakan data, informasi dan jasa meteorologi, klimatologi, kualitas udara dan geofisika yang handal dan terpercaya.
3. Mengkoordinasikan dan memfasilitasi kegiatan di bidang meteorologi, klimatologi, kualitas udara dan geofisika.
4. Berpartisipasi aktif dalam kegiatan internasional di bidang meteorologi, klimatologi, kualitas udara dan geofisika.`}
                            </div>
                        </div>

                        {/* Tugas Pokok & Fungsi */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <Building className="w-5 h-5 text-indigo-600" />
                                <span>Tugas Pokok & Fungsi Stasiun</span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-800 font-medium mb-3">
                                {profil?.tugas_pokok || 'Melaksanakan pengamatan, pengumpulan dan penyebaran data, pengolahan, analisa dan prakiraan dalam bidang meteorologi.'}
                            </p>
                            <div className="text-xs sm:text-sm text-slate-600 whitespace-pre-line leading-relaxed border-t border-slate-100 pt-3">
                                {profil?.fungsi || `1. Pengamatan unsur-unsur meteorologi permukaan dan aerologi.
2. Pengelolaan dan transmisi data sandi meteorologi.
3. Pelayanan jasa meteorologi untuk penerbangan sipil dan masyarakat umum.
4. Pemeliharaan dan kalibrasi peralatan instrumentasi meteorologi.`}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
