<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserResource;
use App\Services\UserServices;

use Cookie;
use Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }
    public function user()
    {

        $user = $this->userService->getUser();

        $resources = new UserResource($user);

        if ($user->isInfluencer()) {

            return $resources->additional([
                'data' => [
                    'revenue' => $user->revenue()
                ]
            ]);
        }
        return $resources->additional([
            'data' => [
                'role' => $user->role(),
                'permissions' => $user->permissions()
            ]
        ]);
    }
}
