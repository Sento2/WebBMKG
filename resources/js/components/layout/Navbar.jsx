import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
    CloudRain, 
    Plane, 
    Ship, 
    Radio, 
    AlertTriangle, 
    FileText, 
    Info, 
    Clock, 
    Menu, 
    X, 
    Lock, 
    ChevronDown, 
    Home, 
    Sparkles 
} from 'lucide-react';

export default function Navbar() {
    const { activeTab, setActiveTab, berandaData, profil, setIsAdminOpen } = useApp();
    const [currentTime, setCurrentTime] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cuacaDropdownOpen, setCuacaDropdownOpen] = useState(false);

    // Update real-time clock in WITA (UTC+8)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            // Formatter untuk zona Indonesia Tengah (WITA)
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Makassar',
            };
            const timeStr = new Intl.DateTimeFormat('id-ID', options).format(now);
            setCurrentTime(`${timeStr} WITA`);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const peringatan = berandaData?.peringatan;
    const isPeringatanAktif = peringatan && peringatan.tampilkan_di_web;

    const navItemClass = (tabName) => `
        px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1.5
        ${activeTab === tabName 
            ? 'bg-blue-700 text-white shadow-sm ring-1 ring-blue-500' 
            : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/80'}
    `;

    return (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
            {/* 1. TOP WARNING TICKER / RUNNING BANNER */}
            {isPeringatanAktif && (
                <div 
                    onClick={() => setActiveTab('peringatan')}
                    className="cursor-pointer bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 text-white text-xs font-semibold py-1.5 px-4 shadow-inner overflow-hidden border-b border-red-700 flex items-center hover:opacity-95 transition-opacity"
                >
                    <div className="flex items-center gap-1.5 bg-red-800/80 px-2 py-0.5 rounded text-[11px] uppercase tracking-wide shrink-0 mr-3 border border-red-400/40">
                        <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                        <span>Peringatan Dini</span>
                    </div>
                    <div className="relative overflow-hidden flex-1">
                        <div className="animate-marquee whitespace-nowrap text-amber-100 flex items-center gap-8">
                            <span>⚠️ {peringatan.judul_peringatan}: {peringatan.deskripsi_wilayah}</span>
                            <span>• Berlaku: {peringatan.berlaku_mulai} s/d {peringatan.berlaku_sampai}</span>
                            <span>• Klik di sini untuk membaca detail peringatan cuaca BMKG Palu •</span>
                            <span>⚠️ {peringatan.judul_peringatan}: {peringatan.deskripsi_wilayah}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 2. TOP IDENTITY BAR (LOGO & STATION INFO & LIVE TIME) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                    <img 
                        src="/images/logo-bmkg.png" 
                        alt="Logo BMKG" 
                        className="w-12 h-12 object-contain drop-shadow-sm shrink-0"
                    />
                    <div>
                        <p className="text-[11px] uppercase tracking-wider font-extrabold text-blue-900 leading-tight">
                            Badan Meteorologi, Klimatologi, dan Geofisika
                        </p>
                        <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                            {profil?.nama_lengkap || 'Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu'}
                        </h1>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                             <span>Kode WMO: <strong className="text-blue-700">{profil?.kode_wmo || '97180'}</strong></span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Layanan Operasional 24 Jam
                            </span>
                        </p>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-4 text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-blue-950 font-semibold">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{currentTime || 'Memuat waktu...'}</span>
                    </div>
                    <div className="h-4 w-px bg-slate-300"></div>
                    <a 
                        href="#kontak"
                        onClick={(e) => { e.preventDefault(); setActiveTab('profil'); }}
                        className="text-slate-600 hover:text-blue-700 transition"
                    >
                        Bandara Mutiara Sis Al-Jufri, Palu
                    </a>
                </div>
            </div>

            {/* 3. MAIN NAVIGATION BAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-13">
                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-1">
                        <button 
                            onClick={() => setActiveTab('beranda')}
                            className={navItemClass('beranda')}
                        >
                            <Home className="w-4 h-4" />
                            <span>Beranda</span>
                        </button>

                        {/* Cuaca Dropdown */}
                        <div className="relative" onMouseLeave={() => setCuacaDropdownOpen(false)}>
                            <button
                                onClick={() => setCuacaDropdownOpen(!cuacaDropdownOpen)}
                                onMouseEnter={() => setCuacaDropdownOpen(true)}
                                className={`px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1.5 ${
                                    ['cuaca', 'penerbangan', 'maritim', 'satelit'].includes(activeTab)
                                        ? 'bg-blue-100/70 text-blue-800 ring-1 ring-blue-300'
                                        : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/80'
                                }`}
                            >
                                <CloudRain className="w-4 h-4 text-blue-600" />
                                <span>Informasi Cuaca</span>
                                <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-500" />
                            </button>

                            {cuacaDropdownOpen && (
                                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 mt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                    <button
                                        onClick={() => { setActiveTab('cuaca'); setCuacaDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition"
                                    >
                                        <CloudRain className="w-4 h-4 text-blue-600" />
                                        <div>
                                            <p className="font-semibold leading-tight">Prakiraan Cuaca</p>
                                             <p className="text-xs text-slate-500">Prakiraan kecamatan di Sulteng</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('penerbangan'); setCuacaDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition"
                                    >
                                        <Plane className="w-4 h-4 text-indigo-600" />
                                        <div>
                                            <p className="font-semibold leading-tight">Cuaca Penerbangan</p>
                                             <p className="text-xs text-slate-500">METAR Bandara Mutiara Palu</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('maritim'); setCuacaDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition"
                                    >
                                        <Ship className="w-4 h-4 text-cyan-600" />
                                        <div>
                                            <p className="font-semibold leading-tight">Cuaca Maritim</p>
                                            <p className="text-xs text-slate-500">Tinggi gelombang & risiko kapal</p>
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('satelit'); setCuacaDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 flex items-center gap-2.5 text-slate-700 hover:text-blue-700 transition"
                                    >
                                        <Radio className="w-4 h-4 text-purple-600" />
                                        <div>
                                            <p className="font-semibold leading-tight">Citra Satelit</p>
                                            <p className="text-xs text-slate-500">Satelit Himawari-9 Realtime</p>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={() => setActiveTab('peringatan')}
                            className={navItemClass('peringatan')}
                        >
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <span>Peringatan Dini</span>
                        </button>

                        <button 
                            onClick={() => setActiveTab('berita')}
                            className={navItemClass('berita')}
                        >
                            <FileText className="w-4 h-4" />
                            <span>Berita & Edukasi</span>
                        </button>

                        <button 
                            onClick={() => setActiveTab('ptsp')}
                            className={`px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1.5 ${
                                activeTab === 'ptsp'
                                    ? 'bg-blue-700 text-white shadow-sm'
                                    : 'text-blue-700 bg-blue-50 hover:bg-blue-100/80 font-semibold'
                            }`}
                        >
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>Layanan PTSP</span>
                            <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">Online</span>
                        </button>

                        <button 
                            onClick={() => setActiveTab('profil')}
                            className={navItemClass('profil')}
                        >
                            <Info className="w-4 h-4" />
                            <span>Profil Stasiun</span>
                        </button>
                    </nav>

                    {/* Right Admin Access Button */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => setIsAdminOpen(true)}
                            className="text-xs font-semibold text-slate-500 hover:text-blue-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
                            title="Akses Petugas BMKG"
                        >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Akses Petugas</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setIsAdminOpen(true)}
                            className="p-2 text-slate-600 hover:text-blue-700"
                            title="Akses Petugas"
                        >
                            <Lock className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                            aria-label="Menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-5 space-y-1.5 shadow-lg animate-in fade-in duration-150">
                    <button
                        onClick={() => { setActiveTab('beranda'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <Home className="w-4 h-4 text-blue-600" />
                        <span>Beranda</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('cuaca'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <CloudRain className="w-4 h-4 text-blue-600" />
                        <span>Prakiraan Cuaca Kecamatan</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('penerbangan'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <Plane className="w-4 h-4 text-indigo-600" />
                         <span>Cuaca Penerbangan (Mutiara Palu)</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('maritim'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <Ship className="w-4 h-4 text-cyan-600" />
                        <span>Cuaca Maritim & Pelayaran</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('satelit'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <Radio className="w-4 h-4 text-purple-600" />
                        <span>Citra Satelit Himawari-9</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('peringatan'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Peringatan Dini Cuaca</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('ptsp'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between bg-blue-50 text-blue-800"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>Layanan PTSP (Permohonan Data)</span>
                        </div>
                        <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-1.5 py-0.5 rounded">Online</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('berita'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <FileText className="w-4 h-4 text-slate-600" />
                        <span>Berita & Edukasi</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('profil'); setMobileMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-800 hover:bg-blue-50"
                    >
                        <Info className="w-4 h-4 text-slate-600" />
                        <span>Profil Stasiun & Kontak</span>
                    </button>
                </div>
            )}
        </header>
    );
}
