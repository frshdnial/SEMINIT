<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MeetingController extends Controller
{
    // GET /api/meetings (Fetch all meetings)
    public function index()
    {
        return response()->json(Meeting::orderBy('created_at', 'desc')->get());
    }

    // POST /api/meetings (Create a new record from CreateMeetingScreen)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string',
            'date' => 'nullable|date',
            'start_time' => 'nullable',
            'end_time' => 'nullable',
            'participants' => 'nullable|string', 
            'agenda' => 'nullable|string',
        ]);

        $meeting = Meeting::create($validated);

        return response()->json([
            'message' => 'Mesyuarat berjaya disimpan!',
            'meeting' => $meeting
        ], 201);
    }

    // POST /api/meetings/{id}/audio (Upload/replace the recorded MP3/WAV/M4A file from AudioUploadScreen)
    public function uploadAudio(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        // 'mimes' checks the file extension; audio files reliably arrive with
        // one of these three extensions from the frontend's document picker.
        // 51200 KB = 50 MB ceiling, matched by the frontend's own pre-check.
        $request->validate([
            'audio' => 'required|file|mimes:mp3,wav,m4a,mpga|max:51200',
        ]);

        // Delete the previous file (if any) so re-uploads don't pile up storage
        if ($meeting->audio_path) {
            Storage::disk('public')->delete($meeting->audio_path);
        }

        // Stored under storage/app/public/meeting_audio, publicly served via
        // the storage:link symlink at /storage/meeting_audio/<generated-name>
        $path = $request->file('audio')->store('meeting_audio', 'public');

        $meeting->update([
            'audio_path' => $path,
            'status' => 'Pending Audio',
        ]);

        return response()->json([
            'message' => 'Fail audio berjaya dimuat naik!',
            'meeting' => $meeting->fresh(),
        ]);
    }

    // PUT /api/meetings/{id}/nlp (Update transcript and summary from AudioUploadScreen/FormatMinutesScreen)
    public function updateNlp(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        $validated = $request->validate([
            'transcript' => 'nullable|string',
            'summary' => 'nullable|string',
            'status' => 'nullable|string'
        ]);

        $meeting->update($validated);

        return response()->json([
            'message' => 'Data AI berjaya dikemaskini!',
            'meeting' => $meeting
        ]);
    }
}