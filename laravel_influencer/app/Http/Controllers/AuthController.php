<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Resources\UserResource;
use App\User;
use Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function user()
    {
        $user = Auth::user();
        $resources = new UserResource($user);
        if ($user->isInfluencer()) {
            return $resources;
        }
        return ($resources)->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
    }
}
