import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Clock, MapPin, ShieldAlert, CheckCircle2, CloudLightning } from 'lucide-react';
import { FALLBACK_PERINGATAN } from '../../services/api';

export default function PeringatanDiniSection() {
    const { berandaData } = useApp();

    const peringatan = berandaData?.peringatan || FALLBACK_PERINGATAN;
    const isAktif = peringatan?.tampilkan_di_web;

    const getLevelBadge = (level) => {
        switch (level?.toLowerCase()) {
            case 'awas':
                return 'bg-red-600 text-white border-red-700';
            case 'siaga':
                return 'bg-orange-500 text-white border-orange-600';
            case 'waspada':
            default:
                return 'bg-amber-500 text-slate-950 border-amber-600';
        }
    };

    return (
        <section className="py-12 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-2.5 border border-red-200">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Sistem Peringatan Dini Cuaca (Nowcasting BMKG)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Peringatan Dini Cuaca Ekstrem Sulawesi Tengah
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Pemberitahuan potensi cuaca signifikan (hujan lebat, angin kencang, kilat/petir) untuk mitigasi dini masyarakat dan instansi BPBD.
                    </p>
                </div>

                {/* Status Peringatan Box */}
                {isAktif ? (
                    <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-red-50 to-orange-50 border-2 border-red-300 p-6 sm:p-8 shadow-md mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-200/60 pb-5 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 animate-pulse">
                                    <CloudLightning className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-red-700">Status Saat Ini:</span>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                                        {peringatan.judul_peringatan}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${getLevelBadge(peringatan.level_bahaya)}`}>
                                    Level: {peringatan.level_bahaya || 'Waspada'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs sm:text-sm">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-red-200">
                                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block mb-1 text-red-900 flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-red-600" />
                                    Wilayah Berpotensi Terdampak:
                                </span>
                                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                                    {peringatan.deskripsi_wilayah}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-2">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span><strong>Masa Berlaku:</strong> {peringatan.berlaku_mulai} s/d {peringatan.berlaku_sampai}</span>
                                </div>
                                <span className="text-slate-500">
                                    Dikeluarkan oleh: Forecaster Stamet Kelas II Mutiara Sis Al-Jufri Palu
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-8 text-center mb-10">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-black text-emerald-950">
                            Tidak Ada Peringatan Dini Cuaca Ekstrem Aktif
                        </h3>
                        <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                            Kondisi dinamika atmosfer saat ini di wilayah Sulawesi Tengah terpantau aman dan tidak berpotensi menimbulkan cuaca ekstrem signifikan.
                        </p>
                    </div>
                )}

                {/* Himbauan Keselamatan Masyarakat */}
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                    <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-blue-600" />
                        <span>Himbauan Mitigasi Bagi Masyarakat:</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-700">
                        <div className="p-4 rounded-xl bg-white border border-slate-200">
                            <strong className="text-blue-900 block mb-1">1. Hindari Pohon & Reklame</strong>
                            Saat terjadi angin kencang disertai hujan, segera cari tempat berlindung yang kokoh dan jauhi pohon tua serta baliho besar.
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-slate-200">
                            <strong className="text-blue-900 block mb-1">2. Waspadai Luapan Air & Genangan</strong>
                            Waspadai kenaikan debit air sungai di bantaran Sungai Mahakam dan hindari melintasi jalanan yang tergenang banjir.
                        </div>
                        <div className="p-4 rounded-xl bg-white border border-slate-200">
                            <strong className="text-blue-900 block mb-1">3. Pantau Informasi Resmi</strong>
                            Hanya percaya pada kanal resmi BMKG dan hubungi pihak BPBD atau Damkar setempat saat terjadi kondisi darurat bencana.
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
