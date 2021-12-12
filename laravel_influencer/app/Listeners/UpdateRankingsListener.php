<?php

namespace App\Listeners;

use App\Events\OrderCompleteEvent;
use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Redis;

class UpdateRankingsListener
{

    public function handle(OrderCompleteEvent $event)
    {
        $order = $event->order;
        $revenue = $order->influencer_total;
        $user = User::find($order->user_id);
        Redis::ZINCBY('rankings', $revenue, $user->full_name);
    }
}
