import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { FaSearch } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import RequestedFriends from '@/components/shared/RequestedFriends';
import axios from 'axios';

interface FriendForm {
  fullName: string;
  email: string;
  message: string;
}
/**
 * A component for managing and interacting with a list of friends.
 *
 * @return {JSX.Element} The rendered JSX element
 */
// This code snippet defines a functional component called Friends using the React framework. It uses the useState hook to manage state variables for forms, invite, and searchTerm. It also uses the useNavigate hook for navigation. The component includes methods for handling form submission, input change, adding and removing forms. It also includes conditional rendering based on the invite state. The component renders a form for inviting friends and a list of requested friends.
const Friends: React.FC = () => {
  const [forms, setForms] = useState<FriendForm[]>([{ fullName: '', email: '', message: '' }]);
  const [invite, setInvite] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // This code snippet defines a function handleFormSubmit that sends a POST request to a local API endpoint using axios. It checks if the required form fields are filled, and then sends the form data along with authorization headers. It then handles the response, displaying success or error messages using the toast library.
  const handleFormSubmit = async (index: number, values: FriendForm) => {
    if (!values.fullName || !values.email || !values.message) {
      toast.error('Please fill all the fields');
    }
    else {
      const response = await axios.post('http://127.0.0.1:8000/api/send_friend_request', {
        name: values.fullName,
        email: values.email,
        message: values.message
      },
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      if (response.data.status === 'success') {
        toast.success(`Form ${index + 1} submitted successfully!`);
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }
    }
  };

  // This code snippet defines a function called handleInputChange that updates a form field in an array of forms based on the provided index, field name, and value.
  const handleInputChange = (index: number, fieldName: keyof FriendForm, value: string) => {
    const updatedForms = [...forms];
    updatedForms[index][fieldName] = value;
    setForms(updatedForms);
  };

  // This code snippet defines a function called addNewForm that adds a new form to an array of forms.
  const addNewForm = () => {
    setForms([...forms, { fullName: '', email: '', message: '' }]);
  };

  // This code snippet defines a function called removeForm that removes a form from an array of forms based on the provided index.
  const removeForm = (index: number) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };
  return (
    <div className='h-full w-full'>
      <div className='flex text-2xl w-48 justify-evenly items-start mt-8 cursor-pointer'>
        <IoArrowBackOutline className='goBackIcon hover:-translate-x-1 hover:transition-all hover:ease-in-out hover:duration-300 text-3xl' onClick={() => navigate('/friendly')} /> Friends
      </div>
      {invite &&
        <div className='w-[90%] mx-auto my-12'>
          {invite ? (<p className='text-2xl text-slate-500'>Invite Some Friends {localStorage.getItem('name')}, Show them your Waves and let's see what they can do</p>) : ''}
        </div>
      }
      <div className='max-w-[95%] mx-auto my-auto mt-10'>

        <Card className="w-[95%] mx-auto my-auto my -10">
          {!invite && (
            <CardHeader className='mb-5'>
              <div className='flex w-[90%] justify-between'>
                <CardTitle>
                  <div className='bg-white w-full h-16 py-0 pl-5 shadow-2xl border-2 rounded-full flex items-center'>
                    <FaSearch className='text-sidebar' />
                    <input
                      className='bg-transparent border-none h-full w-full text-lg font-medium ml-3 focus:outline-none'
                      placeholder='Type to search...'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardTitle>
                <CardTitle className={`text-lg font-normal cursor-pointer`}>
                  <Button className='bg-sidebar text-xl p-7' onClick={() => setInvite(true)}>Invite Friend</Button>
                </CardTitle>
              </div>
            </CardHeader>
          )}
          <CardContent>
            {invite ? (
              <>
                <div className='my-10'>
                  {forms.map((form, index) => (
                    <div className='my-5'>
                      <CardTitle className='text-sm'>Friend #{index + 1}</CardTitle>
                      <form key={index} onSubmit={(e) => { e.preventDefault(); handleFormSubmit(index, form) }}>
                        <div className="flex flex-row w-full gap-10 h-[150px]">
                          <div className='w-1/2 leading-[50px]'>
                            <Label className='text-xl font-light' htmlFor="name">Full name <span className='text-red-600'>*</span></Label>
                            <Input
                              type='text'
                              className='h-[60px] rounded-lg text-xl'
                              name='fullName'
                              value={form.fullName}
                              onChange={(e) => handleInputChange(index, 'fullName', e.target.value)}
                            />
                          </div>
                          <div className='w-1/2 leading-[50px]'>
                            <Label className='text-xl font-light' htmlFor="email">Email Address <span className='text-red-600'>*</span></Label>
                            <Input
                              type='email'
                              className='h-[60px] rounded-lg text-xl'
                              name='email'
                              value={form.email}
                              onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                            />

                          </div>
                        </div>
                        <div className='w-full leading-[50px] h-[120px]'>
                          <Label className='text-xl font-light' htmlFor="Message">Message <span className='text-red-600'>*</span></Label>
                          <Input
                            type='text'
                            className='h-[60px] rounded-lg text-xl'
                            name='message'
                            value={form.message}
                            onChange={(e) => handleInputChange(index, 'message', e.target.value)}
                          />
                        </div>
                        <Button type="submit" className='bg-sidebar text-md p-7 mt-10'>Send form {index + 1}</Button>
                        <div className='flex justify-end mr-10'>
                          {forms.length > 1 && <button className='text-red-600' onClick={() => removeForm(index)}>-Remove</button>}
                        </div>
                      </form>
                    </div>
                  ))}
                  <div className='flex justify-end mr-10'>
                    <button onClick={addNewForm} className='text-sidebar hover:underline'>+ Add Form</button>
                  </div>
                </div >
                <div className='w-full flex justify-end '>
                  <Button className='bg-sidebar text-xl p-7 mt-10' onClick={() => setInvite(false)}>Friends</Button>
                </div>
              </>
            ) : (
              <RequestedFriends />
            )}
          </CardContent>
        </Card>
      </div>
    </div >
  )
}

export default Friends;
