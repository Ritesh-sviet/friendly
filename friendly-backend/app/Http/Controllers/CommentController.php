<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // public function allComments(Request $request)
    // {
    //     // $comments = Comment::all();
    //     $comments = Comment::where('wave_id', $request->wave_id)->get();
    //     $comment = Comment::with('user')->get();
    //     // $comment = Comment::with('user')->get();
    //     if($comments->isEmpty()) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'No comments found'
    //         ]);
    //     }
    //     else {
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'All comments',
    //             'data' => [$comments, $comment]
    //         ]);
    //     }
    // }
    public function allComments(Request $request)
    {

        $comments = Comment::with('user')
                      ->where('wave_id', $request->wave_id)
                      ->get();
        

        if ($comments->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'No comments found for the specified wave',
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'message' => 'Comments for the specified wave',
                'data' => $comments,
            ]);
        }
    }


    public function addComment(Request $request)
    {
        $request->validate([
            'wave_id' => 'required',
            'comment' => 'required',
        ]);

        // print_r(Auth::user()->id);die;
        $comment = Comment::create([ 
            'user_id' => Auth::user()->id, // comment creator
            'wave_id' => $request->wave_id,
            'comment' => $request->comment,
            'status' => 1,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Comment added successfully',
            'data' => $comment,
        ]);
    }

    public function deleteComment(Request $request){
        $comment = Comment::where('id', $request->id)->first();
        if($comment){
            $comment->is_deleted = 1;
            $comment->save();
            $comment->delete();
            
            return response()->json([
                'status'=> 'success',
                'message'=> 'comment deleted successfully',
                'data'=> $comment
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Comment not found',
            ]);
        }
    }
}