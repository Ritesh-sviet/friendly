// Import React and useState, useEffect hooks
import React, { useEffect, useState } from 'react'
// Import Button component
import { Button } from '../ui/button'
// Import axios for making HTTP requests
import axios from 'axios'
// Import toast for displaying error messages
import { toast } from 'react-toastify'

interface comment {
  wave: number
  user: number
}

interface User {
  id: number
  first_name: string
  last_name: string
}
interface allcomments {
  id: number
  comment: string;
  user_id: number;
  user: User;
}

// Define Comment component
const Comment: React.FC<comment> = (props) => {
  const loggedInUserId = localStorage.getItem('id');
  // Define comments state and setComments function
  const [comments, setComments] = useState<allcomments[]>([])
  const [editComment, setEditComment] = useState('')
  const [changeEditButton, setChangeEditButton] = useState('Edit');
  const [changeDeleteButton, setChangeDelete] = useState(changeEditButton === 'update' ? 'cancel' : 'Delete');
  // Fetch comments data when props.wave changes
  useEffect(() => {
    // Define fetchData function to fetch data from API
    async function fetchData() {
      try {
        // Make a POST request to fetch comments data
        const response = await axios.post('http://127.0.0.1:8000/api/all_comments', {
          'wave_id': props.wave
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.status === 'success') {
          // Update comments state with the fetched data
          if (Array.isArray(response.data.data)) {
            setComments(response.data.data);
          } else {
            console.error("API response data is not an array");
          }
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [props.wave]);

  // Define handleDelete function to delete a comment
  const handleDelete = async (commentId: number) => {
    if (changeDeleteButton === 'Delete') {
      try {
        // Make a POST request to delete a comment
        const response = await axios.post('http://127.0.0.1:8000/api/delete_comment', {
          id: commentId,
        },
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
          });
        if (response.data.status === 'success') {
          // Update comments state by filtering out the deleted comment
          setComments((prevComments) => prevComments.filter((c) => c.id !== commentId));

        }
        else {
          // Display error message if deletion is not successful
          toast.error(response.data.message)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      setChangeDelete('Delete');
      setChangeEditButton('Edit');
    }
  }
  const handleEditComment = async ( commentId: number) => {
    setChangeEditButton('update');
    setChangeDelete('cancel');
      if (changeEditButton === 'update') {
        // Perform the API request to add the comment
        // After successful API request, update the UI and reset the state
        // Update UI and reset state after API request
        // Send API request to add the comment
        const response = await axios.post('http://127.0.0.1:8000/api/update_comment', {
          'comment_id': commentId,
          'comment': editComment
        },
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

        // Handle API response
        if (response.data.status === 'success') {
          toast.success(response.data.message);
          // Fetch updated comments after successful addition

        }
        else {
          toast.error(response.data.message);
        }
      }
  }

  // Render comments or a message if no comments found


  return (


    comments.length === 0 ? (<div className='text-center text-red-600 underline'>No comments found!</div>
    ) : (

      <div className='h-40 px-5 pt-5 overflow-y-scroll bg-green-200 rounded-lg'>
        {comments.map((comment) =>
        (
          <div className='flex flex-row justify-between py-5' key={comment.id}>
            <div className='flex flex-row gap-5'>
              <span className='font-semibold underline'>{comment.user.first_name} {comment.user.last_name} :</span>
              <textarea className={`h-14 border-2 border-white w-[30rem] p-3 flex flex-wrap overflow-y-scroll rounded-lg `} value={comment.comment} onChange={event => setEditComment(event.target.value)} />
              
              
              
            </div>
            {comment.user_id === Number(loggedInUserId) && (
              <div className='flex flex-row gap-5 '>

                <Button variant='ghost' className='text-xl text-white bg-sidebar' onClick={() => handleEditComment(comment.id)}>
                  {changeEditButton}
                </Button>

                <Button onClick={(event) => { event.preventDefault(); handleDelete(comment.id) }}>{changeDeleteButton}</Button>
              </div>
            )}

          </div>
          // < ListedComments AllComments={comment} />
        ))}
      </div>
    )

  )
}

export default Comment