<?php

namespace App\Http\Controllers\Admin;

use App\Events\AddNewAdmin;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\User;
use App\UserRole;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController
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
        $user = User::create($request->only(
            [
                'first_name',
                'last_name',
                'password',
                'email',
                'role_id' => 1,
            ]
        ));
        // send email to new user
        event(new AddNewAdmin($user));
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

        $userupdate = $request->only(['first_name', 'last_name', 'email']);
        if ($request->input('password') !== '') {
            $userupdate = $request->only(['first_name', 'last_name', 'email', 'password']);
        }

        $user->update($userupdate);

        UserRole::where('user_id', $user->id)->delete();

        UserRole::create([
            'user_id' => $user->id,
            'role_id' => $request->input('role_id')
        ]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
