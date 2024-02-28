<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use App\Models\Wave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function adminRegister(Request $request)
    {
        $register = $request->validate([
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'full_name' => 'required|string',
        ]);
        $admin = Admin::create([
            'email' => $register['email'],
            'password' => Hash::make(($register['password'])),
            'full_name' => $register['full_name'],
        ]);
        if($admin){
            $currentAdmin['email'] = $admin->email;
            $currentAdmin['full_name'] = $admin->full_name;
            return response()->json(['status' => 'success', 'message' => 'admin created successfully', 'data' => $currentAdmin], 200);
        }
        else{
            return response()->json(['status' => 'error', 'message' => 'admin not created'], 404);
        }
    }

    public function adminLogin(Request $request)
    {
        $login = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);
        $admin = Admin::where('email', $login['email'])->first();
        if ($admin) {
            if (Hash::check($login['password'], $admin->password)) {
                $token = $admin->createToken('auth_token')->plainTextToken;
                $currentAdmin['token'] = $token;
                $currentAdmin['email'] = $admin->email;
                return response()->json(['status'=> 'success', 'message' => 'admin logged in successfully', 'data' => $currentAdmin], 200);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Invalid credentials'], 401);
            }
        } else {
            return response()->json(['status' => 'error', 'message' => 'admin not found'], 404);
        }
    }

    public function adminLogout()
    {
        $logout = auth()->user()->tokens()->delete();
        if($logout){
        return response()->json(['status' => 'success', 'message' => 'admin logged out successfully'], 200);
        }
        else{
            return response()->json(['status' => 'error', 'message' => 'admin not logged out'], 404);
        }
    }

    public function allUsers(){
        $users = User::all();
        // User::restoreTrashedUsers(); // Restore all trashed users and set the is_deleted to value to 0 automatically
        return response()->json(['status' => 'success', 'message' => 'users retrieved successfully', 'data' => $users], 200);
    }
    public function activeUsers() {
        try {
            $users = User::where('status', 1)->get();
            return response()->json(['status' => 'success', 'message' => 'Active users retrieved successfully', 'data' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Error retrieving active users', 'error' => $e->getMessage()], 500);
        }
    }
    public function inActiveUsers() {
        try {
            $users = User::where('status', 0)->get();
            return response()->json(['status' => 'success', 'message' => 'Active users retrieved successfully', 'data' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Error retrieving active users', 'error' => $e->getMessage()], 500);
        }
    }

    public function countTotalData(){
        $users = User::count();
        $totalActiveUsers = User::where('status', 1)->count();
        $totalInactiveUsers = User::where('status', 0)->count();
        $waves = Wave::count();
        $totalData = ['active' => $totalActiveUsers, 'inactive' => $totalInactiveUsers, 'total' => $users, 'waves' => $waves];
        return response()->json(['status' => 'success', 'message' => 'total users retrieved successfully', 'data' => $totalData], 200);
    }
    public function updateStatus(Request $request)
    {
        $update = $request->validate([
            'id' => 'required|integer',
            'status' => 'required|integer',
        ]);
        $user = User::find($update['id']);
        if ($user) {
            $user->status = $update['status'];
            $user->save();
            return response()->json(['status' => 'success', 'message' => 'user status updated successfully', 'data' => $user], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'user not found'], 404);
        }
    }

    public function updateUserDetails(Request $request){
        $user = User::find($request->id);
        if ($user) {
            return response()->json(['status'=> 'success', 'message'=> 'data loaded successfully','data'=> $user], 200);
        } else {
            return response()->json(['status'=> 'error', 'message'=> 'something went wrong'],404);
        }
    }

    public function deleteUser(Request $request){
        $user = User::find($request->id);
        if ($user) {
            $user->is_deleted = 1;
            $user->save();
            $user->delete();
            return response()->json(['status'=> 'success', 'message'=> 'user deleted successfully'], 200);
        } else {
            return response()->json(['status'=> 'error', 'message'=> 'user not found'], 404);
        }
    }
    public function deleteWave(Request $request){
        $wave = Wave::find($request->id);
        if ($wave) {
            $wave->is_deleted = 1;
            $wave->save();
            $wave->delete();
            return response()->json(['status'=> 'success', 'message'=> 'wave deleted successfully'], 200);
        } else {
            return response()->json(['status'=> 'error', 'message'=> 'wave not found'], 404);
        }
    }
    // to get all the records that are deleted or not deleted
    // we use withTrashed() method eg-> $users = User::withTrashed()->get();
    // to get only deleted records
    // we use onlyTrashed() method eg-> $users = User::onlyTrashed()->get();
    // to get only not deleted records
    // we use withoutTrashed() method eg-> $users = User::withoutTrashed()->get();


    // to restore deleted records
    // we use restore() method eg-> $user->restore();    # here we have to pass the id of the deleted record
    // to permanently delete deleted records
    // we use forceDelete() method eg-> $user->forceDelete();
}