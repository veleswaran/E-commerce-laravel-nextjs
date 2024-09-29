<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($productId)
    {
        $product = Product::with('reviews.user')->findOrFail($productId);
        return response()->json($product->reviews);
    }

    public function store(Request $request, $productId)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review = new Review($validatedData);
        $review->product_id = $productId;
        $review->save();

        return response()->json($review, 201);
    }

    public function show($productId, $reviewId)
    {
        $review = Review::where('product_id', $productId)->findOrFail($reviewId);
        return response()->json($review);
    }

    public function update(Request $request, $productId, $reviewId)
    {
        $review = Review::where('product_id', $productId)->findOrFail($reviewId);

        $validatedData = $request->validate([
            'review' => 'sometimes|required|string',
            'rating' => 'sometimes|required|integer|min:1|max:5',
        ]);

        $review->update($validatedData);

        return response()->json($review);
    }

    public function destroy($productId, $reviewId)
    {
        $review = Review::where('product_id', $productId)->findOrFail($reviewId);
        $review->delete();

        return response()->json(null, 204);
    }
}
