<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Wave extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'user_id',
        'wave_name',
        'wave_message',
        'wave_status',
        'status',
        'is_deleted'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    // this function is used to restore the deleted waves and set the is_deleted to 0
    public static function restoreTrashedWaves()
    {
        // Restore all trashed waves and set is_deleted to 0
        self::onlyTrashed()->get()->each(function ($wave) {
            $wave->is_deleted = 0;
            $wave->restore();
        });
    }
}