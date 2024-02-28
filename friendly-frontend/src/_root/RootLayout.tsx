

/**
 * Root layout component.
 * 
 * This component renders the root layout of the application.
 * It includes a left sidebar, top bar, main content section, and a bottom bar.
 */

// Import the necessary components
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from '@/components/shared/TopBar';
import BottomBar from '@/components/shared/BottomBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Define the RootLayout component
const RootLayout = () => {
  const navigate = useNavigate();
  // Check if the user is authenticated
  useEffect(() => {
    if(!localStorage.getItem('token')) {
      toast.error('You are not authorized to access this page');
      setTimeout(() => {
        navigate('/');
      }, 1000)
    }
  }, [])
  
  return (
    // Render the root layout
    <div className='w-screen md:flex'>
      
      {/* Render the left sidebar */}
      <LeftSideBar />

      {/* Render the main content section */}
      <div className='flex flex-col w-4/5 bg-slate-100'>
        {/* Render the top bar */}
        <TopBar />

        {/* Render the main content */}
        <section className='flex flex-1 h-full overflow-y-scroll'>
        <ToastContainer />
          <Outlet />
        </section>

        {/* Render the bottom bar */}
        <BottomBar />
      </div>
    </div>
  )
}

// Export the RootLayout component
export default RootLayout;