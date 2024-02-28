import AllWavesPopup from '@/components/shared/AllWavesPopup';
import EditWavePopup from '@/components/shared/EditWavePopup';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillEyeFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}
interface AllWaves {
    id: number;
    user_id: number;
    wave_message: string;
    wave_status: string;
    wave_name: string;
    created_at: string;
    user: User;
}

// This code is a React component called TotalWaves. It fetches a list of waves from an API and displays them in a table. It allows the user to filter the waves by name, change the status of each wave, and delete waves. It also includes functionality to view and edit individual waves.
const TotalWaves = () => {
    const navigate = useNavigate();
    const [totalWaves, setTotalWaves] = useState<AllWaves[]>([])
    const [filter, setFilter] = useState('');

    // This code defines a function called handleFilterChange that takes an event of type React.ChangeEvent as its parameter. When called, it sets the state of filter to the uppercase value of the input element that triggered the event.
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value.toUpperCase());
    };

    // This code snippet defines an asynchronous function handleChangeWaveStatus that takes an id as a parameter. It uses Promise.all to map over totalWaves and updates the wave_status of the wave with the given id. It then makes a PUT request to update the wave status through an API endpoint, and updates the UI based on the response. Finally, it updates the state with the updated waves.
    const handleChangeWaveStatus = async (id: number) => {
        const updatedWaves = await Promise.all(
            totalWaves.map(async (wave) => {
                if (wave.id === id) {
                    const newStatus = wave.wave_status === 'active' ? 'inactive' : 'active'; // Assuming 'active' and 'inactive' are the possible values
                    wave.wave_status = newStatus;
                    try {
                        const response = await axios.put(`http://127.0.0.1:8000/api/update_wave_status/${id}`, {
                            wave_status: newStatus,
                        }, {
                            headers: {
                                'Accept': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            }
                        });
                        if (response.data.status === 'success') {
                            toast.success(response.data.message);
                        } else {
                            toast.error(response.data.message);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                return wave;
            })
        );
        setTotalWaves(updatedWaves);
    }


    // This code snippet defines an asynchronous function handleDeleteWave that sends a POST request to 'http://127.0.0.1:8000/api/delete_wave' with an id in the request body and an Authorization header. Upon receiving a response, it checks if the status is 'success' and displays a success message using toast, otherwise it displays an error message. If an error occurs during the POST request, it logs the error to the console.
    const handleDeleteWave = async (id: number) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/delete_wave', {
                id: id,
            }, {
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
            console.log(error);
        }
    }

    // this will fetch all the waves
    useEffect(() => {
        // This code defines an async function fetchAllUsers that makes a GET request to 'http://127.0.0.1:8000/api/all_waves' using axios. It includes an 'Authorization' header with a JWT token from localStorage. If the response status is 'success', it sets the total waves using the data from the response. If the status is not 'success', it displays an error message using toast. If there's an error during the request, it logs the error to the console.
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all_waves', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                if (response.data.status === 'success') {
                    setTotalWaves(response.data.data);
                }
                else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchAllUsers();
    }, [])
    return (
        <div className='flex flex-col mt-20 ml-10 gap-10 w-full'>
            <div className='flex text-2xl w-52 justify-evenly items-center mt-8 cursor-pointer font-nunito'>
                <IoArrowBackCircleOutline className='goBackIcon hover:-translate-x-2 hover:transition-all hover:ease-in-out hover:duration-300 text-5xl' onClick={() => navigate('/admin/dashboard')} /> Total Waves
            </div>
            <div className='flex flex-col w-full gap-5'>
                <span className='text-2xl font-nunito text-sidebar'>Manage Waves list</span>
                <Card>
                    <CardTitle>
                        <div className='bg-white h-16 w-[20rem] py-0 m-5 pl-5 shadow-2xl border-2 rounded-3xl flex items-center'>
                            <FaSearch className='text-sidebar' />
                            <input
                                className='bg-transparent border-none h-full text-lg font-medium ml-3 focus:outline-none'
                                placeholder='Type to search by name ....' onChange={handleFilterChange} title="Type in an email" />
                        </div>
                    </CardTitle>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className='font-semibold text-lg'>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Wave Message</TableHead>
                                    <TableHead>Created On</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className='flex justify-center'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.isArray(totalWaves) && totalWaves.map((wave) => {
                                    const email = wave.user.first_name.toUpperCase();
                                    const displayStyle = email.includes(filter) ? '' : 'none';
                                    const timestamp = wave.created_at;
                                    const dateObject = new Date(timestamp);
                                    const waveCreatedDate = dateObject.toISOString().split('T')[0];
                                    return (
                                        <>
                                            <TableRow key={wave.id} style={{ display: displayStyle }} className='text-lg'>
                                                <TableCell className="font-medium">{wave.user.first_name} {wave.user.last_name}</TableCell>
                                                <TableCell>{wave.wave_message}</TableCell>
                                                <TableCell>{waveCreatedDate}</TableCell>
                                                <TableCell>
                                                    <label className="relative inline-flex items-center me-5 cursor-pointer">
                                                        <input type="checkbox" checked={wave.wave_status === 'active' ? true : false} className="sr-only peer" onChange={() => handleChangeWaveStatus(wave.id)} />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                    </label>
                                                </TableCell>
                                                <TableCell className='gap-5 flex justify-center'>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <div className='text-xl flex items-center cursor-pointer'><BsFillEyeFill /></div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className='max-w-none w-[1000px] -translate-y-[50%] -translate-x-[30%]'>
                                                            <AllWavesPopup
                                                                user={wave.user}
                                                                waveImage={wave.wave_name}
                                                                message={wave.wave_message}
                                                                waveId={wave.id} />
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <div className='text-xl flex items-center cursor-pointer'><MdEdit /></div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className='max-w-none w-1/2 -translate-y-[50%] -translate-x-[30%] h-[95%]'>
                                                            <EditWavePopup wave={wave} />
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <div className='text-xl flex items-center cursor-pointer' onClick={() => handleDeleteWave(wave.id)}><MdDelete /></div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default TotalWaves