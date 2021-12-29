<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ProductsController
{
    public function index(Request $request)
    {

        $products = Cache::remember('products', 5, function () {
            return  Product::get();
        });

        if ($s = $request->input('s')) {
            $products = $products->filter(function (Product $product) use ($s) {
                return Str::contains($product->title, $s) || Str::contains($product->description, $s);
            });
        }
        return ProductResource::collection($products);
    }
}
