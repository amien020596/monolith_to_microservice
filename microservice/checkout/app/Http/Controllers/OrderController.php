<?php

namespace App\Http\Controllers;

use App\Events\OrderCompleteEvent;
use App\Jobs\OrderCompletedQueue;
use App\Models\Link;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Cartalyst\Stripe\Stripe;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Microservices\UserServices;

class OrderController
{
    public function store(Request $request)
    {

        $link = Link::whereCode($request->input('code'))->first();
        DB::beginTransaction();
        $user = (new UserServices())->get($link->user_id);

        $order = new Order();
        $order->first_name = $request->input('first_name');
        $order->last_name = $request->input('last_name');
        $order->email = $request->input('email');
        $order->code = $request->input('code');
        $order->user_id = $user->id;
        $order->influencer_email = $user->email;

        $order->address = $request->input('address');
        $order->address2 = $request->input('address2');
        $order->city = $request->input('city');
        $order->country = $request->input('country');
        $order->zip = $request->input('zip');
        $order->save();

        $lineItems = [];
        foreach ($request->input('items') as $item) {
            $product = Product::find($item['product_id']);

            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_title = $product->title;
            $orderItem->price = $product->price;
            $orderItem->quantity = $item['quantity'];
            $orderItem->influencer_revenue = 0.1 * $product->price * $item['quantity'];
            $orderItem->admin_revenue = 0.9 * $product->price * $item['quantity'];
            $orderItem->save();

            $lineItems[] = [
                'name' => $product->title,
                'description' => $product->description,
                'images' => [
                    $product->image,
                ],
                'amount' => 100 * $product->price,
                'currency' => 'usd',
                'quantity' => $orderItem->quantity
            ];
        }

        $stripe = Stripe::make(env('STRIPE_SECRET'));
        $source = $stripe->checkout()->sessions()->create([
            'payment_method_types' => ['card'],
            'line_items' =>  $lineItems,
            'success_url' => env('CHECKOUT_URL') . '/success?source={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('CHECKOUT_URL') . '/error'
        ]);

        $order->transaction_id = $source['id'];
        $order->save();

        DB::commit();
        return $source;
    }

    public function confirm(Request $request)
    {
        $order = Order::whereTransactionId($request->input('source'))->first();

        if (!$order) {
            return response([
                'error' => 'Order not found!'
            ]);
        }
        $order->complete = 1;
        $order->save();

        // make event to send notify to admin and influencer
        // event(new OrderCompleteEvent($order));

        $data = $order->toArray();
        $data['influencer_total'] = $order->influencer_total;
        $data['admin_total'] = $order->admin_total;

        $orderItems = [];
        foreach ($order->orderItems as $item) {
            $orderItems[] = $item->toArray();
        }

        OrderCompletedQueue::dispatch($data, $orderItems);

        return response([
            'message' => 'success'
        ]);
    }
}
