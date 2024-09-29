<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::with('products')->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_image' => 'nullable|image|max:5130',
        ]);

        if ($request->hasFile('category_image')) {
            $path = $request->file('category_image')->store('category_images', 'public');
            $validatedData['category_image'] = $path;
        }

        $category = Category::create($validatedData);
        return response()->json($category, 201);
    }

    /**
     * Display the specified category.
     */
    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return response()->json($category);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('category_image')) {
            // Delete the old image
            if ($category->category_image) {
                Storage::disk('public')->delete($category->category_image);
            }
            // Store the new image
            $path = $request->file('category_image')->store('category_images', 'public');
            $validatedData['category_image'] = $path;
        }

        $category->update($validatedData);
        return response()->json($category);
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->category_image) {
            Storage::disk('public')->delete($category->category_image);
        }

        $category->delete();
        return response()->json(null, 204);
    }
}
