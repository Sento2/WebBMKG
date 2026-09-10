import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
    const { profil, setActiveTab, setIsAdminOpen } = useApp();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Column 1: Identitas Stasiun */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img 
                                src="/images/logo-bmkg.png" 
                                alt="Logo BMKG" 
                                className="w-10 h-10 object-contain drop-shadow"
                            />
                            <div>
                                <h3 className="text-white font-bold text-sm tracking-tight leading-tight">
                                    BMKG Palu
                                </h3>
                                <p className="text-[11px] text-slate-400">
                                    Stamet Kelas II Mutiara Sis Al-Jufri
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Unit Pelaksana Teknis Badan Meteorologi, Klimatologi, dan Geofisika yang bertugas melaksanakan pengamatan, pengelolaan data, dan pelayanan jasa meteorologi untuk penerbangan dan publik di Sulawesi Tengah.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            {profil?.sosial_media?.instagram && (
                                <a 
                                    href={profil.sosial_media.instagram} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition text-xs font-semibold"
                                    title="Instagram BMKG Palu"
                                >
                                    IG
                                </a>
                            )}
                            {profil?.sosial_media?.facebook && (
                                <a 
                                    href={profil.sosial_media.facebook} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition text-xs font-semibold"
                                    title="Facebook BMKG Palu"
                                >
                                    FB
                                </a>
                            )}
                            {profil?.sosial_media?.youtube && (
                                <a 
                                    href={profil.sosial_media.youtube} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition text-xs font-semibold"
                                    title="YouTube BMKG Sulteng"
                                >
                                    YT
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Column 2: Layanan & Navigasi Cepat */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-blue-500 pl-2.5">
                            Layanan Informasi
                        </h4>
                        <ul className="space-y-2 text-xs">
                            <li>
                                <button 
                                    onClick={() => setActiveTab('cuaca')}
                                    className="hover:text-blue-400 transition flex items-center gap-1.5"
                                >
                                    <span>• Prakiraan Cuaca Kecamatan</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveTab('penerbangan')}
                                    className="hover:text-blue-400 transition flex items-center gap-1.5"
                                >
                                    <span>• Cuaca Penerbangan (METAR Bandara)</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveTab('maritim')}
                                    className="hover:text-blue-400 transition flex items-center gap-1.5"
                                >
                                    <span>• Cuaca Maritim & Gelombang Laut</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveTab('satelit')}
                                    className="hover:text-blue-400 transition flex items-center gap-1.5"
                                >
                                    <span>• Citra Satelit Cuaca Himawari-9</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveTab('ptsp')}
                                    className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1.5 font-semibold"
                                >
                                    <span>• Permohonan Data PTSP (Tarif Rp0 Riset)</span>
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => setActiveTab('peringatan')}
                                    className="hover:text-red-400 transition flex items-center gap-1.5"
                                >
                                    <span>• Peringatan Dini Cuaca Ekstrem</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Tautan Terkait Pemerintah & BMKG */}
                    <div>
                        <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-blue-500 pl-2.5">
                            Tautan Resmi Terkait
                        </h4>
                        <ul className="space-y-2.5 text-xs text-slate-400">
                            <li>
                                <a 
                                    href="https://www.bmkg.go.id" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="hover:text-blue-400 flex items-center gap-1.5 transition"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                    <span>BMKG Pusat Jakarta</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://inatews.bmkg.go.id" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="hover:text-blue-400 flex items-center gap-1.5 transition"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Indonesia Tsunami Early Warning (InaTEWS)</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://maritim.bmkg.go.id" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="hover:text-blue-400 flex items-center gap-1.5 transition"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Pusat Meteorologi Maritim BMKG</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://sultengprov.go.id" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="hover:text-blue-400 flex items-center gap-1.5 transition"
                                >
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Pemerintah Provinsi Sulawesi Tengah</span>
                                </a>
                            </li>
                            <li className="pt-2">
                                <button
                                    onClick={() => setIsAdminOpen(true)}
                                    className="text-slate-500 hover:text-slate-300 text-[11px] underline flex items-center gap-1"
                                >
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>Portal Masuk Staf BMKG</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Kontak Kantor Operasional */}
                    <div className="space-y-3">
                        <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-blue-500 pl-2.5">
                            Kontak & Lokasi Kantor
                        </h4>
                        <div className="text-xs text-slate-400 space-y-2.5">
                            <div className="flex items-start gap-2.5">
                                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    {profil?.alamat || 'Bandara Mutiara Sis Al-Jufri, Jl. Sis Al-Jufri No. 1, Kel. Tipo, Kota Palu, Sulteng 94228'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{profil?.telepon || '(0451) 491059'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                                <span className="break-all">{profil?.email || 'stamet.palu@bmkg.go.id'}</span>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                <span>{profil?.jam_operasional || '24 Jam Setiap Hari (Penerbangan & Pengamatan)'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
                    <p>
                        © {new Date().getFullYear()} Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu. Hak Cipta Dilindungi Undang-Undang.
                    </p>
                    <p className="flex items-center gap-1 text-slate-400">
                        Cepat, Tepat, Akurat, Mudah Dipahami, dan Terpercaya
                    </p>
                </div>
            </div>
        </footer>
    );
}
