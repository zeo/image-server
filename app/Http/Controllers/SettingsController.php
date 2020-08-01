<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function generateToken(Request $request)
    {
        $user = $request->user();
        $user->generateUploadToken();

        return response()->json([
            'upload_token' => $user->upload_token
        ]);
    }
}
