<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OrderCompletedQueue implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $order;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
        Log::debug('data queue', [$order]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::send('influencer.admin', [
            'id' => $this->order['id'],
            'admin_total' => $this->order['admin_total'],
        ], function (Message $message) {
            $message->to('admin@admin.com');
            $message->sender('offdevamienk@gmail.com');
            $message->subject('A new order has been completed!');
        });

        Mail::send('influencer.influencer', [
            'id' => $this->order['id'],
            'influencer_total' => $this->order['influencer_total']
        ], function (Message $message) {
            $message->to($this->order['influencer_email']);
            $message->sender('offdevamienk@gmail.com');
            $message->subject('A new order has been completed!');
        });
    }
}
