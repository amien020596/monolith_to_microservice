<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifyAddedNewAdmin
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
        $user = $event->user;
        // send email to influencer
        Mail::send('admin.addedAdmin', [], function (Message $message) use ($user) {
            $message->to($user->email);
            $message->sender('offdevamienk@gmail.com');
            $message->subject('You have new email!');
        });
    }
}
