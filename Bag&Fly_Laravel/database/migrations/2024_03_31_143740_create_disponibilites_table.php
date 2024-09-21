<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDisponibilitesTable extends Migration
{
    public function up()
    {
        Schema::create('disponibilites', function (Blueprint $table) {
            $table->id();
            $table->string('dateDebut');
            $table->string('dateFin');
            $table->integer('nbChambre2');
            $table->integer('nbChambreRestantes2');
            $table->integer('prixChambre2');
            $table->integer('nbChambre3');
            $table->integer('nbChambreRestantes3');
            $table->integer('prixChambre3');
            $table->integer('nbChambre4');
            $table->integer('nbChambreRestantes4');
            $table->integer('prixChambre4');
            $table->unsignedBigInteger('hotel_id')->nullable();
            $table->foreign('hotel_id')->references('id')->on('hotels')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('disponibilites');
    }
}