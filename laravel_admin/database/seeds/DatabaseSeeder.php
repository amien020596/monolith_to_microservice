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
<<<<<<< HEAD
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            UserSeeder::class,
            ProductSeeder::class,
            OrderSeeder::class
        ]);
=======
<<<<<<< HEAD
        // $this->call(UsersTableSeeder::class);
=======
        $this->call([
            RoleSeeder::class,
            UserTableSeeder::class,
            ProductSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            OrderSeeder::class
        ]);
>>>>>>> section2
>>>>>>> master
    }
}
