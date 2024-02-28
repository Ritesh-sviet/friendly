import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import RequestedFriendPopup from './RequestedFriendPopup';
import axios from 'axios';
// Define the RequestedFriends component
interface Friend {
    id: number;
    name: string;
    email: string;
    status: number;
    profile_photo: string;
}

// this function is responsible for displaying the requested friends
const RequestedFriends: React.FC = () => {
    // Fetch friends from the server when the component mounts
    useEffect(() => {
        const getFriends = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/user_friends', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (response.data.status === 'success') {
                setFriends(response.data.data);
            }
        }
        getFriends();
    }, [])

    // Define the friends state and setFriends function
    const [friends, setFriends] = useState<Friend[]>([]);

    return (
        <>
            {friends.length === 0 ? (<div className='flex justify-center items-center w-[95%] h-full text-3xl text-red-600'><p className='shadow-[5px_3px_5px_3px] border-0 rounded-xl font-nunito'>No friend Found!</p></div>) : (
                <ul className='flex justify-between w-full flex-wrap pl-[10px]'>
                    {friends.map((friend) => (
                        <li className='flex items-start justify-between w-1/2 h-[70%] my-0 mx-auto cursor-pointer' key={friend.id}>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className='flex h-[80px] justify-between w-[90%] items-center rounded-[30px] bg-[rgba(0,255,0,0.137)] my-[5px] mx-0 hover:bg-green-800 hover:text-white'>
                                        <div className='flex flex-row justify-around items-center ml-[30px]'>
                                            <div className='rounded-[50%] flex justify-center items-center mr-25px]'>
                                                <img src={friend.profile_photo ? `http://127.0.0.1:8000/profile_photos/${friend.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='h-16 w-16 rounded-[50%] border-2 bg-white' />
                                            </div>
                                            <div className='ml-5'>
                                                <p className='text-[15px] font-bold font-[nunito,sans-serif]'>{friend.name}</p>
                                                <p className='text-[14px] font-medium font-[nunito,sans-serif]'>{friend.email}</p>
                                            </div>
                                        </div>
                                        <div className={`rounded-[100px] p-[10px] ${friend.status === 0 ? 'bg-yellow-600' : 'bg-green-600'}  mr-[30px] text-white`}>{friend.status === 0 ? 'Pending' : 'Accepted'}</div>
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='max-w-none w-1/2 -translate-y-[60%] -translate-x-[40%]'>
                                    <RequestedFriendPopup user={friend} />
                                </AlertDialogContent>
                            </AlertDialog>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default RequestedFriends


