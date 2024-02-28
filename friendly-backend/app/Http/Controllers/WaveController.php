<?php

namespace App\Http\Controllers;

use App\Models\Wave;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
class WaveController extends Controller
{
    public function allWaves(){
        
        // for the functionality there is a function  named restoreTrashedWaves in wave model that handle the restoration of the all the deleted waves that will automatically set the is_deleted value to 0
        //  Wave::restoreTrashedWaves();           // this is how the restoration of deleted waves can be accessed and again seen by everyone
        // Eager load the user relationship to avoid N+1 query issues

        
        // get the profile image from respose too
        $waves = Wave::with('user')->get();
        return response()->json(['status' => 'success', 'data' => $waves], 200);
    }
    public function waveIndex(){
        // $waves = Wave::with('user')->get();
        $waves=Wave::where('user_id', Auth::user()->id)->with('user')->get();
        return response()->json(['status' => 'success', 'data' => $waves], 200);
    }


    public function uploadNewWave(Request $request){
        // validation
        $request->validate([
            'wave_name' => 'required|mimes:jpeg,png,jpg,gif,svg',
            'wave_message' => 'required|string',
            'wave_status' => 'required|string',
        ]);
        // Handle file upload
        $image = $request->file('wave_name');
        $imageName = Carbon::now()->format('Y-m-d_H-i-s') . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);

        // Create wave record
        Wave::create([
            'user_id' => Auth::user()->id,
            'wave_name' => $imageName,
            'wave_message' => $request->input('wave_message'),
            'wave_status' => $request->input('wave_status'),
            'status' => 1,
        ]);

        return response()->json(['status' => 'success', 'message' => 'Wave created successfully'], 200);
    }

    public function updateWave(Request $request){
        $request->validate([
            'id' => 'required',
            'user_id' => 'required',
            'wave_status'=>'required',
            'wave_message' => 'required',
        ]);
        $wave = Wave::where('user_id', $request->user_id)->where('id', $request->id)->first();
        $wave->wave_status = $request->wave_status;
        $wave->wave_message = $request->wave_message;
        $wave->save();
        if($wave){
            return response()->json(['status'=> 'success', 'message' => 'Wave updated successfully'], 200);
        }
        else
        {
            return response()->json(['status'=> 'error', 'message' => 'Wave not found'], 404);
        }
    }

    public function updateWaveStatus($id, Request $request){
        // Validate the request if needed
        $request->validate([
            'wave_status' => 'required|in:active,inactive',
        ]);

        try {
            // Find the wave by ID
            $wave = Wave::findOrFail($id);

            // Update the wave_status
            $wave->update([
                'wave_status' => $request->input('wave_status'),
            ]);

            return response()->json(['status' => 'success', 'message' => 'Wave status updated successfully']);
        } catch (\Exception $e) {
            // Handle the error
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}