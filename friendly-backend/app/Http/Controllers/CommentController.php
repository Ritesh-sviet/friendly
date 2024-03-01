<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
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
    public function updateComment(Request $request)
    {
        $validate = $request->validate([
            'comment_id' => 'required', //on which comment
            // 'wave_id' => 'required', //on which post
            'comment' => 'required', //to replace with
        ]);
        // echo($request);die;
        
        // $comment = Comment::where('wave_id', $request->wave_id && 'id', $request->comment_id && 'user_id', auth()->user()->id);
        // $comment->comment = $request->comment;
        // $comment->save();
        // print_r($comment);die;
        // echo $request->comment_id; die;
        $fecthComment=Comment::where('id','=',$request->comment_id)->update(['comment'=>$request->comment]);
        // echo $fecthComment ;die;
        // $updateComment=Comment::update(['comment'=>$request->comment]);
        // echo "hi";
        // print_r($fecthComment);
        // die('ggg');

        if ($fecthComment) {
            return response()->json([
                'status' => 'success',
                'message' => 'Comment updated successfully',
                'data' => $fecthComment,
            ]);
        }
    }

    public function deleteComment(Request $request)
    {
        $comment = Comment::where('id', $request->id)->first();
        if ($comment) {
            $comment->is_deleted = 1;
            $comment->save();
            $comment->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'comment deleted successfully',
                'data' => $comment
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Comment not found',
            ]);
        }
    }
}