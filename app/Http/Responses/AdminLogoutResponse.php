<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LogoutResponse as ContractsLogoutResponse;

class AdminLogoutResponse implements ContractsLogoutResponse
{
    public function toResponse($request)
    {
        return redirect()->route('admin.login');
    }
}
