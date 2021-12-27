<?php

namespace App\Http\Requests;

use App\Services\UserServices;
use Gate;
use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
{
    private $userService;
    public function __construct(UserServices $userService)
    {
        $this->userService = $userService;
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->userService->allow('edit', 'users');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'password_confirm' => 'required|same:password',
        ];
    }
}
