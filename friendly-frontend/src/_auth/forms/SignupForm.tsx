import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiEyeSlashThin } from "react-icons/pi";
import { PiEyeThin } from "react-icons/pi";
import { SignupValidationSchema, SignupFormInitialValues } from '@/lib/validation';
import Loader from '@/components/shared/Loader';
import axios from 'axios';

// This code snippet is a functional component in React that represents a signup form. It uses formik for form management, axios for making API requests, and toast for displaying notifications. It also uses state to manage loading and password visibility. The form has fields for first name, last name, email, phone number, password, and confirm password, along with validation and submit handling logic.
const SignupForm: React.FC = () => {
  // This code snippet defines the state variables `isLoading` and `showPassword`. It sets the initial values of `isLoading` to `false` and `showPassword` to `false`.
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // This code snippet defines a formik form with initial values, validation schema, and submit handler. It also uses toast for displaying notifications.
  const formik = useFormik({
    initialValues: SignupFormInitialValues,
    validationSchema: SignupValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/signup', {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          phone_number: values.phoneNumber
        });

        toast.success(response.data.message);
        setIsLoading(true);
        if (response.data.status === "success") {
          setIsLoading(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
          toast.success(response.data.data.message);
        }
        else {
          toast.error(response.data.data.message);
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      }
      catch (error) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    }
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ToastContainer />
        <h1 className='w-full h-[50px] font-nunito text-[35px] leading-[50px] tracking-[2px]'>Sign Up</h1>
        <p className='h-[5px] w-[50px] rounded-[10px] bg-bar mb-[50px] mt-[20px]'></p>
        <div className='flex gap-[30px] h-[115px] leading-[30px] text-[20px]'>
          <div className='flex flex-col h-[115px] leading-[30px] text-[20px]'>
            <label htmlFor='firstName'>First Name</label>
            <input className='w-full h-[60px] rounded-[5px] border-slate-300 py[4px] px-[10px] font-[300] text-[20px] border-2 focus:outline-none' type='text' title='Enter your firstname' id='firstName' name='firstName' value={formik.values.firstName} onChange={formik.handleChange} />
            {formik.errors.firstName && formik.touched.firstName && (<p className='m-0 text-red-600'>{formik.errors.firstName}</p>)}
          </div>
          <div className='flex flex-col h-[115px] leading-[30px] text-[20px]'>
            <label htmlFor='lastName'>Last Name</label>
            <input className='w-full h-[60px] rounded-[5px] border-slate-300 py[4px] px-[10px] font-[300] text-[20px] border-2 focus:outline-none' type='text' title='Enter your lastName' id='lastName' name='lastName' value={formik.values.lastName} onChange={formik.handleChange} />
            {formik.errors.lastName && formik.touched.lastName && (<p className='m-0 text-red-600'>{formik.errors.lastName}</p>)}
          </div>
        </div>
        <div className='flex flex-col h-[115px] leading-[30px] text-[20px]'>
          <label htmlFor='email'>Enter Email</label>
          <input className='w-full h-[60px] rounded-[5px] border-slate-300 py[4px] px-[10px] font-[300] text-[20px] border-2 focus:outline-none' type='email' title='Enter your email' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email && (<p className=' m-0 text-red-600'>{formik.errors.email}</p>)}
        </div>
        <div className='flex flex-col h-[115px] leading-[30px] text-[20px]'>
          <label htmlFor='phoneNumber'>Enter Phone No.</label>
          <input className='w-full h-[60px] rounded-[5px] border-slate-300 py[4px] px-[10px] font-[300] text-[20px] border-2 focus:outline-none' type='tel' pattern='[0-9]{10}' title='Enter your phone number' placeholder='1234567890' id='phoneNumber' name='phoneNumber' value={formik.values.phoneNumber} onChange={formik.handleChange} />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (<p className=' m-0 text-red-600'>{formik.errors.phoneNumber}</p>)}
        </div>
        <div className='flex flex-col h-[115px] leading-[30px] text-[20px]'>
          <label htmlFor='password'>Password</label>
          <div className='h-[60px] rounded-lg text-xl flex items-center justify-evenly outline-none border-slate-300 border-2'>
            <input className='h-full w-[95%] focus:outline-none p-[15px]' type={showPassword ? 'text' : 'password'} title='Enter your password' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
            <span className='text-3xl cursor-pointer w-[20%] flex justify-center outline-none hover:text-slate-600'>{showPassword ? <PiEyeSlashThin onClick={() => setShowPassword(!showPassword)} /> : <PiEyeThin onClick={() => setShowPassword(!showPassword)} />}</span>
          </div>
          {formik.errors.password && formik.touched.password && (<p className=' m-0 text-red-600'>{formik.errors.password}</p>)}
        </div>
        <div className='flex flex-col h-[115px] leading-[30px] text-[20px]'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='h-[60px] rounded-lg text-xl flex items-center justify-evenly outline-none border-slate-300 border-2'>
            <input className='h-full w-[95%] focus:outline-none p-[15px]' type={showConfirmPassword ? 'text' : 'password'} title='confirm your password' id='ConfirmPassword' name='confirm_password' value={formik.values.confirm_password} onChange={formik.handleChange} />
            <span className='text-3xl cursor-pointer w-[20%] flex justify-center outline-none hover:text-slate-600'>{showConfirmPassword ? <PiEyeSlashThin onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <PiEyeThin onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}</span>
          </div>
          {formik.errors.confirm_password && formik.touched.confirm_password && (<p className=' m-0 text-red-600'>{formik.errors.confirm_password}</p>)}
        </div>
        <div className='flex flex-col mt-[15px]'>
          <Link className='text-bar no-underline text-[20px]' to='/'>login</Link>
          <Button variant={'outline'} className='mt-[20px] w-[150px] h-[50px] rounded-[10px] text-[25px] outline-none border-none bg-sidebar text-white cursor-pointer' type='submit'>
            {isLoading ? <div className='flex flex-center gap-2 items-center justify-center px-2'>
              < Loader /> Loading
            </div> : "Sign Up"}
          </Button>
        </div>
      </form>
    </>
  )
}

export default SignupForm