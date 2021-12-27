<?php

namespace App\Http\Controllers\Influencer;

use App\Link;
use App\Order;
use App\Services\UserServices;
use Illuminate\Http\Request;

class StatsController
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $user = $this->userService->getUser();

        $links = Link::where('user_id', $user->id)->get();

        return $links->map(function (Link $link) {
            $orders = Order::where('code', $link->code)->where('complete', 1)->get();
            return [
                'code' => $link->code,
                'count' => $orders->count(),
                'revenue' => $orders->sum(function (Order $order) {
                    return $order->influencer_total;
                })
            ];
        });
    }
}
