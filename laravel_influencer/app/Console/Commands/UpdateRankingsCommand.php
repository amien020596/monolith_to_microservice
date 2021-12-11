<?php

namespace App\Console\Commands;

use App\Order;
use App\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class UpdateRankingsCommand extends Command
{

    protected $signature = 'update:ranking';

    public function handle()
    {
        $users = User::where('is_influencer', 1)->get();
        Log::debug($users);
        $users->each(function (User $user) {
            $orders = Order::Where('user_id', $user->id)->where('complete', 1)->get();
            $revenue =  $orders->sum(function (Order $order) {
                return (int) $order->influencer_total;
            });

            Redis::ZADD('rankings', $revenue, $user->full_name);
        });
        $this->info('The update ranking was successful!');
    }
}
