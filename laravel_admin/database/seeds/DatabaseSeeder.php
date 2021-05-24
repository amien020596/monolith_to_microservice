<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserTableSeeder::class,
            ProductSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class
        ]);
    }
}
