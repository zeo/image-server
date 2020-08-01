<?php

namespace App\Http\Controllers;

use App\Http\Middleware\UploadToken;
use App\Http\Requests\UploadRequest;
use App\Http\Resources\ImageCollection;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function __construct()
    {
        $this->middleware(UploadToken::class)->only('store');
        $this->middleware('throttle:30,1')->only('store');
        $this->middleware('auth:sanctum')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ImageResource::collection(Image::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UploadRequest $request)
    {
        $file = $request->file('image');
        $path = "{$request->user()->id}/{$file->getClientOriginalName()}";

        Storage::disk('s3')->put(
            $path,
            file_get_contents($file->getRealPath())
        );

        $image = $request->user()->images()->create([
            'path' => $path
        ]);

        return response()->json([
            'image' => $image->id,
            'url' => 'dwa'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Image $image
     * @return ImageResource
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function show(Image $image)
    {
        return new ImageResource($image);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param Image $image
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Request $request, Image $image)
    {
        $user = $request->user();
        if ($user->id !== $image->user->id) abort(403);

        Storage::disk('s3')->delete($image->path);
        $image->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
