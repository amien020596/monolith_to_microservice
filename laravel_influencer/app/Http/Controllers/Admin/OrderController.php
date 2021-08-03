<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\OrderResource;
use App\Order;
use Gate;
use Illuminate\Http\Request;
use Response;

class OrderController
{
    public function index()
    {
        Gate::authorize('view', 'orders');
        $order = Order::paginate();
        return OrderResource::collection($order);
    }

    public function show($id)
    {
        Gate::authorize('view', 'orders');
        return new OrderResource(Order::find($id));
    }
    public function export()
    {
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
