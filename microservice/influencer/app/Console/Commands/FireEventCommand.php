<?php

namespace App\Console\Commands;

use App\Jobs\AdminAdded;
use App\Jobs\OrderCompletedQueue;
use App\Jobs\ProductCreated;
use App\Order;
use App\Product;
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
        $product = Product::find(1);
        ProductCreated::dispatch($product->toArray());
    }
}
