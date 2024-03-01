import { useState } from 'react'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/components/shared/Loader';
import axios from 'axios';
import { Button } from '@/components/ui/button';

/**
 * This function handles the form submission for user sign-in. It validates the 
 * user input and makes an API call to sign in the user. It also manages the 
 * loading state and redirects the user to the appropriate page after successful 
 * sign-in.
 *
 * @param {React.FormEvent<HTMLFormElement>} event - the form submission event
 * @return {void}
 */

// This code snippet is a React component for a sign-in form. It handles form submission, validates user input, makes an API call to sign in the user, manages loading state, and redirects the user after successful sign-in. It also includes input fields for email and password, with form validation and error handling.

const SigninForm = () => {

  // This code snippet defines a state variable called `isLoading` and a function called `setIsLoading`. It sets the initial value of `isLoading` to `false`.
  const [isLoading, setIsLoading] = useState(false)
  // this code snippet defines a state variable called `showPassword` and a function called `setShowPassword`. It sets the initial value of `showPassword` to `false`.
  const [showPassword, setShowPassword] = useState(false);
  // this code snippet defines a state variable called `email` and a function called `setEmail`. It sets the initial value of `email` to an empty string.
  const [email, setEmail] = useState("");
  // this code snippet defines a state variable called `password` and a function called `setPassword`. It sets the initial value of `password` to an empty string.
  const [password, setPassword] = useState("");
  // this code snippet defines a state variable called `error` and a function called `setError`. It sets the initial value of `error` to an empty string.
  const navigate = useNavigate();
  
  // this function will handle the login of the user when the request sent to the backend and the credentials will be checked and of the all the details are correct only then the user is going to be redirected to the home page else redirected to the same page with an error message in the formm of toast
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // there the event preventDefault is used because whenever the form is submited the page will not refresh
    event.preventDefault();
    // here if the email and password are not empty then only the request will be sent
    if (email !== '' && password !== '') {
      // here try and catch method is used to handle the error
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/signin', {
          email: email,
          password: password
        });
        if (response.data.status === "success") {
          setIsLoading(true);
          setTimeout(() => {
            navigate("/friendly");
          }, 700);
          toast.success(response.data.message);
          // setting the token and name in the local storage so that they can be used later on when needed
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('name', response.data.data.firstname);
          localStorage.setItem('id', response.data.data.id);
        }
        else {
          toast.error(response.data.message);
          setIsLoading(false);
        }
      }
      catch (error) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    }
    else {
      toast.error('Please fill all the fields');
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  return (
    <div className='flex flex-col leading-[50px]'>
      <form onSubmit={handleLogin}>

        <h1 className='w-full h-[50px] font-nunito text-[35px] leading-[50px] tracking-[2px]'>Login Your Account</h1>
        <p className='h-[5px] w-[50px] rounded-[10px] bg-bar mb-[50px] mt-[20px]'></p>
        <div className='leading-[40px]'>
          <label htmlFor='email'>Email Address</label>
          <input className='w-full h-[60px] rounded-[5px] border-slate-300 border-2 py-[4px] px-[10px] font-[300] text-[20px] focus:outline-none' type='email' title='Enter your email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />

        </div>
        <div className='leading-[40px] '>
          <label htmlFor='password'>Password</label>
          <div className='h-[60px] rounded-lg text-xl flex items-center justify-evenly outline-none border-slate-300 border-2'>
            <input className='h-full w-[95%] focus:outline-none p-[15px]' type={showPassword ? 'text' : 'password'} title='Enter your password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
            <span className='text-3xl cursor-pointer w-[20%] flex justify-center outline-none hover:text-slate-600'>{showPassword ? <PiEyeSlashThin onClick={() => setShowPassword(!showPassword)} /> : <PiEyeThin onClick={() => setShowPassword(!showPassword)} />}</span>
          </div>

        </div>

        <div className='flex flex-col mt-[15px] text-20px'>
          <Link className=' text-bar outline-none text-[20px]' to='/sign-up' >Sign Up</Link>
          <Button variant={'outline'} className='mt-[20px] w-[150px] h-[50px] rounded-[10px] text-[25px] outline-none border-none bg-sidebar text-white' type='submit'>
            {isLoading ? <div className='flex items-center justify-center gap-2 px-2 flex-center'>
              < Loader /> Loading
            </div> : "Log in"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm