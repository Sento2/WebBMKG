import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, Layers, Map, Info, RefreshCw, ZoomIn, Calendar } from 'lucide-react';

export default function CitraSatelitSection() {
    const { citraSatelit } = useApp();
    const [activeProduct, setActiveProduct] = useState('enhanced_ir');
    const [activeRegion, setActiveRegion] = useState('indonesia');
    const [imageLoaded, setImageLoaded] = useState(false);

    const produkList = citraSatelit?.produk || {};
    const currentProduct = produkList[activeProduct] || {
        nama: 'Enhanced IR (Infrared)',
        deskripsi: 'Citra suhu puncak awan untuk mendeteksi potensi awan badai (Cumulonimbus).',
        wilayah: {
            indonesia: {
                nama: 'Indonesia',
                url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_EIR_Indonesia.png'
            },
            sulawesi: {
                nama: 'Sulawesi & Selat Makassar',
                url: 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_EIR_Sulawesi.png'
            }
        }
    };

    const wilayahList = currentProduct.wilayah || {};
    const currentRegionData = wilayahList[activeRegion] || Object.values(wilayahList)[0];

    return (
        <section className="py-12 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="max-w-3xl mb-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2.5 border border-purple-200">
                        <Radio className="w-3.5 h-3.5" />
                        <span>Penginderaan Jauh Satelit (Remote Sensing)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Citra Satelit Cuaca Himawari-9 Terkini
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Pantauan tutupan awan, pertumbuhan awan konvektif penghasil badai, dan estimasi potensi hujan di wilayah Indonesia dan Sulawesi Tengah secara visual.
                    </p>
                </div>

                {/* Product & Region Filter Controls */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Product Buttons */}
                        <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                Produk Satelit:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(produkList).length > 0 ? (
                                    Object.entries(produkList).map(([key, prod]) => (
                                        <button
                                            key={key}
                                            onClick={() => { setActiveProduct(key); setImageLoaded(false); }}
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                                                activeProduct === key
                                                    ? 'bg-purple-700 text-white shadow-sm'
                                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-50 hover:text-purple-700'
                                            }`}
                                        >
                                            <Layers className="w-3.5 h-3.5" />
                                            <span>{prod.nama}</span>
                                        </button>
                                    ))
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setActiveProduct('enhanced_ir')}
                                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-700 text-white shadow-sm"
                                        >
                                            Enhanced IR (Infrared)
                                        </button>
                                        <button
                                            onClick={() => setActiveProduct('visible')}
                                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200"
                                        >
                                            Visible (VIS)
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Region Selector */}
                        <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                Cakupan Wilayah:
                            </span>
                            <div className="flex flex-wrap gap-1.5 bg-slate-200/80 p-1 rounded-xl">
                                {Object.keys(wilayahList).map((regKey) => (
                                    <button
                                        key={regKey}
                                        onClick={() => { setActiveRegion(regKey); setImageLoaded(false); }}
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                                            activeRegion === regKey
                                                ? 'bg-white text-purple-900 shadow-sm'
                                                : 'text-slate-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {wilayahList[regKey]?.nama || regKey}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 border-t border-slate-200/80 pt-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-600 shrink-0" />
                        <span><strong>Deskripsi Produk:</strong> {currentProduct.deskripsi}</span>
                    </p>
                </div>

                {/* Satellite Image Display Canvas */}
                <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
                    <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                        <div className="flex items-center gap-2 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{currentProduct.nama} - Wilayah {currentRegionData?.nama}</span>
                        </div>
                        <span className="text-slate-400">
                            Sumber: BMKG / Himawari-9 (JMA)
                        </span>
                    </div>

                    <div className="relative min-h-[380px] sm:min-h-[500px] flex items-center justify-center p-2 sm:p-4 bg-slate-950">
                        {currentRegionData?.url ? (
                            <img 
                                src={currentRegionData.url} 
                                alt={`Citra Satelit ${currentProduct.nama}`} 
                                className="max-h-[600px] w-auto max-w-full object-contain rounded-lg transition-opacity duration-300 shadow-lg"
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    // Fallback sample Himawari imagery
                                    e.target.src = 'https://inderaja.bmkg.go.id/IMAGE/HIMA/H09_EIR_Indonesia.png';
                                }}
                            />
                        ) : (
                            <p className="text-slate-400 text-sm">Sedang memuat citra satelit...</p>
                        )}
                    </div>

                    <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
                        <p>
                            Catatan: Citra satelit diperbarui setiap 10-30 menit secara otomatis dari penginderaan satelit cuaca.
                        </p>
                        {currentRegionData?.url && (
                            <a
                                href={currentRegionData.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white font-semibold transition bg-purple-900/40 px-3 py-1.5 rounded-lg border border-purple-500/30"
                            >
                                <ZoomIn className="w-3.5 h-3.5" />
                                <span>Buka Resolusi Asli</span>
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}
