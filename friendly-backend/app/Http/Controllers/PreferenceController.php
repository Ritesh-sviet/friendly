<?php

namespace App\Http\Controllers;
use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PreferenceController extends Controller
{
    public function loadUserPreferences()
    {
        // $preference = Preference::where('user_id', Auth::user()->id)->first();
        $timeFields = ['breakfast', 'lunch', 'dinner', 'wake_time', 'bed_time'];
        // Retrieve the saved preferences with formatted time values
        $formattedPreferences = Preference::find(Auth::user()->id);
        foreach ($timeFields as $field) {
            if ($formattedPreferences->$field) {
                $formattedPreferences->$field = \Carbon\Carbon::parse($formattedPreferences->$field)->format('H:i');
            }
        }
        if ($formattedPreferences) {
            return response()->json(['status' => 'success', 'message' => 'Preference data loaded successfully', 'data' => $formattedPreferences], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Preference data not found please fill and create you preferences'], 404);
        }
    }

    public function updateUserPreferences(Request $request)
    {
        $userPreferences = array_filter($request->all(), function ($value) {
            return !empty($value);
        });
    
        // Convert time values to the correct format using Carbon before saving
        $timeFields = ['breakfast', 'lunch', 'dinner', 'wake_time', 'bed_time'];
        foreach ($timeFields as $field) {
            if (isset($userPreferences[$field])) {
                $userPreferences[$field] = \Carbon\Carbon::parse($userPreferences[$field])->format('H:i');
            }
        }
    
        // Save the preferences
        Preference::updateOrCreate(['user_id' => Auth::user()->id], $userPreferences);
    
        return response()->json(['status' => 'success', 'message' => 'Preference data updated successfully'], 200);
    }
}