<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'price','offer_price','product_image',"category_id"];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
