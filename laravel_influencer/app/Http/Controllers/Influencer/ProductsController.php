<?php

namespace App\Http\Controllers\Influencer;

use App\Product;
use Illuminate\Http\Request;

class ProductsController
{
    public function index()
    {
        return Product::all();
    }
}
