<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function discord()
    {
        $url = Socialite::driver('discord')->stateless()->redirect()->getTargetUrl();
        return response()->json([
            'redirect_url' => $url
        ]);
    }

    public function github()
    {
        $url = Socialite::driver('github')->stateless()->redirect()->getTargetUrl();
        return response()->json([
           'redirect_url' => $url
        ]);
    }

    public function authDiscord()
    {
        $user = Socialite::driver('discord')->stateless()->user();
        return $this->login($user->getEmail(), $user->getNickname(), $user->getAvatar());
    }

    public function authGithub()
    {
        $user = Socialite::driver('github')->stateless()->user();
        return $this->login($user->getEmail(), $user->getName(), $user->getAvatar());
    }

    private function login($email, $name, $avatar)
    {
        $user = User::where('email', $email)->first();
        if (is_null($user)) {
            $user = User::create([
                'email' => $email,
                'name' => $name,
                'avatar' => $avatar,
                'upload_token' => Str::random(60)
            ]);
        }

        $token = $user->createToken("api-token")->plainTextToken;
        //Auth::login($user);

        return redirect('/auth/token/' . $token);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
    }
}
