<?php

namespace App\Listeners;

use App\Events\OrderCompleteEvent;
use App\Services\UserServices;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Redis;

class UpdateRankingsListener
{

    public function handle(OrderCompleteEvent $event)
    {
        $order = $event->order;
        $revenue = $order->influencer_total;
        $userService = new UserServices();
        $user = $userService->get($order->user_id);
        Redis::ZINCRBY('rankings', $revenue, $user->full_name);
    }
}
