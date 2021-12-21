<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = DB::connection('old_mysql')->table('users')->get();

        foreach ($users as $key => $value) {
            User::create([
                'first_name' => $value->first_name,
                'last_name' => $value->last_name,
                'email' => $value->email,
                'password' => "password",
                'created_at' => $value->created_at,
                'updated_at' => $value->updated_at,
                'is_influencer' => $value->is_influencer

            ]);
        }
    }
}
