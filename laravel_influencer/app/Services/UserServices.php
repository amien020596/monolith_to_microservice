<?php

namespace App\Services;

use App\User;
use Gate;
use Http;
use Illuminate\Support\Facades\Log;
use Request;

class UserServices
{
  private $endpoint = 'http://host.docker.internal';
  public function headers()
  {
    return [
      'Authorization' => request()->headers->get('Authorization')
    ];
  }
  public function request()
  {

    return Http::withHeaders($this->headers());
  }

  public function getUser(): User
  {
    $response = $this->request()->get("$this->endpoint:8016/api/user")->json();
    return new User($response);
  }

  public function isAdmin()
  {
    return $this->request()->get("$this->endpoint:8016/api/admin")->successful();
  }

  public function isInfluencer()
  {
    return $this->request()->get("$this->endpoint:8016/api/influencer")->successful();
  }

  public function allow($ability, $argument)
  {
    return  Gate::forUser($this->getUser())->authorize($ability, $argument);
  }

  public function all($page)
  {
    return $this->request()->get("$this->endpoint:8016/api/users?page=$page")->json();
  }

  public function get($id): User
  {
    $json =  $this->request()->get("$this->endpoint:8016/api/users/$id")->json();
    return new User($json);
  }

  public function create($data)
  {
    $json =  $this->request()->post("$this->endpoint:8016/api/users", $data)->json();
    return new User($json);
  }

  public function update($data, $id)
  {
    $json =  $this->request()->put("$this->endpoint:8016/api/users/$id", $data)->json();
    return new User($json);
  }

  public function delete($id)
  {
    return  $this->request()->delete("$this->endpoint:8016/api/users/$id")->json();
  }
}
