<?php

namespace App\Http\Controllers\Influencer;

use App\Http\Resources\ProductResource;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductsController
{
    public function index(Request $request)
    {

        return Cache::remember('products', 5, function () use ($request) {
            sleep(10);
            $query = Product::query();
            if ($s = $request->input('s')) {
                $query->whereRaw("title LIKE '%{$s}%'")
                    ->orWhereRaw("description LIKE '%{$s}%'");
            }
            return ProductResource::collection($query->get());
        });
    }
}
