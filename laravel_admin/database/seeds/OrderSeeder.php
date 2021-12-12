<?php

<<<<<<< HEAD
=======
use App\Order;
use App\OrderItem;
>>>>>>> master
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
<<<<<<< HEAD
        factory(\App\Order::class, 30)->create()
            ->each(function (\App\Order $order) {
                factory(\App\OrderItem::class, random_int(1, 5))->create([
                    'order_id' => $order->id,
                ]);
            });
=======
        factory(Order::class, 10)->create()->each(function ($order) {
            factory(OrderItem::class, random_int(1, 5))->create([
                'order_id' => $order->id
            ]);
        });
>>>>>>> master
    }
}
