<?php

use Illuminate\Database\Migrations\Migration; //base class will be extended with migration
use Illuminate\Database\Schema\Blueprint; //as in strcture of each table
use Illuminate\Support\Facades\Schema; // the one that talks with db

return new class extends Migration //with this the laravel automatically runs and finds it (migration inheirts it)
{
    public function up(): void //function (to create the table(s))
    {
        Schema::create('snippets', function (Blueprint $table) { //table name is "snippets", function is what has the columns. (rest is obvious)
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down(): void //reverse of up = drop the table.
    {
        Schema::dropIfExists('snippets');
    }
};
