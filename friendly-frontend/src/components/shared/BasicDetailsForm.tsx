import React, { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify'
interface User {
    first_name: string;
    last_name: string;
    email: string;
    address_one: string;
    address_two: string;
    city: string;
    state: string;
    social_security_number: string;
    phone_number: string;
    zip_code: string;
}
interface BasicDetailsFormProps {
    useDetails: User;
}

/**
 * Represents a form for capturing basic details.
 * @param {Object} props - The props for the form.
 * @param {Object} props.useDetails - The details to prefill the form with.
 * @returns {JSX.Element} - The basic details form component.
 */
const BasicDetailsForm: React.FC<BasicDetailsFormProps> = (props) => {
    // Use the `useEffect` hook to set the form values when `useDetails` prop changes
    useEffect(() => {
        formik.setValues({
            ...formik.values,
            ...props.useDetails,
        });
    }, [props.useDetails]);

    const basicDetailsValidationSchema = Yup.object({
        first_name: Yup.string().required('Required!').min(3, 'Maximum 3 characters'),
        last_name: Yup.string().required('Required!').min(3, 'Maximum 3 characters'),
        email: Yup.string().email('Invalid email format').required('Required!'),
        address_one: Yup.string().required('Required!'),
        city: Yup.string().required('Required!'),
        state: Yup.string().required('Required!'),
        zip_code: Yup.string().required('Required!'),
    })

    // Define the validation schema for the basic details form
    const basicDetailsInitialValues = {
        first_name: props.useDetails.first_name || '',
        last_name: props.useDetails.last_name || '',
        email: props.useDetails.email || '',
        social_security_number: props.useDetails.social_security_number || '',
        phone_number: props.useDetails.phone_number || '',
        address_one: props.useDetails.address_one || '',
        address_two: props.useDetails.address_two || '',
        city: props.useDetails.city || '',
        state: props.useDetails.state || '',
        zip_code: props.useDetails.zip_code || '',
    };

    // Use the `useFormik` hook to initialize the form with the defined values and schema
    const formik = useFormik({
        initialValues: basicDetailsInitialValues,
        validationSchema: basicDetailsValidationSchema,
        onSubmit: async (values) => {
            // Handle form submission
            try {
                // Handle form submission
                const response = await axios.post('http://127.0.0.1:8000/api/update_basic_profile', values,
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
                console.error(error);
            }
        }
    });

    // Render the basic details form using the `formik` properties and methods
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className='flex flex-col space-y-1.5'>
                    <div className="h-[130px] flex flex-row w-full gap-8">
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="firstname">First name <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="Enter your first name" className='h-[60px] rounded-lg text-xl' name='first_name' value={formik.values.first_name} onChange={formik.handleChange} />
                                {formik.touched.first_name && formik.errors.first_name ? <div className='m-0 text-red-500'>{formik.errors.first_name}</div> : null}
                            </div>
                        </div>
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="lastname">Last name <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="Enter your last name" className='h-[60px] rounded-lg text-xl' name='last_name' value={formik.values.last_name} onChange={formik.handleChange} />
                                {formik.touched.last_name && formik.errors.last_name ? <div className='m-0 text-red-500'>{formik.errors.last_name}</div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="h-[130px] flex flex-row w-full gap-8">
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="email">Enter Email <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="Enter your email" className='h-[60px] rounded-lg text-xl' name='email' value={formik.values.email} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? <div className='m-0 text-red-500'>{formik.errors.email}</div> : null}
                            </div>
                        </div>
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="social-security">Social Security (Numbers Only)</Label>
                            <Input id="name" placeholder="Enter your social security number" className='h-[60px] rounded-lg text-xl' name='social_security_number' value={formik.values.social_security_number} onChange={formik.handleChange} readOnly={true} />
                        </div>
                    </div>
                    <div className="h-[130px] flex flex-row w-full gap-8">
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="mobile">Mobile Number</Label>
                            <Input id="name" placeholder="Enter your mobile number" className='h-[60px] rounded-lg text-xl' name='phone_number' value={formik.values.phone_number} onChange={formik.handleChange} />
                        </div>
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="address-one">Address One <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="Enter your address one" className='h-[60px] rounded-lg text-xl' name='address_one' value={formik.values.address_one} onChange={formik.handleChange} />
                                {formik.touched.address_one && formik.errors.address_one ? <div className='m-0 text-red-500'>{formik.errors.address_one}</div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="h-[130px] flex flex-row w-full gap-8">
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="address-two">Address Two</Label>
                            <Input id="name" placeholder="Enter your address two" className='h-[60px] rounded-lg text-xl' name='address_two' value={formik.values.address_two} onChange={formik.handleChange} />
                        </div>
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="city">City <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="select your city" className='h-[60px] rounded-lg text-xl' name='city' value={formik.values.city} onChange={formik.handleChange} />
                                {formik.touched.city && formik.errors.city ? <div className='m-0 text-red-500'>{formik.errors.city}</div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="h-[130px] flex flex-row w-full gap-8">
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="state">State <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="select your state" className='h-[60px] rounded-lg text-xl' name='state' value={formik.values.state} onChange={formik.handleChange} />
                                {formik.touched.state && formik.errors.state ? <div className='m-0 text-red-500'>{formik.errors.state}</div> : null}
                            </div>
                        </div>
                        <div className='w-1/2 leading-[40px]'>
                            <Label className='text-xl font-light' htmlFor="zipcode">Home Zip Code <span className='text-red-600'>*</span></Label>
                            <div>
                                <Input id="name" placeholder="Enter your zip code" className='h-[60px] rounded-lg text-xl' name='zip_code' value={formik.values.zip_code} onChange={formik.handleChange} />
                                {formik.touched.zip_code && formik.errors.zip_code ? <div className='m-0 text-red-500'>{formik.errors.zip_code}</div> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button type='submit' variant={'outline'} className='bg-sidebar text-white text-2xl hover:text-sidebar' >Update</Button>
                </div>
            </div>
        </form>
    )
}

export default BasicDetailsForm
