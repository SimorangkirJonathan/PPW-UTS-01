<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'year',
        'status'
    ];

    public function borrows()
    {
        return $this->hasMany(Borrow::class);
    }

    public function currentBorrow()
    {
        return $this->hasOne(Borrow::class)->whereNull('returned_at');
    }
}
