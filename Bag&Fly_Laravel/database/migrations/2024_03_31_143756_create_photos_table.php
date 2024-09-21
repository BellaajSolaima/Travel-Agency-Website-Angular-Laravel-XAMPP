<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('photo1');
            $table->string('photo2');
            $table->string('photo3');
            $table->string('photo4');
            $table->string('photo5');
            $table->foreignId('hotel_id')->constrained('hotels')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('photos');
    }
}