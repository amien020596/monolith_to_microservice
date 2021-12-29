<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChartResource;
use App\Models\Order;
use Microservices\UserServices;

class DashboardController
{
    private $userServices;
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }
    public function chartOrder()
    {
        $this->userServices->allow('view', 'orders');

        $orders = Order::query()
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->selectRaw("DATE_FORMAT(orders.created_at, '%Y-%m-%d') as date,sum(order_items.quantity * order_items.price) as sum")
            ->groupBy('date')
            ->get();
        return ChartResource::collection($orders);
    }
}
