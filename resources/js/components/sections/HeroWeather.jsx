import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
    CloudSun, 
    Wind, 
    Droplets, 
    Gauge, 
    Eye, 
    ArrowRight, 
    Plane, 
    Ship, 
    FileSpreadsheet, 
    Radio, 
    MapPin, 
    Calendar 
} from 'lucide-react';

export default function HeroWeather() {
    const { setActiveTab, berandaData, cuacaPenerbangan } = useApp();

    const cuacaHariIni = berandaData?.cuaca_hari_ini?.[0] || {
        wilayah: 'Palu (Mutiara Sis Al-Jufri)',
        suhu: 34,
        kondisi: 'Cerah Berawan',
        kelembapan: 65,
        arah_kecepatan_angin: 'Barat Laut, 10 km/jam',
        waktu_prakiraan: 'Hari Ini'
    };

    const metarTerbaru = cuacaPenerbangan?.[0];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-sky-900 to-slate-900 text-white py-12 lg:py-16 shadow-lg">
            {/* Background Decorative Graphic Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Hero Greeting & Real-time Weather Card */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                            <span>Pemantauan Cuaca Terkini Sulawesi Tengah</span>
                        </div>

                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                                Informasi Cuaca Resmi <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-200">
                                    BMKG Kota Palu
                                </span>
                            </h2>
                            <p className="mt-3 text-sm sm:text-base text-sky-100/80 max-w-2xl leading-relaxed">
                                Pusat layanan observasi meteorologi, keselamatan penerbangan Bandara Mutiara Sis Al-Jufri, cuaca maritim Teluk Palu &amp; Selat Makassar, dan layanan data informasi publik (PTSP).
                            </p>
                        </div>

                        {/* Weather Card Display */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/15 shadow-2xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{cuacaHariIni.wilayah}</span>
                                    </div>
                                    <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 text-slate-400" />
                                        <span>Stasiun Meteorologi Mutiara Sis Al-Jufri</span>
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-1.5 bg-blue-500/25 px-3 py-1 rounded-full text-xs font-medium text-sky-200 border border-blue-400/20">
                                    <span>Status Cuaca:</span>
                                    <strong className="text-white">{cuacaHariIni.kondisi}</strong>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-sky-400/20 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                                        <CloudSun className="w-10 h-10 text-amber-300" />
                                    </div>
                                    <div>
                                        <div className="flex items-start">
                                            <span className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white">
                                                {cuacaHariIni.suhu}
                                            </span>
                                            <span className="text-xl font-bold text-sky-300 ml-1">°C</span>
                                        </div>
                                        <p className="text-xs text-sky-200/90 font-medium capitalize">
                                            {cuacaHariIni.kondisi}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-black/20 rounded-xl p-2.5 border border-white/10 flex items-center gap-2.5">
                                        <Droplets className="w-4 h-4 text-cyan-300 shrink-0" />
                                        <div>
                                            <span className="text-slate-400 block text-[10px]">Kelembapan</span>
                                            <span className="font-semibold text-white">{cuacaHariIni.kelembapan}%</span>
                                        </div>
                                    </div>
                                    <div className="bg-black/20 rounded-xl p-2.5 border border-white/10 flex items-center gap-2.5">
                                        <Wind className="w-4 h-4 text-emerald-300 shrink-0" />
                                        <div>
                                            <span className="text-slate-400 block text-[10px]">Angin</span>
                                            <span className="font-semibold text-white truncate max-w-[90px]" title={cuacaHariIni.arah_kecepatan_angin}>
                                                {cuacaHariIni.arah_kecepatan_angin}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-black/20 rounded-xl p-2.5 border border-white/10 flex items-center gap-2.5">
                                        <Gauge className="w-4 h-4 text-purple-300 shrink-0" />
                                        <div>
                                            <span className="text-slate-400 block text-[10px]">Tekanan Udara</span>
                                            <span className="font-semibold text-white">
                                                {metarTerbaru ? `${metarTerbaru.tekanan_udara} hPa` : '1011 hPa'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-black/20 rounded-xl p-2.5 border border-white/10 flex items-center gap-2.5">
                                        <Eye className="w-4 h-4 text-amber-300 shrink-0" />
                                        <div>
                                            <span className="text-slate-400 block text-[10px]">Jarak Pandang</span>
                                            <span className="font-semibold text-white">
                                                {metarTerbaru ? metarTerbaru.jarak_pandang : '9.000 m'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={() => setActiveTab('ptsp')}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <FileSpreadsheet className="w-4 h-4" />
                                <span>Permohonan Data PTSP (Tarif Rp0)</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setActiveTab('cuaca')}
                                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm backdrop-blur-sm border border-white/20 flex items-center gap-2 transition"
                            >
                                <span>Prakiraan Kecamatan</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: 4 Service Highlight Cards */}
                    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* Service Card 1: Penerbangan */}
                        <div 
                            onClick={() => setActiveTab('penerbangan')}
                            className="group cursor-pointer bg-slate-800/80 hover:bg-blue-900/60 p-4 rounded-2xl border border-slate-700 hover:border-blue-400/50 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 shadow-md"
                        >
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-3 group-hover:bg-indigo-500 group-hover:text-white transition">
                                <Plane className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                                <span>Cuaca Penerbangan</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                            </h3>
                            <p className="text-xs text-slate-300 mt-1">
                                Sandi METAR, arah angin runway, visibility Bandara Mutiara Sis Al-Jufri Palu.
                            </p>
                        </div>

                        {/* Service Card 2: Maritim */}
                        <div 
                            onClick={() => setActiveTab('maritim')}
                            className="group cursor-pointer bg-slate-800/80 hover:bg-cyan-900/60 p-4 rounded-2xl border border-slate-700 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 shadow-md"
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3 group-hover:bg-cyan-500 group-hover:text-white transition">
                                <Ship className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition flex items-center justify-between">
                                <span>Cuaca Maritim</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                            </h3>
                            <p className="text-xs text-slate-300 mt-1">
                                Tinggi gelombang &amp; risiko pelayaran kapal di Teluk Palu &amp; Selat Makassar.
                            </p>
                        </div>

                        {/* Service Card 3: Citra Satelit */}
                        <div 
                            onClick={() => setActiveTab('satelit')}
                            className="group cursor-pointer bg-slate-800/80 hover:bg-purple-900/60 p-4 rounded-2xl border border-slate-700 hover:border-purple-400/50 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 shadow-md"
                        >
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3 group-hover:bg-purple-500 group-hover:text-white transition">
                                <Radio className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-white group-hover:text-purple-300 transition flex items-center justify-between">
                                <span>Citra Satelit Cuaca</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                            </h3>
                            <p className="text-xs text-slate-300 mt-1">
                                Pantauan awan konvektif & hujan Satelit Himawari-9 resolusi tinggi.
                            </p>
                        </div>

                        {/* Service Card 4: PTSP Online */}
                        <div 
                            onClick={() => setActiveTab('ptsp')}
                            className="group cursor-pointer bg-gradient-to-br from-amber-950/40 to-slate-800/80 hover:from-amber-900/50 p-4 rounded-2xl border border-amber-500/30 hover:border-amber-400 backdrop-blur-md transition-all duration-200 transform hover:-translate-y-1 shadow-md"
                        >
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                                <FileSpreadsheet className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm text-amber-300 group-hover:text-amber-200 transition flex items-center justify-between">
                                <span>Layanan PTSP BMKG</span>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                            </h3>
                            <p className="text-xs text-slate-300 mt-1">
                                Pengajuan permohonan data cuaca & iklim online bertiket resmi.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
