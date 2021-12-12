<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

<<<<<<< HEAD
use Faker\Generator as Faker;

$factory->define(\App\Order::class, function (Faker $faker) {
=======
use App\Order;
use Faker\Generator as Faker;

$factory->define(Order::class, function (Faker $faker) {

    $dt = $faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now');
    $date = $dt->format("Y-m-d"); // 1994-09-24
>>>>>>> master
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->email,
<<<<<<< HEAD
        'created_at' => $faker->dateTime,
=======
        'created_at' => $date
>>>>>>> master
    ];
});
