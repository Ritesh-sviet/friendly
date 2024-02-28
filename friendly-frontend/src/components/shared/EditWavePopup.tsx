import React, { useState } from 'react'
import { AlertDialogCancel } from '../ui/alert-dialog'
import { GoXCircle } from 'react-icons/go'
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { toast } from 'react-toastify';
import axios from 'axios';

// The User interface defines a type with a single property id of type number.
interface User {
    id: number;
}
// id: Represents the unique identifier of the wave.
// wave_name: Stores the name of the wave.
// wave_message: Contains the message associated with the wave.
// wave_status: Indicates the status of the wave.
// user: References the user associated with the wave.
interface Wave {
    id: number;
    wave_name: string;
    wave_message: string;
    wave_status: string;
    user: User;
}
// wave: Wave - Defines a property called wave of type Wave.
interface EditWavePopupProps {
    wave: Wave;
}
/**
 * React functional component for editing a wave popup.
 *
 * @param {EditWavePopupProps} props - the props for the component
 * @return {JSX.Element} the rendered component
 */

// This is a React functional component for editing a wave popup. It takes in props of type EditWavePopupProps and renders a form for editing a wave, including updating the message and status of the wave. It uses useState to manage the state of the message and status, and makes an asynchronous API call to update the wave on form submission. The component also includes UI elements for displaying the wave message, image, and status, as well as handling user interactions for updating the wave status.
const EditWavePopup: React.FC<EditWavePopupProps> = (props) => {
    const [messsage, setMesssage] = useState(props.wave.wave_message);
    const [status, setStatus] = useState(props.wave.wave_status);

       /**
     * Handles the change of wave status.
     *
     * @param {Event} event - the event object
     * @return {void} 
     */
    const handleChangeWaveStatus = (event) => {
        event.preventDefault();
        status === 'active' ? setStatus('inactive') : setStatus('active');
    }
    // This code defines a function called handleChangeWaveStatus which takes an event as a parameter. It prevents the default behavior of the event and toggles the status between 'active' and 'inactive'.
    const handleEditWave = async (event) => {
        event.preventDefault();
        if (messsage !== '' && status !== '') {
            const updatedWave = {
                'id': props.wave.id,
                'user_id': props.wave.user.id,
                'wave_status': status,
                'wave_message': messsage
            }
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/update_wave', updatedWave, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                if (response.data.status === 'success') {
                    toast.success(response.data.message);
                }
                else {
                    toast.error(response.data.message);
                }
            }
            catch (error) {
                console.error('API request failed:', error);
            }
        }
        else {
            toast.error('please update wave image and status');
        }
    }
    return (
        <>
            <span><AlertDialogCancel className='text-4xl rounded-[50%] p-0 text-red-600 hover:outline-green'><GoXCircle /></AlertDialogCancel></span>
            <div>
                <form onSubmit={handleEditWave}>
                    <div className='flex justify-around'>
                        <span className='text-3xl'>Message: </span>
                        <span className='text-3xl'>Wave image: </span>
                    </div>
                    <div className='pt-[10px] flex justify-evenly'>
                        <div className='w-[50%] flex flex-wrap h-[200px] overflow-y-scroll overflow-x-auto border-2 shadow-2xl rounded-xl'>
                            <textarea className='flex flex-wrap font-extralight font-serif text-2xl w-full px-5' value={messsage} onChange={(e) => setMesssage(e.target.value)} />
                        </div>
                        <span className='border-l-2'></span>
                        <div className='w-[40%] h-[200px] overflow-y-scroll rounded-xl shadow-2xl'>
                            <div className='flex justify-between border-red-600' key={props.wave.id}>
                                <img src={`http://127.0.0.1:8000/images/${props.wave.wave_name}`} alt='post' />
                            </div>
                        </div>

                    </div>
                    <div className='flex justify-between items-center mt-5'>
                        <div className='flex flex-col w-[200px] gap-5'>
                            <Label className='text-2xl'>Status</Label>
                            <Button variant='outline' className={status === 'active' ? 'text-white mr-16 bg-green-600 rounded-3xl hover:text-green-600 text-lg' : 'text-lg text-white bg-red-600 mr-16 rounded-3xl hover:text-red-600'} onClick={handleChangeWaveStatus} >{status}</Button>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <Button type='submit' variant={'outline'} className='bg-sidebar text-2xl active:scale-90 transition-transform duration-300 ease-in-out text-white font-nunito'>Update</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditWavePopup