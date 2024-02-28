import React, { useState } from 'react'
import { AlertDialogCancel } from '../ui/alert-dialog'
import { GoXCircle } from 'react-icons/go'
import { Button } from '../ui/button'
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    profile_photo: string;
}

interface AllWavesPopupProps {
    user: User;
    message: string;
    waveImage: string;
    waveId: number;
}
// Refactored AllWavesPopup component to improve readability and maintainability

const AllWavesPopup: React.FC<AllWavesPopupProps> = (props) => {
    // State for adding comments and the comment content
    const [addingComment, setAddingComment] = useState(false);
    const [comment, setComment] = useState("");
    // Function to handle opening the comment input section
    const handleAddComment = () => {
        setAddingComment(true); // Hide the comment input section
    };

    // Function to handle sending the comment via API request
    /**
 * Handles sending the comment via API request
 * @param {string} comment - The comment to be sent
 */
    const handleSendComment = async (comment: string) => {
        // Perform the API request to add the comment
        // After successful API request, update the UI and reset the state
        // Update UI and reset state after API request
        setAddingComment(false);
        // Send API request to add the comment
        const response = await axios.post('http://127.0.0.1:8000/api/add_comment', {
            'wave_id': props.waveId,
            'comment': comment
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
        }
        else {
            toast.error(response.data.message);
        }
        // Reset the comment content
        setComment("");
    }

    // Function to handle canceling the comment
    const handleCancelComment = () => {
        setAddingComment(false);
    };
    return (
        <div className='AllWaves'>
            <div className='w-full text-right'>
                <AlertDialogCancel className='text-4xl rounded-[50%] p-0 text-red-600 hover:outline-green'><GoXCircle /></AlertDialogCancel>
            </div>
            <div className='border-2 h-40 bg-linkcolor w-full text-center mb-10 rounded-xl'>
                <span className='text-9xl opacity-5'>Details</span>
                <div className='flex justify-start items-center w-full h-0'>
                    <img src={props.user.profile_photo ? `http://127.0.0.1:8000/profile_photos/${props.user.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='ml-10 h-32 w-32 rounded-[50%] border-2 bg-white' />
                    <div className='ml-[20px] pb-5 flex flex-col justify-start items-center'>
                        <span className='text-3xl font-semibold text-white'>{props.user.first_name} {props.user.last_name}</span>
                        <span className='text-xl font-normal text-white'>@{props.user.username}</span>
                    </div>
                </div>
            </div>
            <span className='text-3xl'>Message: </span>
            <div className='pt-[10px] flex justify-evenly'>
                <div className='w-[50%] flex flex-wrap h-[200px] overflow-y-scroll overflow-x-auto border-2 shadow-2xl rounded-xl'>
                    <i className='flex flex-wrap font-extralight font-serif text-2xl w-full px-5 '>
                        {props.message}
                    </i>
                </div>
                <span className='border-l-2'></span>
                <div className='w-[40%] h-[200px] overflow-y-scroll rounded-xl shadow-2xl'>
                    <div className='flex justify-between border-red-600' key={props.waveId}>
                        <img src={`http://127.0.0.1:8000/images/${props.waveImage}`} alt='post' />
                    </div>
                </div>
            </div>
            {addingComment ? (
                // Render comment input section when addingComment is true
                <div className='comment-input-section my-[30px] w-full'>
                    <input type='text' placeholder='Add your comment...' value={comment} onChange={(e) => setComment(e.target.value)} className='w-full h-[60px] rounded-lg text-xl border-2 mb-5 pl-5' />
                    <div className='flex flex-row w-full  justify-evenly'>
                        <Button variant='ghost' className='bg-sidebar text-xl text-white' onClick={() => handleSendComment(comment)}>Send</Button>
                        <Button variant='outline' onClick={handleCancelComment}>
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                // Render wave details when addingComment is false
                <>
                    {/* ... rest of your component code ... */}
                    <div className='flex flex-col'>
                        <Button className='w-1/3 my-[30px]' onClick={handleAddComment}>
                            Add Comment
                        </Button>
                        <Comment wave={props.waveId} user={props.user.id} />
                    </div>
                </>
            )}
        </div>

    )
}

export default AllWavesPopup