<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\User;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'users');

        $users = User::with('role')->paginate();
        return UserResource::collection($users);
    }

    public function show($id)
    {
        Gate::authorize('view', 'users');
        $user = User::with('role')->find($id);
        return new UserResource($user);
    }

    public function store(UserCreateRequest $request)
    {
        Gate::authorize('edit', 'users');
        $user = User::create($request->only(['first_name', 'last_name', 'password', 'email', 'role_id']));
        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    public function destroy($id)
    {
        Gate::authorize('edit', 'users');
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        Gate::authorize('edit', 'users');
        $user = User::find($id);

        $userupdate = $request->only(['first_name', 'last_name', 'email', 'role_id']);
        if ($request->input('password') !== '') {
            $userupdate = $request->only(['first_name', 'last_name', 'email', 'role_id', 'password']);
        }

        $user->update($userupdate);
        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function user()
    {
        $user = Auth::user();
        return (new UserResource($user))->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = Auth::user();
        $user->update($request->only('first_name', 'last_name', 'email'));
        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->update([
            'password' => $request->input('password')
        ]);
        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
