<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Gate;
use Microservices\UserServices;
use Response;

class OrderController
{
    private $userServices;
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    public function index()
    {
        $this->userServices->allow('view', 'orders');

        $order = Order::paginate();
        return OrderResource::collection($order);
    }

    public function show($id)
    {
        $this->userServices->allow('view', 'orders');

        return new OrderResource(Order::find($id));
    }
    public function export()
    {
        $this->userServices->allow('view', 'orders');
        // first we need header
        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attechment; filename=orders.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];

        $callback = function () {
            $orders = Order::all();
            $file = fopen('php://output', 'w');
            // Header row
            fputcsv($file, ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']);
            // body
            foreach ($orders as $order) {
                fputcsv($file, [$order->id, $order->name, $order->email, '', '', '']);
                foreach ($order->orderItems as $item) {
                    fputcsv($file, ['', '', '', $item->product_title, $item->price, $item->quantity]);
                }
            }
            fclose($file);
        };
        return Response::stream($callback, 200, $headers);
    }
}
