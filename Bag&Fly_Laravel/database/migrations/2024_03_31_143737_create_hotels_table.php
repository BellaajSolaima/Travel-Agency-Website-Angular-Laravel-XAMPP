<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelsTable extends Migration
{
    public function up()
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('nomHotel');
            $table->string('adress');
            $table->integer('nbEtoile');
            $table->string('ville');
            $table->integer('nbVisiteur');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hotels');
    }
}