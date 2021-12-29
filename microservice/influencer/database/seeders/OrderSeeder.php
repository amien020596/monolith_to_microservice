<?php

namespace Database\Seeders;

use App\Models\Order;
use DB;
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
        $orders = DB::connection('old_mysql')->table('orders')->get();
        foreach ($orders as $order) {

            Order::create([
                'id' => $order->id,
                'code' => $order->code,
                'user_id' => empty($order->user_id) ? random_int(1, 10) : $order->user_id,
                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
            ]);
        }
    }
}
