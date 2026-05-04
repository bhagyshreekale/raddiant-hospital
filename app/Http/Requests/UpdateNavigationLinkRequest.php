<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNavigationLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'in:header,footer',
            'label' => 'string|max:100',
            'url' => 'string|max:255',
            'is_visible' => 'boolean',
        ];
    }
}
