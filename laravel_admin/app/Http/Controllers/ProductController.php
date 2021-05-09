<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Resources\ProductResource;
use App\Product;
use Illuminate\Http\Request;
use Storage;
use Str;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::paginate();
        return ProductResource::collection($products);
    }
    public function show($id)
    {
        return new ProductResource(Product::find($id));
    }
    public function destroy($id)
    {
        Product::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
    public function store(CreateProductRequest $request)
    {
        $product = Product::create($request->only('title', 'description', 'price', 'images'));
        return response($product, Response::HTTP_CREATED);
    }
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->only('title', 'description', 'price', 'images'));
        return response($product, Response::HTTP_ACCEPTED);
    }
}
