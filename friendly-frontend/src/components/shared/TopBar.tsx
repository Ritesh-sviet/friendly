import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
interface User {
    first_name: string;
    last_name: string;
    profile_photo: string;
    username: string;
}

// This code defines a functional component TopBar in TypeScript. It uses the useState and useEffect hooks from React to manage state and perform side-effects. The component fetches user details from a specified API endpoint using Axios, stores the data in the user state, and displays the user's profile photo and name in the UI. It also includes a logout function that sends a POST request to a logout API endpoint and handles the logout process.

// this is a top bar, here in this section there are profile photo of user with a greeting symbol with full name of the user
// there are multiple links in the top bar like multiple tabs and logout
const TopBar = () => {
    const [user, setUser] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user_details', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();
    // This code snippet defines an asynchronous function handleLogout that is triggered by a click event on an anchor element. It sends a POST request to a logout API endpoint with the user's token in the headers. If the logout is successful, it displays a success message, removes the token and name from the local storage, and navigates the user to the home page. If an error occurs, it displays an error message.
    const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        try {
            // Set the URL for the logout API endpoint
            const url = 'http://127.0.0.1:8000/api/logout';
            // Get the user's token from the local storage
            const token = localStorage.getItem('token');
            // Set the headers for the request
            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,

            };
            // Make a POST request to the logout API endpoint with empty data and the headers
            const response = await axios.post(url, {}, { headers });
            // Check if the logout is successful
            if (response.data.status === "success") {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 1500)
                localStorage.removeItem('token');
                localStorage.removeItem('name');
            }
            else {
                toast.error(response.data.data.message);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    return (
        <section className='topbar w-full h-20 bg-white'>
            <div className='flex items-center justify-end pr-40 border-b-2 h-full'>

                <div className='flex gap-2 items-center flex-center'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <img src={user.profile_photo ? `http://127.0.0.1:8000/profile_photos/${user.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='h-10 w-10 rounded-full border-2 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link to='/friendly/profile' ><DropdownMenuItem className="cursor-pointer">
                                    My Profile
                                </DropdownMenuItem></Link>
                                <Link to='/friendly/preferences' ><DropdownMenuItem className="cursor-pointer">
                                    Preferences
                                </DropdownMenuItem></Link>
                                <Link to='/friendly/friends' ><DropdownMenuItem className="cursor-pointer">
                                    Friends
                                </DropdownMenuItem></Link>
                                <Link to='/friendly/create-waves' ><DropdownMenuItem className="cursor-pointer">
                                    Create Waves
                                </DropdownMenuItem></Link>
                                <Link to='/friendly/change-password' ><DropdownMenuItem className="cursor-pointer">
                                    Change Password
                                </DropdownMenuItem></Link>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className='font-bold pl-10'>Welcome <br /><small>{user.first_name} {user.last_name}</small></p>
            </div>
        </section >
    )
}

export default TopBar