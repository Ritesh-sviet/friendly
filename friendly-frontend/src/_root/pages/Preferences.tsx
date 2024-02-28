
import React, { useEffect } from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

// This code snippet is a React functional component that handles user preferences. It uses the Formik library for form management and Yup for form validation. It also makes API calls to fetch and update user preferences. The component includes form fields for language, meal times, measurement units, communication preferences, and a submit button to update the preferences. Additionally, it uses Axios for making HTTP requests and Moment.js for working with dates and times.
const Preferences: React.FC = () => {
  const navigate = useNavigate();

  // these are initial value for the preferences
  const userPrefrencesInitialValues = {
    language: "English",
    breakfast: moment().set({ hour: 8, minute: 10 }),
    lunch: moment().set({ hour: 14, minute: 0 }),
    dinner: moment().set({ hour: 21, minute: 10 }),
    wake_time: moment().set({ hour: 5, minute: 10 }),
    bed_time: moment().set({ hour: 22, minute: 30 }),
    weight: "Kg",
    height: "Cm",
    blood_glucose: "mmo/l",
    cholestrol: "mg/dl",
    blood_pressure: "mmHg",
    distance: "km",
    system_emails: false,
    member_service_emails: true,
    sms: true,
    phone_call: false,
    post: true,
  }

  // this is validation schema for the preference in which they are defined 
  const userPrefrencesValidationSchema = Yup.object({

    language: Yup.string().required("Required!"),
    breakfast: Yup.string(),
    lunch: Yup.string(),
    dinner: Yup.string(),
    wake_time: Yup.string(),
    bed_time: Yup.string(),
    weight: Yup.string(),
    height: Yup.string(),
    blood_glucose: Yup.string(),
    cholestrol: Yup.string(),
    blood_pressure: Yup.string(),
    distance: Yup.string(),
    system_emails: Yup.boolean(),
    member_service_emails: Yup.boolean(),
    sms: Yup.boolean(),
    phone_call: Yup.boolean(),
    post: Yup.boolean(),
  })

  // using formik to manage form state and validation
  const formik = useFormik({
    initialValues: userPrefrencesInitialValues,
    validationSchema: userPrefrencesValidationSchema,
    onSubmit: async (values) => {
      const preferencesData = {
        'language': values.language,
        'breakfast': values.breakfast.format('HH:mm'),
        'lunch': values.lunch.format('HH:mm'),
        'dinner': values.dinner.format('HH:mm'),
        'wake_time': values.wake_time.format('HH:mm'),
        'bed_time': values.bed_time.format('HH:mm'),
        'weight': values.weight,
        'height': values.height,
        'blood_glucose': values.blood_glucose,
        'cholestrol': values.cholestrol,
        'blood_pressure': values.blood_pressure,
        'distance': values.distance,
        'system_emails': values.system_emails,
        'member_service_emails': values.member_service_emails,
        'sms': values.sms,
        'phone_call': values.phone_call,
        'post': values.post
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/update_user_preferences', preferencesData, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.data.status === "success") {
          toast.success(response.data.message);
        } else if (response.data.status === "error") {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('API Error:', error);
        toast.error('Failed to update preferences');
      }

    }
  });

  // this function fetches the preferences data from the API and updates the state of the form
  useEffect(() => {
    const url = 'http://127.0.0.1:8000/api/user_preferences';
    const fetchPreferencesData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === 'success') {
          const loadedPreferencesData = {
            'language': response.data.data.language,
            'breakfast': response.data.data.breakfast,
            'lunch': response.data.data.lunch,
            'dinner': response.data.data.dinner,
            'wake_time': response.data.data.wake_time,
            'bed_time': response.data.data.bed_time,
            'weight': response.data.data.weight,
            'height': response.data.data.height,
            'blood_glucose': response.data.data.blood_glucose,
            'cholestrol': response.data.data.cholestrol,
            'blood_pressure': response.data.data.blood_pressure,
            'distance': response.data.data.distance,
            'system_emails': response.data.data.system_emails,
            'member_service_emails': response.data.data.member_service_emails,
            'sms': response.data.data.sms,
            'phone_call': response.data.data.phone_call,
            'post': response.data.data.post
          };
          formik.setValues({
            language: loadedPreferencesData.language,
            breakfast: moment(loadedPreferencesData.breakfast, 'HH:mm'),
            lunch: moment(loadedPreferencesData.lunch, 'HH:mm'),
            dinner: moment(loadedPreferencesData.dinner, 'HH:mm'),
            wake_time: moment(loadedPreferencesData.wake_time, 'HH:mm'),
            bed_time: moment(loadedPreferencesData.bed_time, 'HH:mm'),
            weight: loadedPreferencesData.weight,
            height: loadedPreferencesData.height,
            blood_glucose: loadedPreferencesData.blood_glucose,
            cholestrol: loadedPreferencesData.cholestrol,
            blood_pressure: loadedPreferencesData.blood_pressure,
            distance: loadedPreferencesData.distance,
            system_emails: loadedPreferencesData.system_emails === 1,
            member_service_emails: loadedPreferencesData.member_service_emails === 1,
            sms: loadedPreferencesData.sms === 1,
            phone_call: loadedPreferencesData.phone_call === 1,
            post: loadedPreferencesData.post === 1,
          });
        }
        else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchPreferencesData();
  }, [formik.handleSubmit]);


  return (
    <div className='preferences h-full w-full'>
      <div className='flex text-2xl w-56 justify-evenly items-center mt-8 cursor-pointer'>
        <IoArrowBackOutline
          className='goBackIcon hover:-translate-x-1 hover:transition-all hover:ease-in-out hover:duration-300 text-3xl'
          onClick={() => navigate('/friendly')}
        />
        Preferences
      </div>
      <div className='preferencesMain flex flex-col w-11/12 my-0 mx-auto'>
        <Card className="w-full mx-auto mt-[30px] pt-[40px]">
          <form onSubmit={formik.handleSubmit}>
            <CardContent className='flex flex-wrap justify-between'>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label className='text-lg font-light'>Language</Label>
                <Select value={formik.values.language} onValueChange={(value) => formik.setFieldValue('language', value)}>
                  <SelectTrigger className="w-[95%] h-[60px] text-xl focus:outline-none">
                    <SelectValue placeholder="Select your language" />
                    <SelectContent>
                      <SelectGroup >
                        <SelectItem className='text-xl' value="English">English</SelectItem>
                        <SelectItem className='text-xl' value="Spanish">Spanish</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label className='text-lg font-light'>Breakfast</Label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    value={formik.values.breakfast}
                    onChange={(newValue) => formik.setFieldValue('breakfast', newValue?.format('LT'))}
                  />
                </LocalizationProvider>
                {/* <TimePicker value={value} /> */}
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <div className='w-[95%] flex flex-col'>
                  <Label className='text-lg font-light'>Lunch</Label>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      ampm
                      value={formik.values.lunch}
                      onChange={(newValue) => formik.setFieldValue('lunch', newValue)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>

                <Label className='text-lg font-light'>Dinner</Label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    value={formik.values.dinner}
                    onChange={(newValue) => formik.setFieldValue('dinner', newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <div className='w-[95%] flex flex-col'>
                  <Label className='text-lg font-light'>Wake Time</Label>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <TimePicker
                      ampm
                      value={formik.values.wake_time}
                      onChange={(newValue) => formik.setFieldValue('wake_time', newValue)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>

                <Label className='text-lg font-light'>Bed Time</Label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    ampm
                    value={formik.values.bed_time}
                    onChange={(newValue) => formik.setFieldValue('bed_time', newValue)}
                  />
                </LocalizationProvider>
              </div>

              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label htmlFor='weight' className='text-lg font-light'>Weight</Label>
                <div className='w-[95%] flex items-center justify-evenly'>
                  <div className='mt-[20px] flex items-center justify-around w-[60px]'>
                    <input
                      type='radio'
                      name='weight'
                      id='W-1'
                      value='Kg'
                      checked={formik.values.weight === 'Kg'}
                      onChange={() => formik.setFieldValue('weight', 'Kg')}
                    /><Label htmlFor="W-1" className='text-xl'>Kg </Label></div>
                  <div className='mt-[20px] flex items-center justify-around w-[60px]'>
                    <input
                      type='radio'
                      name='weight'
                      id='W-2'
                      value='Lbs'
                      checked={formik.values.weight === 'Lbs'}
                      onChange={() => formik.setFieldValue('weight', 'Lbs')}
                    /> <Label htmlFor="W-2" className='text-xl'>Lbs</Label></div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label htmlFor='height' className='text-lg font-light'>Height</Label>
                <div className='w-[95%] flex items-center justify-evenly'>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input
                      type='radio'
                      name='height'
                      id='H-1'
                      value='Cm'
                      checked={formik.values.height === 'Cm'}
                      onChange={() => formik.setFieldValue('height', 'Cm')}
                    /> <Label htmlFor="H-1" className='text-xl'>Cm</Label></div>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input
                      type='radio'
                      name='height'
                      id='H-2'
                      value='ft/inches'
                      checked={formik.values.height === 'ft/inches'}
                      onChange={() => formik.setFieldValue('height', 'ft/inches')}
                    /> <Label htmlFor="H-2" className='text-xl'>ft/inches</Label></div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label htmlFor='bg' className='text-lg font-light'>Blood Glucose</Label>
                <div className='w-[95%] flex items-center justify-evenly'>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='bg'
                      id='Bg-1'
                      value='mmo/l'
                      checked={formik.values.blood_glucose === 'mmo/l'}
                      onChange={() => formik.setFieldValue('blood_glucose', 'mmo/l')}
                    /> <Label htmlFor="Bg-1" className='text-xl'>mmo/l</Label></div>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='bg'
                      id='Bg-2'
                      value='mg/dl'
                      checked={formik.values.blood_glucose === 'mg/dl'}
                      onChange={() => formik.setFieldValue('blood_glucose', 'mg/dl')}
                    /> <Label htmlFor="Bg-2" className='text-xl'>mg/dl</Label></div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label htmlFor='ch' className='text-lg font-light'>Cholestrol</Label>
                <div className='w-[95%] flex items-center justify-evenly'>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='ch'
                      id='C-1'
                      value='mmo/l'
                      checked={formik.values.cholestrol === 'mmo/l'}
                      onChange={() => formik.setFieldValue('cholestrol', 'mmo/l')}
                    /> <Label htmlFor="C-1" className='text-xl'>mmo/l </Label></div>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='ch'
                      id='C-2'
                      value='mg/dl'
                      checked={formik.values.cholestrol === 'mg/dl'}
                      onChange={() => formik.setFieldValue('cholestrol', 'mg/dl')}
                    /> <Label htmlFor="C-2" className='text-xl'>mg/dl</Label></div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label htmlFor='bp' className='text-lg font-light'>Blood Pressure</Label>
                <div className='w-[95%] flex items-center justify-evenly'>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='bp'
                      id='Bp-1'
                      value='kPa'
                      checked={formik.values.blood_pressure === 'kPa'}
                      onChange={() => formik.setFieldValue('blood_pressure', 'kPa')}
                    /> <Label htmlFor="Bp-1" className='text-xl'>kPa </Label></div>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='bp'
                      id='Bp-2'
                      value='mmHg'
                      checked={formik.values.blood_pressure === 'mmHg'}
                      onChange={() => formik.setFieldValue('blood_pressure', 'mmHg')}
                    /> <Label htmlFor="Bp-2" className='text-xl'>mmHg</Label></div>
                </div>
              </div>
              <div className='w-1/2 flex flex-col h-[100px] ]'>
                <Label htmlFor='ds' className='text-lg font-light'>Distance</Label>
                <div className='w-[95%] flex items-center justify-evenly'>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='d'
                      id='D-1'
                      value='km'
                      checked={formik.values.distance === 'km'}
                      onChange={() => formik.setFieldValue('distance', 'km')}
                    /> <Label htmlFor="D-1" className='text-xl'>km</Label></div>
                  <div className='mt-[20px] flex items-center justify-around w-[100px]'>
                    <input type='radio'
                      name='d'
                      id='D-2'
                      value='miles'
                      checked={formik.values.distance === 'miles'}
                      onChange={() => formik.setFieldValue('distance', 'miles')}
                    /> <Label htmlFor="D-2" className='text-xl'>miles</Label></div>
                </div>
              </div>
            </CardContent>
            <div className='w-full h-[80px] border-y-2 flex justify-start items-center text-xl pl-[20px] opacity-[.5]'>
              Communication Type
            </div>
            <CardContent className='flex flex-wrap justify-between mt-[50px]'>
              <div className='flex justify-around items-center w-1/2 h-[100px]'>
                <Label className='text-lg font-light'>System Emails</Label>
                <div>
                  <Label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={formik.values.system_emails} onChange={() => formik.setFieldValue('system_emails', !formik.values.system_emails)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </Label>
                </div>
              </div>

              <div className='flex justify-around items-center w-1/2 h-[100px]  '>
                <Label className='text-lg font-light'>Member Services Emails</Label>
                <div>
                  <Label className="relative inline-flex item-center cursor-pointer">
                    <input type="checkbox" checked={formik.values.member_service_emails} onChange={() => formik.setFieldValue('member_service_emails', !formik.values.member_service_emails)} className="sr-only peer" /* checked = {Notification ? true : false} */ />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </Label>
                </div>
              </div>

              <div className='flex justify-around items-center w-1/2 h-[100px]  '>
                <Label className='text-lg font-light'>SMS</Label>
                <div>
                  <Label className="relative inline-flex item-center cursor-pointer">
                    <input type="checkbox" checked={formik.values.sms} onChange={() => formik.setFieldValue('sms', !formik.values.sms)} className="sr-only peer"  />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </Label>
                </div>
              </div>

              <div className='flex justify-around items-center w-1/2 h-[100px]  '>
                <Label className='text-lg font-light'>Phone Call</Label>
                <div>
                  <Label className="relative inline-flex item-center cursor-pointer">
                    <input type="checkbox" checked={formik.values.phone_call} onChange={() => formik.setFieldValue('phone_call', !formik.values.phone_call)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </Label>
                </div>
              </div>

              <div className='flex justify-around items-center w-1/2 h-[100px]  '>
                <Label className='text-lg font-light'>Post</Label>
                <div>
                  <Label className="relative inline-flex item-center cursor-pointer">
                    <input type="checkbox" checked={formik.values.post} onChange={() => formik.setFieldValue('post', !formik.values.post)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className='w-full flex justify-end'>
              <Button type='submit' variant='outline' className='bg-sidebar text-white text-3xl w-auto h-auto rounded-lg'>Update</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div >
  );
};

export default Preferences;