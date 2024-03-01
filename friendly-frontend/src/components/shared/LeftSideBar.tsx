// import React, { useState } from 'react'
import { LogoutLink, SidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Asynchronously handles the logout event.
 *
 * @param {React.MouseEvent<HTMLAnchorElement>} event - the event triggering the logout
 * @return {Promise<void>} a promise that resolves when the logout is completed
 */
const LeftSideBar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    /**
    * Asynchronously handles the logout event.
    *
    * @param {React.MouseEvent<HTMLAnchorElement>} event - the event triggering the logout
    * @return {Promise<void>} a promise that resolves when the logout is completed
    */
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
            const response = await axios.post(url, {}, { headers: headers });
            // Check if the logout is successful
            if (response.data.status === "success") {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/')
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
        <nav className='w-1/5 h-screen Sidebar bg-sidebar'>
            <div className='flex flex-col gap-11'>
                <Link to={'/friendly'} className='flex items-center justify-center gap-3 mt-10'>
                    <img
                        src="../../public/assets/icons/Layer_1.png"
                        alt="logo"
                        height={90}
                        width={90}
                    />
                </Link>
                <ul className='flex flex-col gap-6'>

                    {SidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route;
                        return (

                            <li className={`leftsidebar-link rounded-lg w-64 my-0 mx-auto ${isActive && 'bg-linkcolor'}`} key={link.route}>
                                <NavLink
                                    to={link.route}
                                    className='flex justify-start gap-4 p-4 pl-10 mx-auto my-0 text-white'
                                >
                                    <img src={link.imgURL} alt={link.label} className='group-hover:invert-white' />
                                    {link.label}
                                </NavLink>
                            </li>

                        )
                    })}
                    {LogoutLink.map((link: INavLink) => {
                        return (
                            <li className='flex justify-center mt-24 leftsidebar-link'>
                                <NavLink
                                    to={link.route}
                                    className='flex gap-4 p-4 text-white item-center'
                                    onClick={handleLogout}>
                                    <img src={link.imgURL} alt={link.label}
                                        className='group-hover:invert-white' />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default LeftSideBar