<?php

namespace App\Services;

use App\User;
use Http;
use Illuminate\Support\Facades\Log;

class UserServices
{
  private $endpoint = 'http://host.docker.internal';
  public function headers()
  {
    return [
      'Authorization' => request()->headers->get('Authorization')
    ];
  }

  public function getUser(): User
  {
    $response = Http::withHeaders($this->headers())->get("$this->endpoint:8016/api/user");


    $json = $response->json();
    $user = new User();
    $user->id = $json['id'];
    $user->first_name = $json['first_name'];
    $user->last_name = $json['last_name'];
    $user->email = $json['email'];
    $user->is_influencer = $json['is_influencer'];

    return $user;
  }
}
