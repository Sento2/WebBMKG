<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLayananPtspRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_lengkap' => 'required|string|max:255',
            'email_whatsapp' => 'required|string|max:100',
            'asal_instansi_universitas' => 'required|string|max:255',
            'keperluan_data' => 'required|string',
            'file_ktp_surat' => 'required|file|mimes:pdf,jpg,png|max:5120',
        ];
    }
}
