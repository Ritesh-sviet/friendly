import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import BasicDetailsForm from '@/components/shared/BasicDetailsForm';
import PersonalDetailsForm from '@/components/shared/PersonalDetailsForm';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoMdDoneAll } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

interface useDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_photo: string;
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

// This code defines a Profile component using React functional component. It sets up state variables for loading, text, user basic details, selected profile image, and form activation flags. It uses the useEffect hook to fetch user details from an API when the component mounts. It also defines functions to handle form changes, file selection, and updating the profile picture. The component renders a profile view with options to update the profile picture and change user information.
const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Upload a new Photo');
  const [userBasicDetails, setUserBasicDetails] = useState<useDetails[]>([]);
  const [selectedProfileImage, setSelectedProfileImage] = useState('')
  const [basicDetailsFormActive, setBasicDetailsFormActive] = useState(true);
  const [personalDetailsFormActive, setPersonalDetailsFormActive] = useState(false);
  const navigate = useNavigate();

  // this will fetch all details about the user and all the details will be used in the form
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_details', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserBasicDetails(response.data.data);
        setSelectedProfileImage(response.data.data.profile_photo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // this function will handle which form to show either basic details form or personal details form by default the vbasicdetails form will be visible to the user
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

  // this is used when user selected the profile photo
  const handleFileChange = (event) => {
    setSelectedProfileImage(event.target.files ? event.target.files[0] : null);
    setText('selected');
  }

  // this is used when the user changes the profile photo
  const changeProfilePicForm = async (event) => {
    event.preventDefault();
    if (selectedProfileImage) {
      const url = 'http://127.0.0.1:8000/api/update_profile_pic';
      const formData = new FormData();
      formData.append('profile_photo', selectedProfileImage);
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === "success") {
          toast.success(response.data.message);
          window.location.reload();
        }
        else {
          toast.error(response.data.message);
        }
      }
      catch (error) {
        console.error('Error changing profile picture:', error.message);
      }
    }
  }
  return (
    <div className='h-full w-full'>
      <div className='flex text-2xl w-48 justify-evenly items-start mt-8 cursor-pointer'>
        <IoArrowBackOutline className='goBackIcon hover:-translate-x-1 hover:transition-all hover:ease-in-out hover:duration-300 text-3xl' onClick={() => navigate('/friendly')} /> Profile
      </div>
      <div className='max-w-[90%] mx-auto my-auto mt-10 mb-20'>
        <div className='border-2 h-40 bg-linkcolor w-full text-center rounded-xl'>
          <span className='text-9xl opacity-5'>My Profile</span>
          <form onSubmit={changeProfilePicForm}>
            <div className='flex justify-between items-center w-full relative bottom-14'>
              <div className='flex items-center'>
                <img src={selectedProfileImage ? `http://127.0.0.1:8000/profile_photos/${userBasicDetails.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='ml-10 h-32 mb-12 w-56 rounded-[50%] bg-white' />
                <div className="grid w-full items-center gap-1.5 ml-10 mb-28">
                  <label htmlFor="custom-file-upload" className={`text-white h-12 flex items-center pl-5 text-xl font-normal hover:text-black  active:scale-90 transition-transform duration-300 ease-in-out cursor-pointer rounded-lg}`}>
                    {text === 'selected' ? (<span className='text-green-600 flex gap-5 text-2xl'><p className='text-white font-serif text-lg'>Selected</p><IoMdDoneAll /></span>) : text}
                  </label>
                  <Input type="file"
                    id="custom-file-upload"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    onChange={handleFileChange}
                    className='hidden'
                  />
                  <span className='text-white flex gap-5'><p className='text-green-800'>Profile Image:</p>Profile-pic.jpg</span>
                </div>
              </div>
              <span className='flex'>
                {text === 'selected' ? (<p className='text-green-600 bottom-16 relative pr-10 text-2xl'><FaArrowRightLong /></p>) : ''}
                <Button type='submit' variant={'outline'} className='bg-sidebar text-white text-lg mr-[40px] relative bottom-20 active:scale-90 transition-transform duration-300 ease-in-out cursor-pointer' >
                  Update Profile
                </Button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <p className='text-2xl ml-20 py-5'>Change Information</p>

      <Card className="w-[90%] mx-auto my-auto my -10">
        <CardHeader className='mb-3'>
          <div className='flex w-1/2 justify-evenly'>
            <CardTitle className={`text-lg font-normal ${basicDetailsFormActive ? 'underline font-semibold' : ''} cursor-pointer`} onClick={() => handleChangeform('basic')}>Basic Details</CardTitle>
            <CardTitle className={`text-lg font-normal ${personalDetailsFormActive ? 'underline font-semibold' : ''} cursor-pointer`} onClick={() => handleChangeform('personal')}>Personal Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (<img src={'../../public/assets/loader/Loader.gif'} alt="Loader" className='mx-auto' />) : basicDetailsFormActive ? (<BasicDetailsForm useDetails={userBasicDetails} />) : (<>
            {basicDetailsFormActive ? <BasicDetailsForm useDetails={userBasicDetails} /> : <PersonalDetailsForm useDetails={userBasicDetails} />}
          </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile