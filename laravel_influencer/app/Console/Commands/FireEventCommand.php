<?php

namespace App\Console\Commands;

use App\Jobs\AdminAdded;
use App\Jobs\OrderCompletedQueue;
use App\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class FireEventCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fire';


    public function handle()
    {
        $order = Order::find('17');
        $data = $order->toArray();
        $data['influencer_total'] = $order->influencer_total;
        $data['admin_total'] = $order->admin_total;
        Log::debug("data event", [$data]);
        OrderCompletedQueue::dispatch($data);
    }
}
