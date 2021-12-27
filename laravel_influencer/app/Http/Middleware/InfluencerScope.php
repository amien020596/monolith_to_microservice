<?php

namespace App\Http\Middleware;

use App\Services\UserServices;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

class InfluencerScope
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Log::debug("masuk ke middleware influenceer");
        if ($this->userService->isInfluencer()) {
            return $next($request);
        }
        throw new AuthenticationException;
    }
}
