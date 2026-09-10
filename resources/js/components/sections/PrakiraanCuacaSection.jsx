import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, CloudRain, Wind, Droplets, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { FALLBACK_PRAKIRAAN_CUACA } from '../../services/api';

export default function PrakiraanCuacaSection() {
    const { berandaData } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDay, setSelectedDay] = useState('hari_ini');

    const rawList = berandaData?.cuaca_hari_ini?.length > 0 
        ? berandaData.cuaca_hari_ini 
        : FALLBACK_PRAKIRAAN_CUACA;

    // Filter berdasarkan query pencarian
    const filteredList = rawList.filter(item => 
        item.wilayah.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Title & Subtitle */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                            <CloudRain className="w-3.5 h-3.5" />
                            <span>Prakiraan Berbasis Wilayah</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Prakiraan Cuaca Kecamatan Sulawesi Tengah
                        </h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Data prakiraan cuaca resmi hasil analisis model numerik Stasiun Meteorologi Mutiara Sis Al-Jufri Palu.
                        </p>
                    </div>

                    {/* Day Selector Tabs */}
                    <div className="inline-flex p-1 bg-slate-200/80 rounded-xl text-xs font-semibold text-slate-700">
                        <button
                            onClick={() => setSelectedDay('hari_ini')}
                            className={`px-3.5 py-1.5 rounded-lg transition ${
                                selectedDay === 'hari_ini' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
                            }`}
                        >
                            Hari Ini
                        </button>
                        <button
                            onClick={() => setSelectedDay('besok')}
                            className={`px-3.5 py-1.5 rounded-lg transition ${
                                selectedDay === 'besok' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
                            }`}
                        >
                            Besok
                        </button>
                        <button
                            onClick={() => setSelectedDay('lusa')}
                            className={`px-3.5 py-1.5 rounded-lg transition ${
                                selectedDay === 'lusa' ? 'bg-white text-blue-700 shadow-sm' : 'hover:text-slate-900'
                            }`}
                        >
                            Lusa
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 max-w-md relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari wilayah... (contoh: Palu, Donggala, Poso, Luwuk)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                        >
                            Hapus
                        </button>
                    )}
                </div>

                {/* Weather Cards Grid */}
                {filteredList.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                        <p className="text-slate-500 text-sm">Tidak ditemukan data cuaca untuk wilayah "<strong>{searchQuery}</strong>".</p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
                        >
                            Tampilkan semua kecamatan
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredList.map((item, index) => (
                            <div 
                                key={item.id || index}
                                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-1.5 text-slate-800">
                                            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                                            <h3 className="font-bold text-sm sm:text-base leading-tight">
                                                {item.wilayah}
                                            </h3>
                                        </div>
                                        <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md shrink-0">
                                            Siang - Sore
                                        </span>
                                    </div>

                                    {/* Weather Condition Visual */}
                                    <div className="flex items-center gap-4 my-4 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                        {item.ikon_cuaca ? (
                                            <img 
                                                src={item.ikon_cuaca} 
                                                alt={item.kondisi} 
                                                className="w-14 h-14 object-contain shrink-0"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://api.bmkg.go.id/storage/images/icon/cuaca/cerah-berawan-am.png';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                                <CloudRain className="w-6 h-6" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-black text-slate-900 tracking-tight">
                                                    {item.suhu}
                                                </span>
                                                <span className="text-lg font-bold text-slate-600">°C</span>
                                            </div>
                                            <p className="text-xs font-semibold text-blue-900 mt-0.5">
                                                {item.kondisi}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Weather Detail Parameters */}
                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                                    <div className="flex items-center gap-1.5 text-slate-600">
                                        <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                                        <span>Lembap: <strong className="text-slate-800">{item.kelembapan}%</strong></span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-600">
                                        <Wind className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span className="truncate" title={item.arah_kecepatan_angin}>
                                            <strong className="text-slate-800">{item.arah_kecepatan_angin}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer notes */}
                <div className="mt-8 bg-blue-50/60 rounded-xl p-4 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                        Prakiraan cuaca diperbarui secara otomatis secara berkala mengikuti keluaran model cuaca resolusi tinggi BMKG.
                    </span>
                </div>

            </div>
        </section>
    );
}
