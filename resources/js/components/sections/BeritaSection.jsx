import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Calendar, ArrowRight, X, Share2, Tag } from 'lucide-react';
import { FALLBACK_BERITA } from '../../services/api';

export default function BeritaSection() {
    const { berandaData, selectedBerita, setSelectedBerita } = useApp();

    const beritaList = berandaData?.berita_terbaru?.length > 0 
        ? berandaData.berita_terbaru 
        : FALLBACK_BERITA;

    return (
        <section className="py-12 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Publikasi & Edukasi</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Berita & Kegiatan Stasiun BMKG Palu
                        </h2>
                        <p className="text-sm text-slate-600 mt-1">
                            Informasi seputar operasional, sosialisasi keselamatan cuaca, dan edukasi meteorologi di Sulawesi Tengah.
                        </p>
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {beritaList.map((berita, idx) => (
                        <article 
                            key={berita.id || idx}
                            onClick={() => setSelectedBerita(berita)}
                            className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
                        >
                            <div>
                                {/* Thumbnail Image */}
                                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                                    <img 
                                        src={berita.thumbnail_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'} 
                                        alt={berita.judul} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        BMKG Palu
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{berita.published_at || 'Terbaru'}</span>
                                    </div>
                                    <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition leading-snug line-clamp-2 mb-2">
                                        {berita.judul}
                                    </h3>
                                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                        {berita.konten}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Link */}
                            <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                                <span>Baca Selengkapnya</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </article>
                    ))}
                </div>

                {/* MODAL BACA ARTIKEL LENGKAP */}
                {selectedBerita && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedBerita(null)}
                                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Header */}
                            <div className="relative h-64 w-full bg-slate-900">
                                <img 
                                    src={selectedBerita.thumbnail_url || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'} 
                                    alt={selectedBerita.judul} 
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>
                                <div className="absolute bottom-4 left-6 right-6">
                                    <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5 mb-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{selectedBerita.published_at || 'Terbaru'}</span>
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                                        {selectedBerita.judul}
                                    </h3>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-6 sm:p-8 space-y-4 text-slate-700 text-sm leading-relaxed">
                                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-xs text-slate-500">
                                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Rilis Resmi</span>
                                    <span>Stasiun Meteorologi Kelas II Mutiara Sis Al-Jufri Palu</span>
                                </div>
                                <p className="whitespace-pre-line text-base">
                                    {selectedBerita.konten}
                                </p>
                                <p className="text-xs text-slate-500 pt-4 border-t border-slate-100">
                                    Diterbitkan oleh Bagian Tata Usaha dan Observasi BMKG Palu. Informasi cuaca ini dapat dikutip dengan mencantumkan sumber resmi.
                                </p>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-3xl">
                                <span className="text-xs text-slate-500">BMKG Palu</span>
                                <button
                                    onClick={() => setSelectedBerita(null)}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
