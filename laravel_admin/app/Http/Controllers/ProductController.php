<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Resources\ProductResource;
use App\Product;
use Gate;
use Illuminate\Http\Request;
use Storage;
use Str;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    //
    public function index()
    {
        Gate::authorize('view', 'products');
        $products = Product::paginate();
        return ProductResource::collection($products);
    }
    public function show($id)
    {
        Gate::authorize('view', 'products');
        return new ProductResource(Product::find($id));
    }
    public function destroy($id)
    {
        Gate::authorize('edit', 'products');
        Product::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
    public function store(CreateProductRequest $request)
    {
        Gate::authorize('edit', 'products');
        $product = Product::create($request->only('title', 'description', 'price', 'image'));
        return response($product, Response::HTTP_CREATED);
    }
    public function update(Request $request, $id)
    {
        Gate::authorize('edit', 'products');
        $product = Product::find($id);
        $product->update($request->only('title', 'description', 'price', 'image'));
        return response($product, Response::HTTP_ACCEPTED);
    }
}
