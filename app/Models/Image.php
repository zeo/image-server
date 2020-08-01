<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    protected $fillable = [
        'path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getNameAttribute()
    {
        $exploded = explode('/', $this->path);
        return $exploded[count($exploded) - 1];
    }

    public function getUrlAttribute()
    {
        return "https://cdn.zeodev.cc/{$this->path}";
    }

    public function getSizeAttribute()
    {
        $size = null;
        if (Cache::has("image-size-{$this->id}")) {
            $size = Cache::get("image-size-{$this->id}");
        } else {
            $size = Storage::disk('s3')->size($this->path);
            Cache::put("image-size-{$this->id}", $size, 3600);
        }

        $base = log($size, 1024);
        $suffixes = array('', 'KB', 'MB', 'GB', 'TB');

        return round(pow(1024, $base - floor($base)), 2) .' '. $suffixes[floor($base)];
    }
}
