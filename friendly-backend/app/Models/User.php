<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'password',
        'status',
        'social_security_number',
        'address_one',
        'address_two',
        'city',
        'state',
        'zip_code',
        'date_of_birth',
        'gender',
        'martial_status',
        'social_media',
        'kids',
        'profile_photo',
        'username',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    // this function is used to restore the deleted users and set the is_deleted to 0
    public static function restoreTrashedUsers()
    {
        // Restore all trashed waves and set is_deleted to 0
        self::onlyTrashed()->get()->each(function ($user) {
            $user->is_deleted = 0;
            $user->restore();
        });
    }
}
