<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Redis;

class RankingController
{
    public function index()
    {
        return Redis::ZREVRANGE('rankings', 0, -1, true);
    }
}
