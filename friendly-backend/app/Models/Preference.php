<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'language',
        'breakfast',
        'lunch',
        'dinner',
        'wake_time',
        'bed_time',
        'weight',
        'height',
        'blood_glucose',
        'cholestrol',
        'blood_pressure',
        'distance',
        'system_emails',
        'member_service_emails',
        'sms',
        'phone_call',
        'post',
    ];
}