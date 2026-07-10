<?php

namespace App\Models; // this is where the file lives so that they can reference the class with this address

use Illuminate\Database\Eloquent\Model; //this is to extend base model class

class Snippet extends Model //laravel maps this class to snipet table
{
    protected $fillable = ['title', 'content', 'user_id']; //laravel ignores injections and only allow this three to pass

    public function user() // with this fetch can run and bring user from the database
    {
        return $this->belongsTo(User::class); //"bascially, this user has what id"
    }
}
