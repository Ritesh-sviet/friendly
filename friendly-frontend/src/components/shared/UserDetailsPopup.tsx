import React from 'react'
import { AlertDialogCancel } from '../ui/alert-dialog'
import { GoXCircle } from 'react-icons/go'

// create an interface for this comeponent propss


interface User {
    // all the user details 
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
    address_one: string;
    address_two: string;
    city: string;
    state: string;
    social_security_number: string;
    zip_code: string;
    gender: string;
    martial_status: string;
    social_media: string;
    kids: string;
    created_at: string;
}
interface UserDetailsPopupProps {
    user: User;
}

// This code defines a React functional component called UserDetailsPopup, which takes in props of type UserDetailsPopupProps. It renders a popup displaying various details of a user, such as their full name, email, SSN, zip code, and more. The details are displayed in a structured layout using div and span elements with specific styles applied using Tailwind CSS classes.
// this is show all the details about the user in a popup
const UserDetailsPopup: React.FC<UserDetailsPopupProps> = (props) => {
    return (
        <div>

            <div className='w-full text-right'>
                <AlertDialogCancel className='text-4xl rounded-[50%] p-0 text-red-600 hover:outline-green'><GoXCircle /></AlertDialogCancel>
            </div>

            <div className='text-xl w-full bg-blue-500 text-white p-5 font-sans'>User Data</div>
            <div className='pt-[20px] flex justify-evenly'>
                <div className='w-[40%]'>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Full Name:</code>
                        <i className='flex flex-wrap'>{props.user.first_name} {props.user.last_name}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Email:</code>
                        <i className='flex flex-wrap'>{props.user.email}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>SSN:</code>
                        <i className='flex flex-wrap'>{props.user.social_security_number}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Zip:</code>
                        <i className='flex flex-wrap'>{props.user.zip_code}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Mobile No. :</code>
                        <i className='flex flex-wrap'>{props.user.phone_number}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>City:</code>
                        <i className='flex flex-wrap'>{props.user.city}</i>
                    </div>
                </div>
                <span className='border-l-2'></span>
                <div className='w-[40%]'>

                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Created At:</code>
                        <i className='flex flex-wrap'>{props.user.created_at}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Gender:</code>
                        <i className='flex flex-wrap'>{props.user.gender}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>DOB:</code>
                        <i className='flex flex-wrap'>{props.user.date_of_birth}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Kids(if any):</code>
                        <i className='flex flex-wrap'>{props.user.kids}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>Address:</code>
                        <i className='flex flex-wrap'>{props.user.address_one} , {props.user.address_two}</i>
                    </div>

                    <div className='flex justify-between py-[10px]'>
                        <code className='font-semibold'>State:</code>
                        <i className='flex flex-wrap'>{props.user.state}</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsPopup