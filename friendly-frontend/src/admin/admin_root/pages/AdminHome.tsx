import { Card, CardContent } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

interface AllUser{
    total: number;
    active: number;
    inactive: number;
}
// This code defines a functional component AdminHome using React. It fetches data from an API endpoint using axios and displays the data in a dashboard-like interface. The fetched data is then used to populate the various card components on the dashboard.
const AdminHome: React.FC = () => {
    const [totalData, settotalData] = useState<AllUser[]>([])
    // this is responsible for fetching the total data
    useEffect(() => {
        const url = 'http://127.0.0.1:8000/api/total_data';
        async function  fetchdata() {
            const response = await axios.get(url,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            settotalData(response.data.data);
        }
        fetchdata();
    },[])
    return (
        <>
            <div className='h-full w-full flex flex-col items-center justify-center'>
                <div className='mb-8 flex flex-col gap-3 text-sidebar w-[80%]'>
                    <p className='font-light text-base'>DASHBOARD</p>
                    <span className='text-4xl font-bold'>OVERVIEW</span>
                </div>
                <div className='w-full py-5 flex justify-center'>

                    <CardContent className='flex flex-row justify-evenly w-full'>
                        <NavLink to={'/admin/total_users'}>
                            <Card className='mb-8 flex items-center flex-col gap-3 w-64 h-48 cursor-pointer justify-center text-sidebar'>
                                <p className='font-light text-base'>TOTAL USERS</p>
                                <span className='text-4xl font-bold'>{totalData.total}</span>
                            </Card>
                        </NavLink>
                        <NavLink to={'/admin/active_users'}>
                            <Card className='mb-8 flex items-center flex-col gap-3 w-64 h-48 cursor-pointer justify-center text-sidebar'>
                                <p className='font-light text-base'>ACTIVE USERS</p>
                                <span className='text-4xl font-bold'>{totalData.active}</span>
                            </Card>
                        </NavLink>
                        <NavLink to={'/admin/inactive_users'}>
                            <Card className='mb-8 flex items-center flex-col gap-3 w-64 h-48 cursor-pointer justify-center text-sidebar'>
                                <p className='font-light text-base'>INACTIVE USERS</p>
                                <span className='text-4xl font-bold'>{totalData.inactive}</span>
                            </Card>
                        </NavLink>
                        <NavLink to={'/admin/total_waves'}>
                            <Card className='mb-8 flex items-center flex-col gap-3 w-64 h-48 cursor-pointer justify-center text-sidebar'>
                                <p className='font-light text-base'>TOTAL WAVES</p>
                                <span className='text-4xl font-bold'>{totalData.waves}</span>
                            </Card>
                        </NavLink>
                    </CardContent>
                </div>
            </div>
        </>
    )
}

export default AdminHome