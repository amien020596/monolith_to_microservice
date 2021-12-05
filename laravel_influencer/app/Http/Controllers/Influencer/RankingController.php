<?php

namespace App\Http\Controllers\Influencer;

use App\Order;
use App\User;
use Illuminate\Http\Request;

class RankingController
{
    public function index()
    {
        $users = User::where('is_influencer', 1)->get();
        $ranking = $users->map(function (User $user) {
            $orders = Order::Where('user_id', $user->id)->where('complete', 1)->get();

            return [
                'name' => $user->full_name,
                'revenue' => $orders->sum(function (Order $order) {
                    return $order->influencer_total;
                })
            ];
        });
        return $ranking->sortByDesc('revenue')->values();
    }
}
