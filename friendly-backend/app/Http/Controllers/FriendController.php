<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendController extends Controller
{


    public function userFriends()
    {
        $user = User::all();
        // $allEmails = $user->pluck('email')->toArray();
        // $friend = Friend::whereIn('email', $allEmails)->get();
        // $userIds = $friend->pluck('user_id')->toArray();
        // $Alluser = User::whereIn('id', $userIds)->get();
        // $Alluser = User::select('id', 'email')->whereIn('id', $userIds)->get();
        
        // Get the authenticated user's ID
        $userId = Auth::user()->id;

        // Retrieve all friends for the user
        $friends = Friend::where("user_id", $userId)->get();

        // Check if any friends are found
        if ($friends->isEmpty()) {
            return response()->json(['status' => 'error', 'message' => 'No friends found for the user', 'data' => []]);
        }

        // Extract emails from the friends
        $friendEmails = $friends->pluck('email')->toArray();
        // $friendEmails = $friends->pluck('email')->toArray(); // changes made here

        // Retrieve all users with matching emails
        $users = User::whereIn("email", $friendEmails)->get();

        // Create an associative array using email as the key for quick lookup
        $userLookup = $users->keyBy('email');

        // Initialize an array to store the final data
        $userData = [];

        // Loop through each friend and decide whether to use user data or friend data
        foreach ($friends as $friend) {
            $email = $friend->email;
            

            // Check if the user exists for the given email
            
            if ($userLookup->has($email)) {
                // Use data from the User table
                // $userData[] = $userLookup->get();
                $userData[] = $userLookup->get($email);
            } else {
                // Use data from the Friend table
                $userData[] = $friend;
            }
        }

        // Return the response with the final data
        return response()->json(['status' => 'success', 'message' => 'Friends loaded successfully', 'data' => $userData]);
    }







    public function inviteFriends(Request $request){

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'message' => 'nullable|string',
        ]);
        $friend =Friend::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'status' => 0,
        ]);
        if($friend){
        return response()->json(['status'=> 'success', 'message'=> 'invite sent successfully', 'data' => $friend], 200);
        }
        else{
            return response()->json(['status'=> 'error', 'message'=> 'invite sent failed'], 500);
        }
    }
}