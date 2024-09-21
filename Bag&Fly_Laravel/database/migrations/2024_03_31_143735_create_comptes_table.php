<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComptesTable extends Migration
{
    public function up()
    {
        Schema::create('comptes', function (Blueprint $table) {
            $table->id();
            $table->string('Email');
            $table->string('Password');
            $table->unsignedBigInteger('administrator_id')->nullable();
            $table->foreign('administrator_id')->references('id')->on('administrators')->onDelete('cascade');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('comptes');
    }
}