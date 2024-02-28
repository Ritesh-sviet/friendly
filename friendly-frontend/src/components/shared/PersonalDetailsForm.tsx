// import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';

interface User {
    date_of_birth: string;
    gender: string;
    martial_status: string;
    social_security_number: string;
    social_media: string;
    kids: string;
}
interface PersonalDetailsFormProps {
    useDetails: User;
}
// this is the form for personal details present in the user profile
/**
 * Personal details form component that handles user input for personal details.
 *
 * @param {object} props - component properties
 * @return {JSX.Element} The form component for entering personal details.
 */
const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = (props) => {
    
    // This code snippet sets the initial values for the form using the `useDetails` prop. It also sets the validation schema for the form using the `Yup` library.
    const personalDetailsValidationSchema = Yup.object({
        date_of_birth: Yup.string().required("Required!"),
        gender: Yup.string().required("Required!")
    })

    // This code snippet defines the form's initial values and validation schema. It uses the `useFormik` hook from the `formik` library to manage form state and validation.

    // This code snippet defines the form's initial values and validation schema. It uses the `useFormik` hook from the `formik` library to manage form state and validation.

    // This code snippet defines the form's initial values and validation schema. It uses the `useFormik` hook from the `formik` library to manage form state and validation.

    const personalDetailsInitialValues = {
        date_of_birth: props.useDetails.date_of_birth || "",
        gender: props.useDetails.gender || "",
        martial_status: props.useDetails.martial_status || "",
        social_security_number: props.useDetails.social_security_number || "",
        social_media: props.useDetails.social_media || "",
        kids: props.useDetails.kids || "",
    }

    // This code snippet defines the form's onSubmit function. It uses the `useFormik` hook from the `formik` library to manage form state and validation.

    // This code snippet defines the form's onSubmit function. It uses the `useFormik` hook from the `formik` library to manage form state and validation.

    // This code snippet defines the form's onSubmit function. It uses the `useFormik` hook from the `formik` library to manage form state and validation.
    const formik = useFormik({
        initialValues: personalDetailsInitialValues,
        validationSchema: personalDetailsValidationSchema,
        // This code snippet handles form submission by making an asynchronous POST request to a local API endpoint using axios. It then checks the response for a "success" status, and updates the form values accordingly. If there's an error, it logs the error and displays an error message.
        onSubmit: async (values) => {
            try {
                // Handle form submission
                const response = await axios.post('http://127.0.0.1:8000/api/update_personal_profile', values,
                    {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                if (response.data.status === "success") {
                    toast.success(response.data.message);
                    formik.setValues({ ...formik.values, ...values });
                }
                else {
                    toast.error(response.data.message);
                }

            } catch (error) {
                console.error('Error handling form submission:', error);
                toast.error('An error occurred while submitting the form');
            }
        }
    });
    // This code snippet uses the `useEffect` hook to set the form values when `useDetails` prop changes.
    useEffect(() => {
        // Set the form values
        formik.setValues({
            ...formik.values,
            ...props.useDetails,
        });
    },[]);
    
    return (
        
        <form onSubmit={formik.handleSubmit}>
            {/* Personal Details */}
            <div className="grid w-full items-center gap-4">
                <div className='flex flex-col space-y-1.5'>
                    <div className="h-[150px] flex flex-row w-full gap-10">
                        <div className='w-1/2 leading-[50px] flex flex-col'>
                            <Label className='text-xl font-light leading-[50px]' htmlFor="DOB">DOB <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input type='date' id="name" placeholder="Enter Date of Birth" className='h-[60px] rounded-lg text-xl pl-5' name='date_of_birth' value={formik.values.date_of_birth} onChange={formik.handleChange} />
                                {formik.touched.date_of_birth && formik.errors.date_of_birth ? <div className='m-0 text-red-500'>{formik.errors.date_of_birth}</div> : null}
                            </div>
                        </div>
                        <div className='w-1/2 leading-[50px] flex flex-col'>
                            <Label className='text-xl font-light leading-[50px]'>Gender <span className='text-red-600'>*</span></Label>
                            <div>
                                <Select name='gender' value={formik.values.gender} onValueChange={(value) => { formik.setFieldValue('gender', value) }}>
                                    <SelectTrigger className="h-[60px] rounded-lg text-xl pl-5">
                                        <SelectValue placeholder="Select your gender" />
                                        <SelectContent >
                                            <SelectGroup >
                                                <SelectItem className='text-xl' value="Male">Male</SelectItem>
                                                <SelectItem className='text-xl' value="Female">Female</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </SelectTrigger>
                                </Select>
                                {formik.touched.gender && formik.errors.gender ? <div className='m-0 text-red-500'>{formik.errors.gender}</div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="h-[150px] flex flex-row w-full gap-10">
                        <div className='w-1/2 leading-[50px] flex flex-col'>
                            <Label className='text-xl font-light leading-[50px]'>Martial Status</Label>
                            <Select name='martial_status' value={formik.values.martial_status} onValueChange={(value) => formik.setFieldValue('martial_status', value)}>
                                <SelectTrigger className="h-[60px] rounded-lg text-xl pl-5">
                                    <SelectValue placeholder="Select your Martial Status" />
                                    <SelectContent>
                                        <SelectGroup >
                                            <SelectItem className='text-xl' value="Married">Married</SelectItem>
                                            <SelectItem className='text-xl' value="UnMarried">UnMarried</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                        </div>
                        <div className='w-1/2 leading-[50px]'>
                            <Label className='text-xl font-light' htmlFor="Social-Security">Social Security (Numbers Only)</Label>
                            <Input id="name" placeholder="Enter your social security number" className='h-[60px] rounded-lg text-xl focus:outline-none' name='social_security_number' value={formik.values.social_security_number} onChange={formik.handleChange} readOnly = {true}/>
                        </div>
                    </div>
                    <div className="h-[150px] flex flex-row w-full gap-10">
                        <div className='w-1/2 leading-[50px]'>
                            <Label className='text-xl font-light' htmlFor="Social">Social</Label>
                            <Input id="name" placeholder="Enter your social media link" className='h-[60px] rounded-lg text-xl' name='social_media' value={formik.values.social_media} onChange={formik.handleChange} />
                        </div>
                        <div className='w-1/2 leading-[50px]'>
                            <Label className='text-xl font-light' htmlFor="Kids">Kids (if Any)</Label>
                            <Input id="name" placeholder="Enter the number of kids you have" className='h-[60px] rounded-lg text-xl' name='kids' value={formik.values.kids} onChange={formik.handleChange} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button type='submit' variant={'ghost'} className='bg-sidebar text-white text-2xl hover:text-sidebar'>Update</Button>
                </div>
            </div>
        </form>
    )
}

export default PersonalDetailsForm



