<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('permissions.create') ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:permissions,name'],
            'group' => ['required', 'string', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (empty($this->slug) && $this->name) {
            $this->merge([
                'slug' => str($this->name)->lower()->replace(' ', '-')->toString(),
            ]);
        }

        if (empty($this->group) && $this->slug) {
            $parts = explode('.', $this->slug);
            $this->merge([
                'group' => $parts[0] ?? $this->slug,
            ]);
        }
    }
}
