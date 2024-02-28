import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
const AdminRootLayout: React.FC = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('You are not authorized to access this page');
            setTimeout(() => {
                navigate('/admin/login');
            }, 1000)
        }
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    }

    return (
        // Render the root layout

        <div className='flex flex-row w-full bg-slate-100'>
            {/* Render the main content */}
            <section className='flex flex-1 h-full overflow-y-scroll w-[95%]'>
                <ToastContainer />
                <Outlet />
            </section>
            <span className='pt-10 flex justify-end pr-10 w-[5%]'>
                <Button variant={'outline'} className='bg-red-500 text-white w-24 h-16 text-lg' onClick={handleLogout}>Log out</Button>
            </span>

            {/* Render the bottom bar */}
        </div>

    )
}

export default AdminRootLayout