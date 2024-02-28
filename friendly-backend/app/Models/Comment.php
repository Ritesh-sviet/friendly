<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'user_id',
        'wave_id',
        'comment',
        'status',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public static function restoreTrashedComment()
    {
        // Restore all trashed waves and set is_deleted to 0
        self::onlyTrashed()->get()->each(function ($comment) {
            $comment->is_deleted = 0;
            $comment->restore();
        });
    }
}
