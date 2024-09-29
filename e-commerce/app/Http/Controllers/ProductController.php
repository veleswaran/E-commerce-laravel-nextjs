<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::with('reviews.user')->get();
        return response()->json($products);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'offer_price' => 'nullable|numeric',
            'product_image' => 'nullable|image|max:2048',
            'category_id' => 'required|exists:categories,id', // Assuming you have a categories table
        ]);

        if ($request->hasFile('product_image')) {
            $path = $request->file('product_image')->store('product_images', 'public');
            $validatedData['product_image'] = $path;
        }

        $product = Product::create($validatedData);
        return response()->json($product, 201);
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        $product = Product::with('reviews')->findOrFail($id);
        return response()->json($product);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'offer_price' => 'nullable|numeric',
            'product_image' => 'nullable|image|max:2048',
            'category_id' => 'required|exists:categories,id', // Validate category_id
        ]);

        if ($request->hasFile('product_image')) {
            // Delete the old image if it exists
            if ($product->product_image) {
                Storage::disk('public')->delete($product->product_image);
            }
            // Store the new image
            $path = $request->file('product_image')->store('product_images', 'public');
            $validatedData['product_image'] = $path;
        }

        $product->update($validatedData);
        return response()->json($product);
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete the product image if it exists
        if ($product->product_image) {
            Storage::disk('public')->delete($product->product_image);
        }

        $product->delete();
        return response()->json(null, 204);
    }

    /**
     * Store a newly created review for a product.
     */
    public function storeReview(Request $request, $productId)
    {
        $validatedData = $request->validate([
            'review' => 'required|string|max:1000',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $product = Product::findOrFail($productId);
        $review = $product->reviews()->create($validatedData);

        return response()->json($review, 201);
    }

    /**
     * Display all reviews for a specific product.
     */
    public function showReviews($productId)
    {
        $product = Product::with('reviews')->findOrFail($productId);
        return response()->json($product->reviews);
    }
}
