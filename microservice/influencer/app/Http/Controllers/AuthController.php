<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Microservices\UserServices;


class AuthController extends Controller
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }
    public function user()
    {
        return new UserResource($this->userService->getUser());
    }
}
