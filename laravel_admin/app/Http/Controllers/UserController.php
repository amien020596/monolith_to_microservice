<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index()
    {
        return User::paginate();
    }

    public function show($id)
    {
        return User::find($id);
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->only(['first_name', 'last_name', 'password', 'email']));
        return response($user, Response::HTTP_CREATED);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = User::find($id);
        $user->update($request->only(['first_name', 'last_name', 'password', 'email']));
        return response($user, Response::HTTP_ACCEPTED);
    }
    public function user()
    {
        return Auth::user();
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
