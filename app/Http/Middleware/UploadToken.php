<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;

class UploadToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response('Invalid access token', 403);
        }

        $token = explode(' ', $token)[1];

        $user = User::where('upload_token', $token)->first();
        if (!$user) {
            return response('Invalid access token', 403);
        }

        $request->setUserResolver(function() use ($user) {
            return $user;
        });

        return $next($request);
    }
}
