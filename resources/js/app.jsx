import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroWeather from './components/sections/HeroWeather';
import PrakiraanCuacaSection from './components/sections/PrakiraanCuacaSection';
import CuacaPenerbanganSection from './components/sections/CuacaPenerbanganSection';
import CuacaMaritimSection from './components/sections/CuacaMaritimSection';
import CitraSatelitSection from './components/sections/CitraSatelitSection';
import PeringatanDiniSection from './components/sections/PeringatanDiniSection';
import LayananPtspSection from './components/sections/LayananPtspSection';
import BeritaSection from './components/sections/BeritaSection';
import ProfilSection from './components/sections/ProfilSection';
import AdminPortalModal from './components/sections/AdminPortalModal';

function MainContent() {
    const { activeTab, setActiveTab } = useApp();

    return (
        <main className="min-h-screen">
            {activeTab === 'beranda' && (
                <>
                    <HeroWeather />
                    <PrakiraanCuacaSection />
                    
                    {/* Secondary Highlight Preview on Beranda */}
                    <div className="py-12 bg-white border-b border-slate-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Teaser Cuaca Penerbangan */}
                                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[11px] uppercase tracking-wider text-indigo-300 font-bold block mb-1">
                                            Aviation Weather Service
                                        </span>
                                        <h3 className="text-xl font-black mb-2">
                                            Pengamatan Penerbangan Bandara Mutiara Palu
                                        </h3>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Pantau kondisi angin runway, visibilitas horizontal, suhu/dewpoint, dan tekanan altimeter QNH secara berkala untuk keselamatan penerbangan.
                                        </p>
                                    </div>
                                    <div className="pt-5 mt-4 border-t border-slate-800">
                                        <button
                                            onClick={() => setActiveTab('penerbangan')}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow"
                                        >
                                            Buka Dashboard METAR Penerbangan →
                                        </button>
                                    </div>
                                </div>

                                {/* Teaser Cuaca Maritim */}
                                <div className="bg-gradient-to-br from-cyan-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-cyan-800/40 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-bold block mb-1">
                                            Marine Meteorology
                                        </span>
                                        <h3 className="text-xl font-black mb-2">
                                            Tinggi Gelombang Selat Makassar & Balikpapan
                                        </h3>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            Prakiraan kondisi gelombang perairan dan himbauan keselamatan pelayaran bagi armada nelayan, tongkang batubara, dan kapal ferry.
                                        </p>
                                    </div>
                                    <div className="pt-5 mt-4 border-t border-cyan-800/40">
                                        <button
                                            onClick={() => setActiveTab('maritim')}
                                            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition shadow"
                                        >
                                            Lihat Info Gelombang & Maritim →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <BeritaSection />
                    
                    {/* PTSP Call to Action Banner on Homepage */}
                    <div className="py-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="max-w-2xl">
                                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block mb-1">
                                    Pelayanan Terpadu Satu Pintu (PTSP)
                                </span>
                                <h3 className="text-2xl font-black">
                                    Membutuhkan Data Cuaca Resmi untuk Penelitian / Pekerjaan?
                                </h3>
                                <p className="text-xs sm:text-sm text-sky-100 mt-1">
                                    Ajukan permohonan data cuaca historis, curah hujan, dan data klimatologi secara online dengan tarif resmi atau tarif Rp0 khusus tugas akhir mahasiswa.
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveTab('ptsp')}
                                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-xl transition shrink-0 transform hover:-translate-y-0.5"
                            >
                                Ajukan Data Sekarang (PTSP)
                            </button>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'cuaca' && <PrakiraanCuacaSection />}
            {activeTab === 'penerbangan' && <CuacaPenerbanganSection />}
            {activeTab === 'maritim' && <CuacaMaritimSection />}
            {activeTab === 'satelit' && <CitraSatelitSection />}
            {activeTab === 'peringatan' && <PeringatanDiniSection />}
            {activeTab === 'ptsp' && <LayananPtspSection />}
            {activeTab === 'berita' && <BeritaSection />}
            {activeTab === 'profil' && <ProfilSection />}
        </main>
    );
}

export default function App() {
    return (
        <AppProvider>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
                <Navbar />
                <div className="flex-1">
                    <MainContent />
                </div>
                <Footer />
                <AdminPortalModal />
            </div>
        </AppProvider>
    );
}

// Mount React app to DOM
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
