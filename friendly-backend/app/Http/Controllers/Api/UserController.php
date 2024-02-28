<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function userIndex(){
        $id = Auth::user()->id;
        $user = User::find($id);
        $current_user['first_name'] = $user->first_name;
        $current_user['last_name'] = $user->last_name;
        $current_user['email'] = $user->email;
        $current_user['phone_number'] = $user->phone_number;
        $current_user['social_security_number'] = $user->social_security_number;
        $current_user['address_one'] = $user->address_one;
        $current_user['address_two'] = $user->address_two;
        $current_user['city'] = $user->city;
        $current_user['state'] = $user->state;
        $current_user['zip_code'] = $user->zip_code;
        $current_user['date_of_birth'] = $user->date_of_birth;
        $current_user['gender'] = $user->gender;
        $current_user['martial_status'] = $user->martial_status;
        $current_user['social_media'] = $user->social_media;
        $current_user['kids'] = $user->kids;
        $current_user['profile_photo'] = $user->profile_photo;
        $current_user['username'] = $user->username;
        return response()->json(['status' => 'success', 'message' => 'user data loaded successfully', 'data' => $current_user], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function updateProfilePic(Request $request){
        
        $request->validate([
            'profile_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);
        $image = $request->file('profile_photo');
        // Generate a filename using current date and time with year
        // `Carbon::now()` gets the current date and time.
        // `format('Y-m-d_H-i-s')` formats the date and time in the specified format (Year-Month-Day_Hour-Minute-Second).
        // The formatted date and time are then used as part of the filename along with the original file extension.
        $profile_image = Carbon::now()->format('Y-m-d_H-i-s') . '.' . $image->getClientOriginalExtension();
        
        $image->move(public_path('profile_photos'), $profile_image);
        
        $user = User::where('id', Auth::user()->id)->first();
        $user->profile_photo = $profile_image;
        $user->save();
        return response()->json(['status' => 'success', 'message' => 'profile photo updated successfully', 'data' => $user], 200);
    }

    public function basicProfileDetails(Request $request){
        $validation = $request->validate([
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'email' => 'required|email',
        'social_security_number' => 'nullable|string',
        'phone_number' => 'nullable|string',
        'address_one' => 'required|string',
        'address_two' => 'nullable|string',
        'city' => 'required|string',
        'state' => 'required|string',
        'zip_code' => 'required|string',
        ]);

        $user = User::findOrFail(Auth::user()->id);
        
        // Update the required fields
        $filledFields = array_filter($validation, function ($value) {
            return !empty($value);
        }); 
    
        // Update optional fields only if they are filled
        $user->fill($filledFields)->save();
        return response()->json(['status' => 'success', 'message' => 'Profile basic details updated successfully', 'data' => $user], 200);
    }


    public function personalProfileDetails(Request $request){
        // Validate only mandatory fields explicitly

        /* While the validation rules explicitly enforce only the mandatory fields (date_of_birth and gender),
          the `$request->validated()` data actually contains all fields submitted in the form, including the optional ones. */

        // The `validate method`, with its specified rules, ensures that the mandatory fields are present and valid. However, it doesn't discard any other fields that might be present in the $request object.

        /* When we call `$request->validated()`, we're retrieving an array containing all fields from the request, not just the validated ones. This array includes both the mandatory fields that passed validation and any optional fields that were submitted, even if they weren't explicitly validated. */

        /* `$this` refers to the current controller instance itself. It's a special variable that allows you to access the controller's properties and methods within its functions. */
        $validation = $request->validate([
            'date_of_birth' => 'required|date',
            'gender' => 'required|string',
            'martial_status' => 'nullable|string',
            'social_security_number' => 'nullable|string',
            'social_media' =>'nullable|string',
            'kids' => 'nullable|integer'
        ]);

        // Retrieve the user model
        $user = User::findOrFail(Auth::user()->id);

        // Extract only filled fields from the validated data
        /*
        The `array_filter` function then examines this array, keeping only the fields that have non-empty values. This means it retains both the mandatory fields (which are guaranteed to have values due to validation) and any optional fields that the user filled in. */
        $filledFields = array_filter($validation, function ($value) {
            return !empty($value);
        }); 

        // Update the model with filled fields
        /* The `fill` method then takes this filtered array and assigns those values to the corresponding model attributes. */
        // the `save` method persists all those changes to the database, effectively updating all filled fields.
        $user->fill($filledFields)->save();

        // Handle success response
        return response()->json([
            'status' => 'success',
            'message' => 'Profile details updated successfully',
            'data' => $user,
        ], 200);
    }

}