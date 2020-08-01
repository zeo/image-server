<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'email', 'avatar', 'upload_token'
    ];

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function generateUploadToken()
    {
        $this->update([
            'upload_token' => Str::random(60)
        ]);
    }
}
