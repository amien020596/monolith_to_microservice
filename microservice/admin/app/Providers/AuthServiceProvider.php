<?php

namespace App\Providers;

use App\Models\Role;
use App\Models\UserRole;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->registerPolicies();

        Gate::define('view', function ($user, $model) {
            $userRole = UserRole::where('user_id', $user->id)->first();
            $role = Role::find($userRole->role_id);
            $permission = $role->permission->pluck('name');

            return $permission->contains("view_{$model}") || $permission->contains("edit_{$model}");
        });

        Gate::define('edit', function ($user, $model) {
            $userRole = UserRole::where('user_id', $user->id)->first();
            $role = Role::find($userRole->role_id);
            $permission = $role->permission->pluck('name');

            return $permission->contains("edit_{$model}");
        });
    }
}
