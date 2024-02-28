import React from 'react';
import './global.css';
import { Route, Routes } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { ChangePassword, CreateWaves, Friends, Home, Preferences, Profile } from './_root/pages';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import Register from './admin/forms/Register';
import Login from './admin/forms/Login';
import AdminAuthLayout from './admin/AdminAuthLayout';
import AdminRootLayout from './admin/AdminRootLayout';
import AdminHome from './admin/admin_root/pages/AdminHome';
import TotalUsers from './admin/admin_root/pages/TotalUsers';
import ActiveUsers from './admin/admin_root/pages/ActiveUsers';
import InActiveUsers from './admin/admin_root/pages/InActiveUsers';
import TotalWaves from './admin/admin_root/pages/TotalWaves';

// This code snippet defines a React functional component App, which uses the Routes component from React Router. It sets up different routes for public and private access, as well as routes for admin and regular users. It uses nested routes to define the page components for each route.
const App: React.FC = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route index path='/' element={<SigninForm />} />
                    <Route path='/sign-up' element={<SignupForm />} />
                    <Route path='*' element={<div>404</div>} />
                </Route>
                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route path='/friendly' element={<Home />} />
                    <Route path='/friendly/profile' element={<Profile />} />
                    <Route path='/friendly/preferences' element={<Preferences />} />
                    <Route path='/friendly/create-waves' element={<CreateWaves />} />
                    <Route path='/friendly/friends' element={<Friends />} />
                    <Route path='/friendly/change-password' element={<ChangePassword />} />
                    <Route path='*' element={<div>404</div>} />
                </Route>
                {/* Admin Public routes */}
                <Route element={<AdminAuthLayout />}>
                    <Route path='/admin/register' element={<Register />} />
                    <Route path='/admin/login' element={<Login />} />
                    <Route path='*' element={<div>404</div>} />
                </Route>
                {/* Admin private routes */}
                <Route element={<AdminRootLayout />}>
                    <Route path='/admin/dashboard' element={<AdminHome />} />
                    <Route path='/admin/total_users' element={<TotalUsers />} />
                    <Route path='/admin/active_users' element={<ActiveUsers />} />
                    <Route path='/admin/inactive_users' element={<InActiveUsers />} />
                    <Route path='/admin/total_waves' element={<TotalWaves />} />
                    <Route path='*' element={<div>404</div>} />
                </Route>
                <Route path='*' element={<div>404</div>} />
            </Routes>
        </main>
    )
}

export default App