<?php

namespace App\Http\Resources;

use App\Models\Image;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ImageResource extends JsonResource
{
    private $image;

    public static $wrap = false;

    public function __construct(Image $image)
    {
        $this->image = $image;

        parent::__construct($image);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->image->id,
            'name' => $this->image->name,
            'size' => $this->image->size,
            'url' => $this->image->url,
            'created_at' => $this->image->created_at->diffForHumans(),
            'user' => $this->image->user,
        ];
    }
}
