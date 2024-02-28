import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AdminRegisterInitialValues, AdminRegisterValidationSchema } from '@/lib/validation'
import { useFormik } from 'formik'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

// This code defines a React functional component called Register, which sets up form state using the useState hook and form validation using the useFormik hook. It also uses the axios library to make a POST request to an API endpoint when the form is submitted. The component renders a signup form with fields for email, new password, confirm password, and full name, along with validation error messages. If the form submission is successful, the user is redirected to the admin login page.
const Register: React.FC = () => {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: AdminRegisterInitialValues,
        validationSchema: AdminRegisterValidationSchema,
        // This code snippet is an asynchronous function that handles form submission. It uses axios to make a POST request to an API endpoint for admin signup. Upon receiving the response, it displays success or error messages using toast notifications, sets loading state, and redirects to the admin login page if the signup is successful. If there's an error during the POST request, it displays an error message using toast and sets the loading state accordingly.
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/admin_signup', {
                    email: values.adminEmail,
                    password: values.admin_password,
                    full_name: values.fullName
                });

                toast.success(response.data.message);
                setIsLoading(true);
                if (response.data.status === "success") {
                    setIsLoading(true);
                    setTimeout(() => {
                        navigate("/admin/login");
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
            <div>
                <div className='mb-8 flex items-center flex-col gap-3 text-sidebar'>
                    <p className='font-light text-base'>SIGNUP FORM</p>
                    <span className='text-4xl font-bold'>Register</span>
                </div>
                <Card className='w-[700px] py-5'>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='leading-10'>
                                <div className='leading-10 mb-5 h-28'>
                                    <Label className='text-md'>Email <span className='text-red-500'>*</span></Label>
                                    <div>
                                        {/* <Input className='h-12 p-5 text-md' type='email' placeholder='Email' /> */}
                                        <Input className='h-12 p-5 text-md' name='adminEmail' type='email' placeholder='Email' value={formik.values.adminEmail} onChange={formik.handleChange} />
                                        {formik.errors.adminEmail && formik.touched.adminEmail && (<p className=' m-0 text-red-600'>{formik.errors.adminEmail}</p>)}
                                    </div>
                                </div>
                                <div className='leading-10 mb-5 h-28'>
                                    <Label className='text-md'>New Password <span className='text-red-500'>*</span></Label>
                                    <div className='flex items-center justify-evenly rounded-lg text-xl border-2'>
                                        {/* <Input className='h-12 p-5 text-md' type='password' placeholder='New Password' /> */}
                                        <Input className='border-none h-12 p-5 text-md' name='admin_password' type={showNewPassword ? 'text' : 'password'} placeholder='New Password' value={formik.values.admin_password} onChange={formik.handleChange} />
                                        <span className='text-3xl cursor-pointer w-[20%] flex justify-center'>{showNewPassword ? <PiEyeSlashThin onClick={() => setShowNewPassword(!showNewPassword)} /> : <PiEyeThin onClick={() => setShowNewPassword(!showNewPassword)} />}</span>
                                    </div>
                                    {formik.errors.admin_password && formik.touched.admin_password && (<p className=' m-0 text-red-600'>{formik.errors.admin_password}</p>)}
                                </div>
                                <div className='leading-10 mb-5 h-28'>
                                    <Label className='text-md'>Confirm Password <span className='text-red-500'>*</span></Label>
                                    <div className='flex items-center justify-evenly rounded-lg text-xl border-2'>
                                        {/* <Input className='h-12 p-5 text-md' type='password' placeholder='Confirm Password' /> */}
                                        <Input className='border-none h-12 p-5 text-md' name='confirm_password' type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' value={formik.values.confirm_password} onChange={formik.handleChange} />
                                        <span className='text-3xl cursor-pointer w-[20%] flex justify-center'>{showConfirmPassword ? <PiEyeSlashThin onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <PiEyeThin onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}</span>
                                    </div>
                                    {formik.errors.confirm_password && formik.touched.confirm_password && (<p className=' m-0 text-red-600'>{formik.errors.confirm_password}</p>)}
                                </div>
                                <div className='leading-10 mb-5 h-28'>
                                    <Label className='text-md'>Full Name <span className='text-red-500'>*</span></Label>
                                    <div>
                                        {/* <Input className='h-12 p-5 text-md' type='text' placeholder='Enter Full Name' /> */}
                                        <Input className='h-12 p-5 text-md' name='fullName' type='text' placeholder='Enter Full Name' value={formik.values.fullName} onChange={formik.handleChange} />
                                        {formik.errors.fullName && formik.touched.fullName && (<p className=' m-0 text-red-600'>{formik.errors.fullName}</p>)}
                                    </div>
                                </div>
                                <div className='leading-10 mb-5'>
                                    <Button type='submit' variant={'outline'} className='bg-sidebar text-md text-white w-48 h-14'>
                                        {isLoading ? <div className='flex flex-center gap-2 items-center justify-center px-2'>
                                            <img src={"../../../public/assets/loader/Ripple-1s-200px.gif"} height={20} width={50} /> Loading
                                        </div> : "Register"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className='flex justify-center text-lg'>
                        <p>if you already have an account? <Link to={'/admin/login'}><span className='text-blue-700 cursor-pointer'>Login</span></Link></p>
                    </CardFooter>
                </Card>
            </div >
        </>
    )
}

export default Register