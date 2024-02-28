import React, { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { useFormik } from 'formik'
import { PiEyeThin } from "react-icons/pi";
import { PiEyeSlashThin } from "react-icons/pi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangePasswordInitialValues, ChangePasswordValidationSchema } from '@/lib/validation';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
/**
 * React functional component for changing user's password.
 *
 * @return {JSX.Element} The ChangePassword component
 */

// This code snippet is a React functional component for changing a user's password. It uses React hooks like useState, useEffect, and useFormik for form handling and asynchronous validation. It also uses the axios library to make a POST request to update the user's password via an API endpoint, and it displays the form and a back button using Material-UI components.
const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const formik = useFormik({
    initialValues: ChangePasswordInitialValues,
    validationSchema: ChangePasswordValidationSchema,
    // This code snippet is an asynchronous function that makes a POST request to update a password using axios. It sends the old and new password in the request body along with an authorization token in the headers. If the request is successful, it shows a success message using toast, and if it fails, it shows an error message. If an error occurs during the request, it also shows an error message.
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/update_password', {
          oldpassword: values.oldPassword,
          newpassword: values.newPassword,
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }

        );
        // This code snippet is a toast that displays a success message if the request is successful, and an error message if it fails.
        if (response.data.status === "success") {
          toast.success(response.data.message);
          values.oldPassword = '';
          values.newPassword = '';
          values.confirmPassword = '';

        }
        else {
          toast.error(response.data.message);
        }
      }
      catch (error) {
        toast.error(error.message);
      }
    }
  });
  return (
    <>

      <div className='h-full w-full'>
        <div className='flex text-2xl w-[300px] justify-evenly items-center mt-8 cursor-pointer ml-[30px justify-evenly]'>
          <IoArrowBackOutline className='goBackIcon hover:-translate-x-1 hover:transition-all hover:ease-in-out hover:duration-300 text-3xl' onClick={() => navigate('/friendly')} /> Change Password
        </div>
        <div className='flex justify-center items-center my-[5%] rounded-[20px]'>
          <Card className='w-[95%]'>
            <CardContent className='flex justify-between items-center h-[38rem] w-full'>
              <form onSubmit={formik.handleSubmit}>

                <div className='w-full'>
                  <div className='h-[150px] leading-[50px] w-[32rem]'>
                    <label htmlFor='oldPassword' className='text-xl font-light'>Old Password</label>
                    <div className='rounded-lg text-xl border-2 flex items-center justify-evenly w-full'>
                      <input type={showPassword ? 'text' : 'password'} id='oldPassword' name='oldPassword' className='h-full w-[95%] focus:outline-none p-[15px]' value={formik.values.oldPassword} onChange={formik.handleChange} />
                      <div className='text-3xl cursor-pointer w-[20%] flex justify-center'>{showPassword ? <PiEyeSlashThin onClick={() => setShowPassword(!showPassword)} /> : <PiEyeThin onClick={() => setShowPassword(!showPassword)} />}</div>
                    </div>
                    {formik.touched.oldPassword && formik.errors.oldPassword ? <div className='m-0 text-red-500'>{formik.errors.oldPassword}</div> : null}
                  </div>
                  <div className='h-[150px] leading-[50px] w-[32rem]'>
                    <label htmlFor='newPassword' className='text-xl font-light'>New Password</label>
                    <div className='h-[60px] rounded-lg text-xl border-2 flex items-center justify-evenly'>
                      <input type={showNewPassword ? 'text' : 'password'} id='newPassword' name='newPassword' className='h-full w-[95%] focus:outline-none p-[15px]' value={formik.values.newPassword} onChange={formik.handleChange} />
                      <div className='text-3xl cursor-pointer w-[20%] flex justify-center'>{showNewPassword ? <PiEyeSlashThin onClick={() => setShowNewPassword(!showNewPassword)} /> : <PiEyeThin onClick={() => setShowNewPassword(!showNewPassword)} />}</div>
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword ? <div className='m-0 text-red-500'>{formik.errors.newPassword}</div> : null}
                  </div>
                  <div className='h-[150px] leading-[50px] w-[32rem]'>
                    <label htmlFor='confirmPassword' className='text-xl font-light'>Confirm Password</label>
                    <div className='h-[60px] rounded-lg text-xl border-2 flex items-center justify-evenly'>
                      <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className='h-full w-[95%] focus:outline-none p-[15px]' value={formik.values.confirmPassword} onChange={formik.handleChange} />
                      <div className='text-3xl cursor-pointer w-[20%] flex justify-center'>{showConfirmPassword ? <PiEyeSlashThin onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <PiEyeThin onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}</div>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='m-0 text-red-500'>{formik.errors.confirmPassword}</div> : null}
                  </div>
                  <div className='w-full leading-[50px] flex items-center justify-end'>
                    <Button variant='outline' className='bg-sidebar text-white text-2xl' type='submit'>Update</Button>
                  </div>
                </div>
              </form>
              <div className='w-1/2'>
                <img src="https://plus.unsplash.com/premium_photo-1700502264441-cf38978031fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="change password" width={500}
                  className='rounded-xl  shadow-slate-900 opacity-[.5]'
                />
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

    </>
  )
}

export default ChangePassword
