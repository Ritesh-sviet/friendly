import React, { useEffect, useState } from 'react'
import { CardContent, CardHeader, CardTitle } from '../ui/card';
import BasicDetailsForm from './BasicDetailsForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import axios from 'axios';
import { AlertDialogCancel } from '../ui/alert-dialog';
import { GoXCircle } from 'react-icons/go';

// Defines the user details interface
// interface useDetails {
//     first_name: string;
//     last_name: string;
//     email: string;
//     phone_number: string;
//     date_of_birth: string;
//     address_one: string;
//     address_two: string;
//     city: string;
//     state: string;
//     social_security_number: string;
//     zip_code: string;
//     gender: string;
//     martial_status: string;
//     social_media: string;
//     kids: string;
// }
// Defines the user details interface
interface UserDetails {
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
}


// Defines the props interface
interface EditUserDetailsPopupProps {
    user: number;
}

// Define the EditUserDetailsPopup component
// this function is responsible for displaying the edit user details popup
/**
 * EditUserDetailsPopup component for editing user details.
 *
 * @param {EditUserDetailsPopupProps} props - props for the component
 * @return {ReactNode} JSX for the component
 */
const EditUserDetailsPopup: React.FC<EditUserDetailsPopupProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [basicDetailsFormActive, setBasicDetailsFormActive] = useState(true);
    const [personalDetailsFormActive, setPersonalDetailsFormActive] = useState(false);
    // const [userBasicDetails, setUserBasicDetails] = useState<useDetails[]>([]);
    const [userBasicDetails, setUserBasicDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/edit_user_Details', {
                    id: props.user,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                setUserBasicDetails(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    /**
     * Handles the form change based on the given form type.
     *
     * @param {string} formType - the type of form to handle
     * @return {void} 
     */
    /*
        This code defines a function handleChangeform that takes a formType parameter and based on the value of formType, it sets the state of basicDetailsFormActive and personalDetailsFormActive accordingly. If formType is 'basic', it sets basicDetailsFormActive to true and personalDetailsFormActive to false, and if formType is 'personal', it sets personalDetailsFormActive to true and basicDetailsFormActive to false.
    */
    const handleChangeform = (formType: string) => {
        if (formType === 'basic') {
            setBasicDetailsFormActive(true);
            setPersonalDetailsFormActive(false);
        }
        if (formType === 'personal') {
            setPersonalDetailsFormActive(true);
            setBasicDetailsFormActive(false);
        }
    }
    return (
        <>
            <span><AlertDialogCancel className='absolute text-4xl rounded-[50%] p-0 text-red-600 hover:outline-green'><GoXCircle /></AlertDialogCancel></span>
            <CardHeader>
                <div className='flex w-1/2 justify-evenly'>
                    <CardTitle className={`text-lg font-normal ${basicDetailsFormActive ? 'underline font-semibold' : ''} cursor-pointer`} onClick={() => handleChangeform('basic')}>Basic Details</CardTitle>
                    <CardTitle className={`text-lg font-normal ${personalDetailsFormActive ? 'underline font-semibold' : ''} cursor-pointer`} onClick={() => handleChangeform('personal')}>Personal Details</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className='h-[500px] overflow-y-scroll w-full px-5'>
                    {loading ? (<img src={'../../public/assets/loader/Loader.gif'} alt="Loader" className='mx-auto' />) : basicDetailsFormActive ? (<BasicDetailsForm useDetails={userBasicDetails} />) : (<>
                        {basicDetailsFormActive ? <BasicDetailsForm useDetails={userBasicDetails} /> : <PersonalDetailsForm useDetails={userBasicDetails} />}
                        {/* {basicDetailsFormActive ? <BasicDetailsForm useDetails={userBasicDetails} /> : <PersonalDetailsForm useDetails={userBasicDetails} />} */}
                    </>
                    )}
                </div>
            </CardContent>
        </>
    )
}

export default EditUserDetailsPopup