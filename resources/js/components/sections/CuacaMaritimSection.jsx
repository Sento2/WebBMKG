import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
    Ship, 
    Waves, 
    Wind, 
    AlertTriangle, 
    Compass, 
    Calendar, 
    Anchor, 
    ShieldAlert, 
    ShieldCheck 
} from 'lucide-react';
import { FALLBACK_CUACA_MARITIM } from '../../services/api';

export default function CuacaMaritimSection() {
    const { cuacaMaritim } = useApp();

    const dataList = cuacaMaritim?.length > 0 
        ? cuacaMaritim 
        : FALLBACK_CUACA_MARITIM;

    const getWaveBadgeColor = (kategori) => {
        switch (kategori?.toLowerCase()) {
            case 'tenang':
                return 'bg-emerald-100 text-emerald-800 border-emerald-300';
            case 'rendah':
                return 'bg-cyan-100 text-cyan-800 border-cyan-300';
            case 'sedang':
                return 'bg-amber-100 text-amber-800 border-amber-300';
            case 'tinggi':
                return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'sangat tinggi':
            case 'ekstrem':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-slate-100 text-slate-800 border-slate-300';
        }
    };

    return (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-2.5 border border-cyan-200">
                        <Ship className="w-3.5 h-3.5" />
                        <span>Meteorologi Maritim & Pelayaran</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Prakiraan Cuaca Perairan & Tinggi Gelombang Laut
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Informasi tinggi gelombang laut dan peringatan keselamatan pelayaran di wilayah perairan Sulawesi Tengah, Teluk Palu, dan Selat Makassar sesuai standar keselamatan BMKG.
                    </p>
                </div>

                {/* Legend Kategori Gelombang BMKG */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Waves className="w-4 h-4 text-cyan-600" />
                        <span>Standar Klasifikasi Gelombang Laut BMKG</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                            <span className="font-bold block">Tenang</span>
                            <span className="text-[11px] text-emerald-700">0.0 - 0.5 m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900">
                            <span className="font-bold block">Rendah</span>
                            <span className="text-[11px] text-cyan-700">0.5 - 1.25 m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                            <span className="font-bold block">Sedang</span>
                            <span className="text-[11px] text-amber-700">1.25 - 2.50 m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-900">
                            <span className="font-bold block">Tinggi</span>
                            <span className="text-[11px] text-orange-700">2.50 - 4.00 m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                            <span className="font-bold block">Sangat Tinggi</span>
                            <span className="text-[11px] text-rose-700">4.00 - 6.00 m</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900">
                            <span className="font-bold block">Ekstrem</span>
                            <span className="text-[11px] text-purple-700">&gt; 6.00 m</span>
                        </div>
                    </div>
                </div>

                {/* Perairan Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {dataList.map((item, idx) => (
                        <div 
                            key={item.id || idx}
                            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                        >
                            <div>
                                {/* Header Card */}
                                <div className="border-b border-slate-100 pb-3 mb-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-bold text-base text-slate-900 leading-snug">
                                            {item.wilayah_perairan}
                                        </h4>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border shrink-0 ${getWaveBadgeColor(item.kategori_gelombang)}`}>
                                            {item.kategori_gelombang}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 text-slate-400" />
                                        <span>Berlaku: {item.waktu_berlaku_mulai} s/d {item.waktu_berlaku_sampai}</span>
                                    </p>
                                </div>

                                {/* Wave Height Display */}
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                                            <Waves className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 font-medium block">Tinggi Gelombang</span>
                                            <span className="text-xl font-black text-slate-900">
                                                {item.gelombang_min} - {item.gelombang_max} <span className="text-sm font-semibold text-slate-600">meter</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Parameters: Cuaca & Angin */}
                                <div className="space-y-2 text-xs mb-4">
                                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500">Kondisi Cuaca:</span>
                                        <span className="font-semibold text-slate-800">{item.kondisi_cuaca}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500">Arah Angin:</span>
                                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                                            <Compass className="w-3.5 h-3.5 text-blue-600" />
                                            <span>{item.arah_angin}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                                        <span className="text-slate-500">Kecepatan Angin:</span>
                                        <span className="font-semibold text-slate-800">
                                            {item.angin_min} - {item.angin_max} knot
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Advisory Box */}
                            <div className="pt-3 border-t border-slate-100">
                                <div className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                                    item.kategori_gelombang === 'Tenang' || item.kategori_gelombang === 'Rendah'
                                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                                        : 'bg-amber-50 border border-amber-200 text-amber-900'
                                }`}>
                                    {item.kategori_gelombang === 'Tenang' || item.kategori_gelombang === 'Rendah' ? (
                                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    ) : (
                                        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    )}
                                    <p className="leading-relaxed">
                                        <strong>Risiko Keselamatan:</strong> {item.peringatan_risiko}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Guidelines Note */}
                <div className="mt-8 bg-blue-50/70 rounded-2xl p-5 border border-blue-200 text-xs text-blue-950 space-y-2">
                    <h4 className="font-bold flex items-center gap-1.5 text-sm">
                        <Anchor className="w-4 h-4 text-blue-700" />
                        <span>Panduan Ambang Batas Keselamatan Pelayaran (BMKG Pusat & KSOP):</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-slate-700">
                        <li className="bg-white p-3 rounded-xl border border-blue-100">
                            <strong className="text-blue-900 block">Perahu Nelayan:</strong>
                            Kecepatan angin &gt;15 knot dan tinggi gelombang &gt;1.25 meter.
                        </li>
                        <li className="bg-white p-3 rounded-xl border border-blue-100">
                            <strong className="text-blue-900 block">Kapal Tongkang:</strong>
                            Kecepatan angin &gt;16 knot dan tinggi gelombang &gt;1.50 meter.
                        </li>
                        <li className="bg-white p-3 rounded-xl border border-blue-100">
                            <strong className="text-blue-900 block">Kapal Ferry / Ro-Ro:</strong>
                            Kecepatan angin &gt;21 knot dan tinggi gelombang &gt;2.50 meter.
                        </li>
                        <li className="bg-white p-3 rounded-xl border border-blue-100">
                            <strong className="text-blue-900 block">Kapal Kargo / Pesiar:</strong>
                            Kecepatan angin &gt;27 knot dan tinggi gelombang &gt;4.00 meter.
                        </li>
                    </ul>
                </div>

            </div>
        </section>
    );
}
