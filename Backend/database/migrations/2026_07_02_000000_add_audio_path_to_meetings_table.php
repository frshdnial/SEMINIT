<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Adds a nullable audio_path column to the existing `meetings` table so we
     * can store the relative storage path of the uploaded MP3/WAV/M4A file
     * (e.g. "meeting_audio/abc123.mp3"). We store the path, not the full URL,
     * so the frontend can build the URL from whichever host it is running on.
     */
    public function up(): void
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->string('audio_path')->nullable()->after('agenda');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->dropColumn('audio_path');
        });
    }
};