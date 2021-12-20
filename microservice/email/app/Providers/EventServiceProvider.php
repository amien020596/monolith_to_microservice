<?php

namespace App\Providers;

use App;
use App\Jobs\AdminAdded;
use App\Jobs\OrderCompletedQueue;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        App::bindMethod(AdminAdded::class, '@handle', function ($job) {
            return $job->handle();
        });
        App::bindMethod(OrderCompletedQueue::class, '@handle', function ($job) {
            return $job->handle();
        });
    }
}
