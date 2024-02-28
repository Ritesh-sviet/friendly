<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Api\UserAuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\WaveController;
use Illuminate\Support\Facades\Route;

/* post requests */
// admin signup
Route::post('admin_signup', [AdminController::class, 'adminRegister']);
// admin login
Route::post('admin_login', [AdminController::class, 'adminLogin']);
// update user status
Route::post('change_status', [AdminController::class, 'updateStatus']);
// edit user Details 
Route::post('/edit_user_Details', [AdminController::class,'updateUserDetails']);
// update wave
Route::post('update_wave', [WaveController::class,'updateWave'])->middleware('auth:sanctum');
// delete user(SoftDelete)
Route::post('/delete_user', [AdminController::class,'deleteUser']);
// delete Wave(SoftDelete)
Route::post('/delete_wave', [AdminController::class,'deleteWave']);
// admin logout
Route::post('admin_logout', [AdminController::class, 'adminLogout'])->middleware('auth:sanctum');
// signup
Route::post('signup', [UserAuthController::class, 'Register']);
// login
Route::post('signin', [UserAuthController::class, 'Login']);
// update password
Route::post('update_password', [UserAuthController::class, 'updatePassword'])->middleware('auth:sanctum');
// update profile pic
Route::post('update_profile_pic', [UserController::class,'updateProfilePic'])->middleware('auth:sanctum');
// update basic profile
Route::post('update_basic_profile', [UserController::class,'basicProfileDetails'])->middleware('auth:sanctum');
// update personal profile
Route::post('update_personal_profile', [UserController::class,'personalProfileDetails'])->middleware('auth:sanctum');
// update user preferences
Route::post('update_user_preferences', [PreferenceController::class,'updateUserPreferences'])->middleware('auth:sanctum');
// upload wave
Route::post('upload_wave', [WaveController::class,'uploadNewWave'])->middleware('auth:sanctum');
// invite Friends
Route::post('/send_friend_request', [FriendController::class,'inviteFriends'])->middleware('auth:sanctum');
// add comment
Route::post('add_comment', [CommentController::class,'addComment'])->middleware('auth:sanctum');
// all comments
Route::post('/all_comments', [CommentController::class,'allComments'])->middleware('auth:sanctum');

Route::post('/delete_comment', [CommentController::class,'deleteComment'])->middleware('auth:sanctum');
// logout
Route::post('logout', [UserAuthController::class, 'logout'])->middleware('auth:sanctum');


/* get requests */
Route::get('/all_waves', [WaveController::class,'allWaves']);
Route::get('/user_waves', [WaveController::class,'waveIndex'])->middleware('auth:sanctum');
Route::get('/user_details', [UserController::class,'userIndex'])->middleware('auth:sanctum');
Route::get('/user_preferences', [PreferenceController::class,'loadUserPreferences'])->middleware('auth:sanctum');
Route::get('/user_friends', [FriendController::class,'userFriends'])->middleware('auth:sanctum');
Route::get('/all_users', [AdminController::class,'allUsers']);
Route::get('/active_users', [AdminController::class,'activeUsers']);
Route::get('/inactive_users', [AdminController::class,'inActiveUsers']);
Route::get('/total_data', [AdminController::class,'countTotalData']);

    
/* put requests */
Route::put('/update_wave_status/{id}', [WaveController::class,'updateWaveStatus'])->middleware('auth:sanctum');