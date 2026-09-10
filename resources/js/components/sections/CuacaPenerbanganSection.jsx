import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
    Plane, 
    Wind, 
    Eye, 
    Gauge, 
    Thermometer, 
    Cloud, 
    Clock, 
    ShieldCheck, 
    Info 
} from 'lucide-react';
import { FALLBACK_CUACA_PENERBANGAN } from '../../services/api';

export default function CuacaPenerbanganSection() {
    const { cuacaPenerbangan } = useApp();

    const dataList = cuacaPenerbangan?.length > 0 
        ? cuacaPenerbangan 
        : FALLBACK_CUACA_PENERBANGAN;

    return (
        <section className="py-12 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2.5 border border-indigo-100">
                        <Plane className="w-3.5 h-3.5" />
                        <span>Meteorologi Penerbangan Sipil (Aviation Weather)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Pengamatan Cuaca Bandara Mutiara Sis Al-Jufri Palu
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Data observasi meteorologi permukaan real-time (METAR/SPECI) yang digunakan oleh maskapai penerbangan, penerbang, dan AirNav Indonesia untuk keselamatan lepas landas (*take-off*) dan pendaratan (*landing*).
                    </p>
                </div>

                {/* Airport Aviation Cards */}
                <div className="space-y-6">
                    {dataList.map((item, idx) => (
                        <div 
                            key={item.id || idx}
                            className={`rounded-2xl p-6 border transition-all duration-200 ${
                                idx === 0 
                                    ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-indigo-500/40 shadow-xl ring-1 ring-indigo-500/20' 
                                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-5 border-slate-200/20">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                        idx === 0 ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700'
                                    }`}>
                                        <Plane className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-base sm:text-lg leading-tight ${
                                            idx === 0 ? 'text-white' : 'text-slate-900'
                                        }`}>
                                            {item.nama_bandara}
                                        </h3>
                                        <p className={`text-xs mt-0.5 flex items-center gap-1.5 ${
                                            idx === 0 ? 'text-indigo-200' : 'text-slate-500'
                                        }`}>
                                            <Clock className="w-3 h-3" />
                                            <span>Waktu Pengamatan: {item.waktu_pengamatan}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Kondisi Operasional Normal (VFR)</span>
                                    </span>
                                </div>
                            </div>

                            {/* Parameter Metrics Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                                
                                {/* 1. Angin Runway */}
                                <div className={`p-3.5 rounded-xl border ${
                                    idx === 0 ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                                }`}>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                                        <Wind className="w-3.5 h-3.5 text-indigo-400" />
                                        <span>Arah & Kecepatan</span>
                                    </div>
                                    <p className={`font-bold text-sm truncate ${idx === 0 ? 'text-white' : 'text-slate-900'}`}>
                                        {item.arah_kecepatan_angin}
                                    </p>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Permukaan Runway</span>
                                </div>

                                {/* 2. Jarak Pandang (Visibility) */}
                                <div className={`p-3.5 rounded-xl border ${
                                    idx === 0 ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                                }`}>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                        <span>Jarak Pandang</span>
                                    </div>
                                    <p className={`font-bold text-sm ${idx === 0 ? 'text-white' : 'text-slate-900'}`}>
                                        {item.jarak_pandang}
                                    </p>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Visibilitas Mendatar</span>
                                </div>

                                {/* 3. Cuaca & Perawanan */}
                                <div className={`p-3.5 rounded-xl border ${
                                    idx === 0 ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                                }`}>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                                        <Cloud className="w-3.5 h-3.5 text-sky-400" />
                                        <span>Kondisi Cuaca</span>
                                    </div>
                                    <p className={`font-bold text-sm truncate ${idx === 0 ? 'text-white' : 'text-slate-900'}`} title={item.kondisi_cuaca}>
                                        {item.kondisi_cuaca}
                                    </p>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Tutupan Awan</span>
                                </div>

                                {/* 4. Suhu / Titik Embun */}
                                <div className={`p-3.5 rounded-xl border ${
                                    idx === 0 ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                                }`}>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                                        <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Suhu / Titik Embun</span>
                                    </div>
                                    <p className={`font-bold text-sm ${idx === 0 ? 'text-white' : 'text-slate-900'}`}>
                                        {item.suhu}°C / {item.titik_embun}°C
                                    </p>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Dry Bulb / Dew Point</span>
                                </div>

                                {/* 5. Tekanan Udara QNH */}
                                <div className={`p-3.5 rounded-xl border ${
                                    idx === 0 ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                                }`}>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                                        <Gauge className="w-3.5 h-3.5 text-purple-400" />
                                        <span>Altimeter QNH</span>
                                    </div>
                                    <p className={`font-bold text-sm ${idx === 0 ? 'text-white' : 'text-slate-900'}`}>
                                        {item.tekanan_udara} hPa
                                    </p>
                                    <span className="text-[10px] text-slate-400 block mt-0.5">Tekanan Permukaan Laut</span>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Educational Box on Aviation Weather */}
                <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                    <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="font-semibold text-slate-900">
                            Pemberitahuan Operasional Meteorologi Penerbangan Mutiara Sis Al-Jufri:
                        </p>
                        <p>
                            Pengamatan cuaca bandara dilakukan setiap 30 menit atau setiap kali terjadi perubahan signifikan unsur cuaca (SPECI) oleh observer BMKG bersertifikasi ICAO di Stasiun Meteorologi Mutiara Sis Al-Jufri Palu. Data dikirimkan secara internasional ke jaringan telekomunikasi aeronautika (AFTN).
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
