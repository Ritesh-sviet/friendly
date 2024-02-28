import React from 'react'
import { AlertDialogCancel } from '../ui/alert-dialog'
import { GoXCircle } from "react-icons/go";

// Defines the User interface
interface User {
    profile_photo: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: string;
    state: string;
    date_of_birth: string;
    social_security_number: string;
    address_one: string;
    city: string;
    zip_code: string;
    username: string;
}
// Defines the props interface
interface RequestedFriendPopupProps {
    user: User;
}

// This is a React functional component called RequestedFriendPopup. It takes in props of type RequestedFriendPopupProps and renders a popup with details about a friend, including their profile photo, name, email, phone number, gender, state, date of birth, social security number, address, city, and zip code. The styling is done using Tailwind CSS classes.

// This component is responsible for displaying the requested friend popup.
// 
const RequestedFriendPopup: React.FC<RequestedFriendPopupProps> = (props) => {
    return (
        <div className='CreateWavePanel`'>
            <div className='w-full text-right'>
                <AlertDialogCancel className='text-4xl rounded-[50%] p-0 text-red-600 hover:outline-green'><GoXCircle /></AlertDialogCancel>
            </div>
            <div className='border-2 h-40 bg-linkcolor w-full text-center mb-20 rounded-xl'>
                <span className='text-9xl opacity-5'>Details</span>
                <div className='flex justify-start items-center w-full h-0'>
                    {/* <img src={'../../public/assets/icons/Layer_1.png'} alt='profile' className='ml-10 h-32 w-auto rounded-full border-2 bg-white' /> */}
                    <img src={props.user.profile_photo ? `http://127.0.0.1:8000/profile_photos/${props.user.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='ml-10 h-32 w-32 rounded-[50%] border-2 bg-white' />
                    <div className='ml-[20px] pb-5 flex flex-col justify-start items-center'>
                        <span className='text-3xl font-semibold text-white'>{props.user.first_name} {props.user.last_name}</span>
                        <span className='text-xl font-normal text-white'>@{props.user.username}</span>
                    </div>
                </div>
            </div>
            <span className='text-xl'>Basic Details</span>
            <div className='pt-[20px] flex justify-evenly'>
                <div className='w-[40%]'>
                    <div className='flex justify-between py-[10px]'>
                        <code>Name:</code>
                        <i className='flex flex-wrap'>{props.user.first_name} {props.user.last_name}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>Email ID:</code>
                        <i className='flex flex-wrap'>{props.user.email}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>Mobile No. :</code>
                        <i className='flex flex-wrap'>{props.user.phone_number}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>Gender:</code>
                        <i className='flex flex-wrap'>{props.user.gender}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>State:</code>
                        <i className='flex flex-wrap'>{props.user.state}</i>
                    </div>
                </div>
                <span className='border-l-2'></span>
                <div className='w-[40%]'>
                    <div className='flex justify-between py-[10px]'>
                        <code>DOB:</code>
                        <i className='flex flex-wrap'>{props.user.date_of_birth}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>Social Security:</code>
                        <i className='flex flex-wrap'>{props.user.social_security_number}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>Address:</code>
                        <i className='flex flex-wrap'>{props.user.address_one}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>City:</code>
                        <i className='flex flex-wrap'>{props.user.city}</i>
                    </div>
                    <div className='flex justify-between py-[10px]'>
                        <code>Zip Code:</code>
                        <i className='flex flex-wrap'>{props.user.zip_code}</i>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RequestedFriendPopup