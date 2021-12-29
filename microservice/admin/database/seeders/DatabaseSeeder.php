<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use RoleSeeder;

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
            ProductSeeder::class,
            LinkProductSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            RoleSeeder::class,

        ]);
    }
}
