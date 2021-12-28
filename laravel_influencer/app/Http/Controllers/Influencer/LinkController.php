<?php

namespace App\Http\Controllers\Influencer;

use App\Http\Resources\LinkResource;
use App\Jobs\LinkCreated;
use App\Link;
use App\LinkProduct;
use App\Services\UserServices;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class LinkController
{
    private $userServices;
    public function __construct(UserServices $userServices)
    {
        $this->userServices = $userServices;
    }

    public function store(Request $request)
    {
        $user = $this->userServices->getUser();

        $link = Link::create(
            [
                'user_id' => $user->id,
                'code' => Str::random(6)
            ]
        );
        $linkProducts = [];
        foreach ($request->input('products') as $product_id) {
            $linkProduct = LinkProduct::create([
                'link_id' => $link->id,
                'product_id' => $product_id
            ]);
            $linkProducts[] = $linkProduct->toArray();
        }
        LinkCreated::dispatch($link, $linkProducts);
        return new LinkResource($link);
    }
}
