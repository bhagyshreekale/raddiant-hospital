<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNavigationLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'type' => 'required|in:header,footer',
            'label' => 'required|string|max:100',
            'url' => 'required|string|max:255',
            'is_visible' => 'boolean',
        ];
    }
}
