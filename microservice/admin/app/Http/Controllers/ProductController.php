<?php

namespace App\Http\Controllers;


use App\Http\Requests\CreateProductRequest;
use App\Http\Resources\ProductResource;
use App\Jobs\ProductCreated;
use App\Jobs\ProductDeleted;
use App\Jobs\ProductUpdated;
use App\Models\Product;
use Gate;
use Illuminate\Http\Request;
use Microservices\UserServices;
use Symfony\Component\HttpFoundation\Response;

class ProductController
{
    private $userServices;
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    public function index()
    {
        $this->userServices->allow('view', 'products');
        $products = Product::paginate();
        return ProductResource::collection($products);
    }

    public function show($id)
    {
        $this->userServices->allow('view', 'products');
        return new ProductResource(Product::find($id));
    }

    public function destroy($id)
    {
        $this->userServices->allow('edit', 'products');
        Product::destroy($id);
        ProductDeleted::dispatch($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function store(CreateProductRequest $request)
    {
        $this->userServices->allow('edit', 'products');
        $product = Product::create($request->only('title', 'description', 'price', 'image'));
        // event(new ProductUpdatedEvent());

        ProductCreated::dispatch($product->toArray());
        return response($product, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {

        $this->userServices->allow('edit', 'products');
        $product = Product::find($id);
        $product->update($request->only('title', 'description', 'price', 'image'));

        // event(new ProductUpdatedEvent());

        ProductUpdated::dispatch($product->toArray());
        return response($product, Response::HTTP_ACCEPTED);
    }
}
