<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserAuthController extends Controller
{
    public function Register(Request $request)
    {
        $register = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'phone_number' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'status' => 'integer',
        ]);

        // here by the combination of user's email and phone number we generate a username
        $uniqueString = $register['email'] . $register['phone_number'];
        $username = Str::limit(hash('sha256', $uniqueString), 7, '');
        $user = User::create([
            'first_name' => $register['first_name'],
            'last_name' => $register['last_name'],
            'email' => $register['email'],
            'phone_number' => $register['phone_number'],
            'password' => Hash::make(($register['password'])),
            'username' => $username,
            'social_security_number' => substr($register['phone_number'] . rand(pow(10, 8 - 1), pow(10, 8) -1), 0, 6),
            'status' => 1,
        ]);

        $currentUser['first_name'] = $user->first_name;
        $currentUser['last_name'] = $user->last_name;
        $currentUser['email'] = $user->email;
        $currentUser['phone'] = $user->phone_number;
        $currentUser['username'] = $user->username;
        $currentUser['social_security_number'] = $user->social_security_number;

        return response()->json(['status' => 'success', 'message' => 'user created successfully', 'data' => $currentUser], 200);
        
    }

    /**
     * Display the specified resource.
     */
    public function Login(Request $request)
    {
        $login = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('email', $login['email'])->first();
        if ($user) {
            if (Hash::check($login['password'], $user->password)) {
                if($user->status === 0){
                    return response()->json(['status' => 'error', 'message' => 'Your account has been deactivated'], 401);
                }
                $token = $user->createToken('auth_token')->plainTextToken;
                $currentUser['token'] = $token;
                $currentUser['firstname'] = $user->first_name;
                $currentUser['lastname'] = $user->last_name;
                $currentUser['email'] = $user->email;
                $currentUser['username'] = $user->username;
                $currentUser['user_profile'] = $user->profile_photo;
                return response()->json(['status'=> 'success', 'message' => 'user logged in successfully', 'data' => $currentUser], 200);
                
            } else {
                return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
            }
        } else {
            return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
        }
    }

    public function updatePassword(Request $request)
    {
        $userValidation = $request->validate([
            'oldpassword' => 'required|string',
            'newpassword' => 'required|string',
        ]);
        $user = User::where('id', Auth::user()->id)->first();
        
        // change the password if old password is correct
        if (!Hash::check($userValidation['oldpassword'], $user->password)) {
            return response()->json(['status' => 'error', 'message' => 'old password is incorrect'], 400);

        }   
        else{
            $user->password = Hash::make($userValidation['newpassword']);
            $user->save();
            return response()->json(['status' => 'success', 'message' => 'password updated successfully'], 200);   
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['status' => 'success', 'message' => 'user logged out successfully'], 200);
    }
}