<?php

use App\Http\Controllers\MeetingController;
use Illuminate\Support\Facades\Route;

// Fetch all meetings for Dashboard and List views
Route::get('/meetings', [MeetingController::class, 'index']);

// Create initial meeting metadata records
Route::post('/meetings', [MeetingController::class, 'store']);

// Upload/replace the MP3/WAV/M4A recording for a meeting
Route::post('/meetings/{id}/audio', [MeetingController::class, 'uploadAudio']);

// Update fields dynamically when processing NLP transcriptions or changing summaries
Route::put('/meetings/{id}/nlp', [MeetingController::class, 'updateNlp']);