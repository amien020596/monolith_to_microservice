<?php

namespace App\Providers;

use App\Jobs\LinkCreated;
use App\Jobs\OrderCompletedQueue;
use App\Jobs\ProductCreated;
use App\Jobs\ProductDeleted;
use App\Jobs\ProductUpdated;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;


class EventServiceProvider extends ServiceProvider
{


    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        \App::bindMethod(ProductCreated::class, '@handle', function ($job) {
            $job->handle();
        });
        \App::bindMethod(ProductUpdated::class, '@handle', function ($job) {
            $job->handle();
        });
        \App::bindMethod(ProductDeleted::class, '@handle', function ($job) {
            $job->handle();
        });
        \App::bindMethod(LinkCreated::class, '@handle', function ($job) {
            $job->handle();
        });
        \App::bindMethod(OrderCompletedQueue::class, '@handle', function ($job) {
            $job->handle();
        });
    }
}
