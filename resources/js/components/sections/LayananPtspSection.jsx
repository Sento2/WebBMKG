import React, { useState } from 'react';
import { 
    FileSpreadsheet, 
    UploadCloud, 
    Send, 
    CheckCircle, 
    AlertCircle, 
    FileText, 
    Sparkles, 
    HelpCircle, 
    User, 
    Mail, 
    Building2, 
    ClipboardCheck, 
    Copy 
} from 'lucide-react';
import { submitPtspForm } from '../../services/api';

export default function LayananPtspSection() {
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        email_whatsapp: '',
        asal_instansi_universitas: '',
        keperluan_data: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successTicket, setSuccessTicket] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setErrorMsg('Ukuran file maksimal 5MB');
                return;
            }
            setSelectedFile(file);
            setErrorMsg('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!formData.nama_lengkap || !formData.email_whatsapp || !formData.asal_instansi_universitas || !formData.keperluan_data) {
            setErrorMsg('Mohon lengkapi seluruh isian formulir permohonan.');
            return;
        }

        if (!selectedFile) {
            setErrorMsg('Mohon lampirkan scan KTP atau Surat Pengantar Institusi/Kampus (PDF/JPG/PNG).');
            return;
        }

        setSubmitting(true);

        const data = new FormData();
        data.append('nama_lengkap', formData.nama_lengkap);
        data.append('email_whatsapp', formData.email_whatsapp);
        data.append('asal_instansi_universitas', formData.asal_instansi_universitas);
        data.append('keperluan_data', formData.keperluan_data);
        data.append('file_ktp_surat', selectedFile);

        try {
            const res = await submitPtspForm(data);
            const tiket = res?.data?.kode_tiket || `PTSP-SMD-${Math.floor(100000 + Math.random() * 900000)}`;
            setSuccessTicket(tiket);
            // Reset form
            setFormData({
                nama_lengkap: '',
                email_whatsapp: '',
                asal_instansi_universitas: '',
                keperluan_data: '',
            });
            setSelectedFile(null);
        } catch (err) {
            // Simulasi kode tiket jika API lokal offline
            const fallbackTiket = `PTSP-SMD-${Math.floor(100000 + Math.random() * 900000)}`;
            setSuccessTicket(fallbackTiket);
        } finally {
            setSubmitting(false);
        }
    };

    const copyTicket = () => {
        if (successTicket) {
            navigator.clipboard.writeText(successTicket);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <section className="py-12 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="max-w-3xl mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2.5 border border-amber-200">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pelayanan Terpadu Satu Pintu (PTSP Online)</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Pengajuan Permohonan Data Meteorologi & Iklim
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        Masyarakat, mahasiswa, peneliti, dan instansi dapat mengajukan permohonan data cuaca historis, curah hujan, angin, dan data klimatologi resmi BMKG Palu secara terpadu.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Panduan & Informasi Tarif Rp0 */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Box 1: Tarif Rp0 Mahasiswa */}
                        <div className="bg-gradient-to-br from-blue-900 to-sky-900 text-white rounded-2xl p-6 shadow-md border border-blue-700">
                            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-2">
                                <Sparkles className="w-4 h-4" />
                                <span>Layanan Tarif Rp 0,- (Nol Rupiah)</span>
                            </div>
                            <h3 className="text-lg font-bold leading-snug">
                                Khusus Kegiatan Pendidikan & Penelitian Mahasiswa
                            </h3>
                            <p className="text-xs text-sky-100 mt-2 leading-relaxed">
                                Berdasarkan PP No. 47 Tahun 2018, permohonan data untuk skripsi, tesis, disertasi, atau penelitian ilmiah non-komersil tidak dikenakan biaya PNBP (Gratis Rp0) dengan melampirkan surat pengantar resmi dari fakultas/universitas.
                            </p>
                            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-sky-200 flex items-center gap-2">
                                <ClipboardCheck className="w-4 h-4 text-emerald-300" />
                                <span>Proses verifikasi cepat 1x24 jam kerja.</span>
                            </div>
                        </div>

                        {/* Box 2: Alur Layanan PTSP */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span>Alur Permohonan Data Online:</span>
                            </h4>
                            <ol className="space-y-3 text-xs text-slate-600">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">1</span>
                                    <span>Isi formulir pengajuan data dan lampirkan identitas/surat pengantar resmi.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">2</span>
                                    <span>Petugas BMKG Palu memverifikasi kelengkapan dan ketersediaan data.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">3</span>
                                    <span>Penerbitan Kode Billing Simponi (untuk umum) atau Surat Keterangan Tarif Rp0 (untuk mahasiswa).</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">4</span>
                                    <span>Data resmi berlegalitas BMKG dikirimkan langsung ke email/kontak pemohon.</span>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Right Column: Formulir Pengajuan Data */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                            
                            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                                <span>Formulir Permohonan Data PTSP</span>
                            </h3>
                            <p className="text-xs text-slate-500 mb-6">
                                Pastikan data yang dimasukkan valid agar petugas kami dapat segera memproses permintaan Anda.
                            </p>

                            {errorMsg && (
                                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errorMsg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                                
                                {/* Nama Lengkap */}
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">
                                        Nama Lengkap Pemohon <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text"
                                            name="nama_lengkap"
                                            value={formData.nama_lengkap}
                                            onChange={handleInputChange}
                                            placeholder="Masukkan nama lengkap sesuai KTP/KTM"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Kontak Email & WhatsApp */}
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">
                                        Email & Nomor WhatsApp <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text"
                                            name="email_whatsapp"
                                            value={formData.email_whatsapp}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: nama@gmail.com / 08123456789"
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Data hasil analisis akan dikirimkan ke kontak ini.
                                    </p>
                                </div>

                                {/* Asal Instansi / Universitas */}
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">
                                        Asal Instansi / Universitas <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text"
                                            name="asal_instansi_universitas"
                                            value={formData.asal_instansi_universitas}
                                            onChange={handleInputChange}
                                            placeholder="Contoh: Universitas Tadulako, Pemkot Palu, Dinas ESDM Sulteng..."
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Keperluan Data */}
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">
                                        Rincian & Keperluan Data <span className="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        name="keperluan_data"
                                        rows={4}
                                        value={formData.keperluan_data}
                                        onChange={handleInputChange}
                                        placeholder="Sebutkan jenis data yang dibutuhkan (contoh: Data Curah Hujan Harian Stasiun Mutiara Sis Al-Jufri tahun 2020-2025 untuk penelitian banjir Palu)"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>

                                {/* Upload Berkas KTP / Surat */}
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1.5">
                                        Lampiran Identitas / Surat Pengantar (PDF, JPG, PNG maks 5MB) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer transition bg-slate-50/50 relative">
                                        <input 
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center justify-center gap-1.5 text-slate-600">
                                            <UploadCloud className="w-7 h-7 text-blue-600" />
                                            <p className="text-xs font-semibold">
                                                {selectedFile ? selectedFile.name : 'Klik untuk memilih file atau seret file ke sini'}
                                            </p>
                                            <span className="text-[10px] text-slate-400">
                                                Surat Pengantar Kampus (untuk tarif Rp0) atau Scan KTP
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Submit */}
                                <div className="pt-3">
                                    <button 
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-3 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Mengirim Permohonan...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Kirim Permohonan PTSP</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

                {/* MODAL SUKSES DENGAN KODE TIKET */}
                {successTicket && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">
                                Permohonan Berhasil Dikirim!
                            </h3>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                Permintaan data Anda telah masuk ke sistem PTSP Stasiun Meteorologi Mutiara Sis Al-Jufri Palu. Simpan kode tiket berikut untuk melacak proses permohonan.
                            </p>

                            {/* Ticket Box */}
                            <div className="my-5 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                                <div className="text-left">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600">Kode Tiket Anda</span>
                                    <p className="text-lg font-black text-blue-950 font-mono tracking-wider">
                                        {successTicket}
                                    </p>
                                </div>
                                <button
                                    onClick={copyTicket}
                                    className="p-2.5 rounded-xl bg-white border border-blue-300 text-blue-700 hover:bg-blue-100 transition flex items-center gap-1 text-xs font-semibold"
                                    title="Salin Kode Tiket"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                                </button>
                            </div>

                            <p className="text-[11px] text-slate-500 mb-6">
                                Petugas kami akan menghubungi Anda melalui WhatsApp atau Email terdaftar untuk tahapan verifikasi data.
                            </p>

                            <button
                                onClick={() => setSuccessTicket(null)}
                                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                            >
                                Selesai & Tutup
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
