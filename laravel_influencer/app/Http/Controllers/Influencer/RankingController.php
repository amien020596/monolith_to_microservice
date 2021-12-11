<?php

namespace App\Http\Controllers\Influencer;

use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;

class RankingController
{
    public function index()
    {
        return Redis::ZREVRANGE('rankings', 0, -1, true);
    }
}
