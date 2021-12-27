<?php

namespace App\Http\Middleware;

use App\Services\UserServices;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

class AdminScope
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }

    public function handle($request, Closure $next)
    {
        if ($this->userService->isAdmin()) {
            return $next($request);
        }
        throw new AuthenticationException;
    }
}
