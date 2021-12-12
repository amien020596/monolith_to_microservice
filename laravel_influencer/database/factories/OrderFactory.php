<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Order;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {

    $dt = $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now');
    $date = $dt->format("Y-m-d"); // 1994-09-24
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->email,
        'created_at' => $date
    ];
});
