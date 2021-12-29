<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImagesUploadRequest;
use Storage;
use Str;

class ImageUploadController
{

    public function upload(ImagesUploadRequest $request)
    {
        $file = $request->file('images');
        $name = Str::random(10);
        $url = Storage::putFileAs('images', $file, $name . '.' . $file->extension());

        return [
            'url' => env('APP_URL') . '/' . $url
        ];
    }
}
