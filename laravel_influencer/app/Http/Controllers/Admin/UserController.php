<?php

namespace App\Http\Controllers\Admin;

use App\Events\AddNewAdmin;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Jobs\AdminAdded;
use App\User;
use App\Services\UserServices;

use App\UserRole;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $this->userService->allow('view', 'users');
        // $users = User::with('role')->paginate();
        // return UserResource::collection($users);
        return $this->userService->all($request->input('page', 1));
    }

    public function show($id)
    {
        $this->userService->allow('view', 'users');
        $user = $this->userService->get($id);
        return new UserResource($user);
    }

    public function store(UserCreateRequest $request)
    {
        $this->userService->allow('edit', 'users');

        $data = $request->only(
            [
                'first_name',
                'last_name',
                'password',
                'email',
            ]
        );

        $user = $this->userService->create($data);
        // send email to new user
        AdminAdded::dispatch($user->email);

        // UserRole::create([
        //     'user_id' => $user->id,
        //     'role_id' => 1
        // ]);
        // send email to new user

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $this->userService->allow('edit', 'users');

        Log::debug('user update', [$request->only(['email'])]);
        $userupdate = $request->only(['first_name', 'last_name', 'email']);
        $user = $this->userService->update($userupdate, $id);

        // UserRole::where('user_id', $user->id)->delete();

        // UserRole::create([
        //     'user_id' => $user->id,
        //     'role_id' => $request->input('role_id')
        // ]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->userService->allow('edit', 'users');
        $this->userService->delete($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
