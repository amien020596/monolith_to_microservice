<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use DB;
use Gate;
use Illuminate\Http\Request;
use Microservices\UserServices;
use Symfony\Component\HttpFoundation\Response;

class RoleController
{
    private $userServices;
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }
    public function index()
    {
        $this->userServices->allow('view', 'roles');
        $role = Role::all();
        return RoleResource::collection($role);
    }

    public function store(Request $request)
    {
        $this->userServices->allow('edit', 'roles');
        $role = Role::create($request->only('name'));

        if ($permissions = $request->input('permissions')) {
            foreach ($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id
                ]);
            }
        }

        return response(new RoleResource($role), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $this->userServices->allow('view', 'roles');
        return new RoleResource(Role::find($id));
    }

    public function update(Request $request, $id)
    {
        $this->userServices->allow('edit', 'roles');
        $role =  Role::find($id);
        $role->update($request->only('name'));

        DB::table('role_permission')->where('role_id', $role->id)->delete();

        if ($permissions = $request->input('permissions')) {
            foreach ($permissions as $permission_id) {
                DB::table('role_permission')->insert([
                    'role_id' => $role->id,
                    'permission_id' => $permission_id
                ]);
            }
        }

        return response(new RoleResource($role), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->userServices->allow('edit', 'roles');
        DB::table('role_permission')->where('role_id', $id)->delete();
        Role::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
