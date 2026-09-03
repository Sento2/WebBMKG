<?php

namespace App\Http\Requests;

use App\Enums\LevelBahaya;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePeringatanDiniRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'level_bahaya' => ['required', Rule::enum(LevelBahaya::class)],
            'judul_peringatan' => 'required|string',
            'deskripsi_wilayah' => 'required|string',
            'tampilkan_di_web' => 'required|boolean',
        ];
    }
}
