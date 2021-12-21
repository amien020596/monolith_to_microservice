<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Models\User;
use Auth;
use Cookie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        Log::debug("login user", [\Auth::attempt($request->only('email', 'password'))]);
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $scope = $request->input('scope');


            // if ($user->isInfluencer() && $scope !== 'influencer') {

            //     return response([
            //         'error' => 'Access Denied!'
            //     ], Response::HTTP_FORBIDDEN);
            // }

            $token = $user->createToken($scope, [$scope])->accessToken;
            $cookie = cookie('jwt', $token, 3600);

            return response([
                'token' => $token
            ])->withCookie($cookie);
        }
        return response([
            'error' => 'Invalid Credentials!'
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function logout()
    {
        $cookie = Cookie::forget('jwt');
        return response([
            'message' => 'success'
        ])->withCookie($cookie);
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create(
            $request->only(
                [
                    'first_name',
                    'last_name',
                    'password',
                    'email'
                ]
            )
                + [

                    'is_influencer' => 1
                ]

        );
        return response($user, Response::HTTP_CREATED);
    }

    public function user()
    {
        Log::debug("user", [Auth::user()]);
        if (Auth::user()) {
            return "masuk ke sini";
        } else {
            return "failed";
        }
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = Auth::user();
        $user->update($request->only('first_name', 'last_name', 'email'));
        return response($user, Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->update([
            'password' => $request->input('password')
        ]);
        return response($user, Response::HTTP_ACCEPTED);
    }
}
