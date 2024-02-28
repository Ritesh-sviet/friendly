import React from 'react'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AdminAuthLayout = () => {
    return (
        <>
            <section className='flex flex-1 justify-center items-center flex-col py-10'>
                <ToastContainer />
                <Outlet />
            </section>
        </>
    )
}

export default AdminAuthLayout