<?php

namespace App\Http\Requests;

use App\Enums\StatusPermohonan;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStatusPermohonanRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status_permohonan' => ['required', Rule::enum(StatusPermohonan::class)],
        ];
    }
}
