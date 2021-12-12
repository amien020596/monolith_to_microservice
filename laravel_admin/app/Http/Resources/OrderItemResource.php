<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
<<<<<<< HEAD
     * @param \Illuminate\Http\Request $request
     *
=======
     * @param  \Illuminate\Http\Request  $request
>>>>>>> master
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_title' => $this->product_title,
            'price' => (float) $this->price,
<<<<<<< HEAD
            'quantity' => (int) $this->quantity,
=======
            'quantity' => (int) $this->quantity
>>>>>>> master
        ];
    }
}
