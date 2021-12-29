<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Microservices\UserServices;

class UpdateRankingsCommand extends Command
{

    protected $signature = 'update:ranking';

    public function handle()
    {
        $userService = new UserServices();

        $users = collect($userService->all(-1));

        $users = $users->filter(function ($user) {
            return $user->is_influencer;
        });

        $users->each(function ($user) {
            $orders = Order::Where('user_id', $user->id)->get();
            $revenue =  $orders->sum(function (Order $order) {
                return (int) $order->total;
            });

            Redis::ZADD('rankings', $revenue, $user->fullName());
        });
        $this->info('The update ranking was successful!');
    }
}
