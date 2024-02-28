import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useState } from 'react'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// This code defines a functional component for a login form. It uses the useState hook to manage state variables such as showPassword, isLoading, email, and password. It also uses the axios library to make an asynchronous POST request to an API endpoint for user authentication. Upon successful login, it redirects the user to the admin dashboard and stores the authentication token in the localStorage. The form includes input fields for email and password, with validation and password visibility toggling functionality. The isLoading state is used to display a loading spinner while the form is being submitted. The toast library is used for displaying success and error messages. The component also includes a link to the registration page.
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // This code defines an asynchronous function handleLogin that is triggered by a form submission. It prevents the default form submission behavior, sends a POST request to an API endpoint with the email and password, and then handles the response accordingly. If the response indicates success, it sets loading state, navigates to the admin dashboard after a delay, displays a success message, and stores the token in local storage. If there's an error, it displays an error message and handles the error response. If the email or password is empty, it displays a message prompting to fill all fields.
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            event.preventDefault();
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/admin_login', {
                    email: email,
                    password: password
                });
                if (response.data.status === "success") {
                    setIsLoading(true);
                    setTimeout(() => {
                        navigate("/admin/dashboard");
                    }, 1000);
                    toast.success(response.data.message);
                    localStorage.setItem('token', response.data.data.token);
                }
                else {
                    toast.error(response.data.message);
                    setIsLoading(true);
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
        <>
            <div>
                <div className='mb-8 flex items-center flex-col gap-3 text-sidebar'>
                    <p className='font-light text-base'>SIGNUP FORM</p>
                    <span className='text-4xl font-bold'>Login</span>
                </div>
                <Card className='w-[700px] py-5'>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <div className='leading-10'>
                                <div className='leading-10 mb-5 h-24'>
                                    <Label className='text-md'>Email <span className='text-red-500'>*</span></Label>
                                    <div>
                                        <Input className='h-12 p-5 text-md' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {/* <Input type= 'email' placeholder='Email' value={Formik.values.adminEmail} onChange={Formik.handleChange} /> */}
                                    </div>
                                </div>
                                <div className='leading-10 mb-5 h-24'>
                                    <Label className='text-md'>Password <span className='text-red-500'>*</span></Label>
                                    <div className='flex items-center justify-evenly rounded-lg border-2'>
                                        <Input className='border-none h-12 p-5 text-md' type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className='text-3xl cursor-pointer w-[20%] flex justify-center'>{showPassword ? <PiEyeSlashThin onClick={() => setShowPassword(!showPassword)} /> : <PiEyeThin onClick={() => setShowPassword(!showPassword)} />}</div>
                                        {/* <Input type= 'email' placeholder='Email' value={Formik.values.adminEmail} onChange={Formik.handleChange} /> */}
                                    </div>
                                </div>
                                <div className='leading-10 mb-5 h-24'>
                                    <Button variant={'outline'} className='bg-sidebar text-md text-white px-12 py-7 ' type='submit'>
                                        {isLoading ? <div className='flex flex-center gap-2 items-center'>
                                            <img src={"../../../public/assets/loader/Ripple-1s-200px.gif"} height={20} width={50} /> Loading ...
                                        </div> : "Login"}
                                    </Button>

                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className='flex justify-center text-lg'>
                        <p>Don't have an account? <Link to={'/admin/register'}><span className='text-blue-700 cursor-pointer'>Register</span></Link></p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Login