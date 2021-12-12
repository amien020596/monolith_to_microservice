<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyAdminListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $order = $event->order;
        // send email to admin
        Mail::send('influencer.admin', ['order' => $order], function (Message $message) {
            $message->to('admin@admin.com');
            $message->sender('offdevamienk@gmail.com');
            $message->subject('A new order has been completed!');
        });
    }
}
