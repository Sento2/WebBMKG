<?php

namespace App\Services;

use App\Models\LayananPtsp;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class LayananPtspService
{
    /**
     * Submit permohonan PTSP baru.
     *
     * @param  array{nama_lengkap: string, email_whatsapp: string, asal_instansi_universitas: string, keperluan_data: string, file_ktp_surat: UploadedFile}  $data
     * @return array{kode_tiket: string, permohonan: LayananPtsp}
     */
    public function submitPermohonan(array $data): array
    {
        $file = $data['file_ktp_surat'];
        $namaFile = time().'_'.$file->getClientOriginalName();
        $pathFile = $file->storeAs('berkas_ptsp', $namaFile, 'public');

        $kodeTiket = 'PTSP-BMKG-'.strtoupper(Str::random(5));

        $permohonan = LayananPtsp::create([
            'kode_tiket' => $kodeTiket,
            'nama_lengkap' => $data['nama_lengkap'],
            'email_whatsapp' => $data['email_whatsapp'],
            'asal_instansi_universitas' => $data['asal_instansi_universitas'],
            'keperluan_data' => $data['keperluan_data'],
            'file_ktp_surat' => $pathFile,
            'status_permohonan' => 'menunggu',
        ]);

        return [
            'kode_tiket' => $kodeTiket,
            'permohonan' => $permohonan,
        ];
    }
}
