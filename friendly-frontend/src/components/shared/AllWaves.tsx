// Import React, useState, useEffect, axios, and other necessary components
import React, { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '../ui/alert-dialog';
import AllWavesPopup from './AllWavesPopup';
import axios from 'axios';
import TextWithEllipsis from './TextWithEllipsis';
/*
    The User interface defines the structure of a user object with properties id, first_name, last_name, username, and profile_photo.
    Each property in the User interface specifies the data type of the corresponding user attribute (e.g., id is a number, first_name is a string, etc.).
*/
interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    profile_photo: string;
}

/* 
    id: Represents the unique identifier of the wave.
    wave_message: Stores the message associated with the wave.
    wave_name: Holds the name of the wave.
    wave_status: Indicates the status of the wave.
    user: Includes the user data associated with the wave.
*/
interface Wave {
    id: number;
    wave_message: string;
    wave_name: string;
    wave_status: string;
    user: User; // Include the user data in the Wave interface
}
/**
 * Component to display all active waves
 */
const AllWaves: React.FC = () => {
    // Define state variable to store waves
    const [wave, setWave] = useState<Wave[]>([]);

    // Fetch waves from the server when the component mounts
    useEffect(() => {
        /**
        * Function to fetch all active waves from the server
        */
       /*
         Fetches all active waves from the server
         returns {Promise<void>}
       */
        const getWaves = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/all_waves');
            const activeWaves = response.data.data.filter((wave: Wave) => wave.wave_status === 'active');
            setWave(activeWaves);
        };
        getWaves();
    }, [])

    // Render the list of waves
    return (
        <>
            {/* Check if there are any waves */}
            {wave.length === 0 ? (<div className='flex justify-center items-center w-[95%] h-full text-3xl text-red-600'><p className='shadow-[5px_3px_5px_3px] border-0 rounded-xl font-nunito'>No waves Found!</p></div>) : (
                <>
                    {/* Map through the active waves and render each wave */}
                    {
                        wave.map((wave) => (
                            < li key={wave.id} className='list-none' >
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <div className='flex h-[90px] w-[322px] border-r-2  justify-around my-[20px] mx-5 cursor-pointer hover:bg-slate-700 hover:text-white hover:rounded-lg active:scale-90 transition-transform duration-300 ease-in-out'>
                                            <img src={wave.user.profile_photo ? `http://127.0.0.1:8000/profile_photos/${wave.user.profile_photo}` : '../../public/assets/icons/Layer_1.png'} className='w-[70px] flex justify-center items-center rounded-[50%] h-[70px] mt-[15px] border-2' alt='profile' />
                                            <div className='flex flex-col justify-around gap-[10px] w-1/2'>
                                                <p className='text-linkcolor'>@{wave.user.username}</p>
                                                <TextWithEllipsis text={wave.wave_message} maxWidth='150px' />
                                                <p className='text-linkcolor'>Follow</p>
                                            </div>
                                        </div>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className='max-w-none w-1/2 -translate-y-[50%] -translate-x-[30%]'>
                                        {/* Display popup for the wave */}
                                        <AllWavesPopup
                                            waveImage={wave.wave_name}
                                            user={wave.user} // Assuming 'user' is the user information in your 'wave' object
                                            message={wave.wave_message}
                                            waveId={wave.id} />
                                    </AlertDialogContent>
                                </AlertDialog>
                            </li>
                        ))
                    }

                </>
            )}
        </>
    )
}
export default AllWaves