import React from 'react'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Create a functional component called AuthLayout
const AuthLayout: React.FC = () => {
  return (
    <>
      {/* Display a side image */}
      <img
        src="../../public/assets/images/side-image.png"
        alt="side-image"
        className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
      />
      {/* Display a section with a toast container and the child components */}
      <section className='flex flex-1 justify-center items-center flex-col py-10'>
        <ToastContainer />
        <Outlet />
      </section>
      {/* Display a footer with copyright information */}
      <footer className='fixed bottom-0 w-full h-10 flex justify-center items-center border-t-2 bg-white'>&copy; 2023 DR. Palig. All rights reserved.</footer>
    </>
  )
}

export default AuthLayout