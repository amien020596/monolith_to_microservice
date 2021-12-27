<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginatedResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        if ((int)$request->input('page') === -1) {
            return User::all();
        }
        return PaginatedResource::collection(User::paginate());
    }

    public function show($id)
    {
        return User::find($id);
    }
    public function store(Request $request)
    {
        $data = $request->only('first_name', 'last_name', 'email', 'password');
        $user = User::create($data);
        return response($user);
    }
    public function update(Request $request, $id)
    {
        $data = $request->only('first_name', 'last_name', 'email');
        $user = User::find($id);
        $user->update($data);
        $user->save();
        return response($user, Response::HTTP_ACCEPTED);
    }
    public function destroy($id)
    {
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
