<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class Meeting extends Model
{
    use HasFactory;

    // Define fillable fields for mass assignment
    protected $fillable = [
        'name',
        'location',
        'date',
        'start_time',
        'end_time',
        'participants',
        'agenda',
        'audio_path',
        'status',
        'transcript',
        'summary'
    ];

    // Cast attributes if they are being submitted as JSON objects from frontend arrays
    protected $casts = [
        'participants' => 'string',
        'agenda' => 'string',
    ];

    // Automatically include the computed audio_url field whenever this model is serialized to JSON
    protected $appends = ['audio_url'];

    /**
     * Build a full, publicly playable URL from the stored audio_path so the
     * frontend never has to know about the storage disk layout.
     */
    protected function audioUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->audio_path
                ? Storage::disk('public')->url($this->audio_path)
                : null,
        );
    }
}