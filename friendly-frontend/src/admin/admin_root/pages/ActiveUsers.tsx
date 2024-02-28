import EditUserDetailsPopup from '@/components/shared/EditUserDetailsPopup';
import UserDetailsPopup from '@/components/shared/UserDetailsPopup';
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

interface AllUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    status: number;
}
// This code snippet is a React functional component called ActiveUsers. It fetches a list of active users from an API endpoint and displays them in a table. It also allows the user to filter the list, change the status of a user, and delete a user. The component uses axios for making HTTP requests and toast for displaying success or error messages.
const ActiveUsers = () => {
    const navigate = useNavigate();
    const [totalUser, setTotalUser] = useState<AllUser[]>([])
    const [filter, setFilter] = useState('');
    // This code defines a function handleFilterChange that updates the filter state with the uppercase value of the input field that triggered the change event.
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value.toUpperCase());
    };

    // This code defines an asynchronous function handleChangeStatus that takes an id as a parameter. It uses Promise.all to asynchronously map over the totalUser array, updating the status of the user with the specified id and making an API call to update the status on the server. If the API call is successful, it displays a success message; if not, it displays an error message. Finally, it updates the state with the modified totalUser array.
    const handleChangeStatus = async (id: number) => {
        const updatedUsers = await Promise.all(
            totalUser.map(async (user) => {
                if (user.id === id) {
                    const newStatus = user.status === 1 ? 0 : 1;
                    user.status = newStatus;
                    try {
                        const response = await axios.post('http://127.0.0.1:8000/api/change_status', {
                            id: id,
                            status: newStatus,
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
                return user;
            }));
        setTotalUser(updatedUsers);
    }

    // This code defines an asynchronous function handleDeleteUser that sends a POST request to a specific API endpoint to delete a user using the axios library. It includes error handling using a try-catch block and displays success or error messages using the toast library based on the response from the server.
    const handleDeleteUser = async (id: number) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/delete_user', {
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

    // it will all the active users and set the total user count
    useEffect(() => {
        // This code snippet defines an asynchronous function fetchAllUsers that makes a GET request to 'http://127.0.0.1:8000/api/active_users' using axios. It sets the total user count if the response status is 'success', and displays an error message if the status is not 'success'. If there is an error during the request, it logs an error message to the console.
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/active_users', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                if (response.data.status === 'success') {
                    setTotalUser(response.data.data);
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
            <div className='flex text-2xl w-48 justify-evenly items-center mt-8 cursor-pointer font-nunito'>
                <IoArrowBackCircleOutline className='goBackIcon hover:-translate-x-2 hover:transition-all hover:ease-in-out hover:duration-300 text-5xl' onClick={() => navigate('/admin/dashboard')} /> Active Users
            </div>
            <div className='flex flex-col w-full gap-5'>
                <span className='text-2xl font-nunito text-sidebar'>Manage active user list</span>
                <Card>
                    <CardTitle>
                        <div className='bg-white h-16 w-[20rem] py-0 m-5 pl-5 shadow-2xl border-2 rounded-3xl flex items-center'>
                            <FaSearch className='text-sidebar' />
                            <input
                                className='bg-transparent border-none h-full text-lg font-medium ml-3 focus:outline-none'
                                placeholder='Type to search...' onChange={handleFilterChange} title="Type in an email" />
                        </div>
                    </CardTitle>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className='font-semibold text-lg'>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className='flex justify-center'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.isArray(totalUser) && totalUser.map((user) => {
                                    const email = user.email.toUpperCase();
                                    const displayStyle = email.includes(filter) ? '' : 'none';
                                    return (
                                        <>
                                            <TableRow key={user.id} style={{ display: displayStyle }} className='text-lg'>
                                                <TableCell className="font-medium">{user.first_name} {user.last_name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phone_number}</TableCell>
                                                <TableCell>
                                                    <label className="relative inline-flex items-center me-5 cursor-pointer">
                                                        <input type="checkbox" checked={user.status === 1 ? true : false} className="sr-only peer" onChange={() => handleChangeStatus(user.id)} />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                    </label>
                                                </TableCell>
                                                <TableCell className='gap-5 flex justify-center'>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <div className='text-xl flex items-center cursor-pointer'><BsFillEyeFill /></div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className='max-w-none w-[1000px] -translate-y-[50%] -translate-x-[30%]'>
                                                            <UserDetailsPopup
                                                                user={user}
                                                            />
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <div className='text-xl flex items-center cursor-pointer'><MdEdit /></div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className='max-w-none w-1/2 -translate-y-[50%] -translate-x-[30%] h-[95%]'>
                                                            <EditUserDetailsPopup user={user.id} />
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <div className='text-xl flex items-center cursor-pointer' onClick={() => handleDeleteUser(user.id)}><MdDelete /></div>
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

export default ActiveUsers