
import {
  Table,
  TableBody,
  TableRow,
} from "@/components/ui/table"
// import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import CreateWavePanel from '@/components/shared/CreateWavePanel';
import { toast } from "react-toastify";
import TextWithEllipsis from "@/components/shared/TextWithEllipsis";
import AllWavesPopup from "@/components/shared/AllWavesPopup";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_photo: string;
  username: string;
}

interface Wave {
  id: number;
  wave_message: string;
  wave_status: string;
  wave_name: string;
  user: User; // Include the user data in the Wave interface
}
interface selectedFile{
  name:string
}

// This code snippet is a React functional component that handles the creation and display of waves. It uses the useState and useEffect hooks to manage state and perform side effects. It also makes use of axios to make asynchronous HTTP requests to an API for fetching, updating, and creating waves. The component also includes event handlers for file selection, form submission, and status toggling. The UI is built using various components such as Card, Input, Button, Table, and AlertDialog from a UI framework.
const CreateWaves = () => {
  const [selectedFile, setSelectedFile] = useState<selectedFile | null>();
  const [message, setMessage] = useState("");
  const [text, setText] = useState("Upload Photos");
  const [userWaves, setUserWaves] = useState<Wave[]>([])
  const [formUpdated, setFormUpdated] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
  });

  // this will fetch all details of the user but we need only firstname and lastname so we use them only 
  useEffect(() => {
    // This code snippet defines an asynchronous function fetchData that makes a GET request to 'http://127.0.0.1:8000/api/user_details' using the axios library. It sets the request headers including an Authorization header with a JWT token retrieved from localStorage. If the response status is 'success', it sets the user data using the setUser function. Otherwise, it displays an error message using the toast.error function. If an error occurs during the request, it logs the error to the console.
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_details', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === 'success') {
          setUser(response.data.data);
        }
        else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // this function is responsible for uploading the file this will show show which file is chosen when any other file is uploaded
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    setText(`Uploaded`)
  };

  // this is for search there all the waves are stored in the array of usrWaves and here the array is filtered with the some following condition ls it's status is it active or inactive it will sort the result accordingly
  const [searchTerm, setSearchTerm] = useState('');
  const filteredEntries = userWaves.filter((userWaves) =>
    (searchTerm === '' || userWaves.wave_status.toLowerCase() === searchTerm.toLowerCase())
  );

  // this snippet is responsible to set the status of the wave active or inactive it will directly make changes to the datatabase that if th user make his wave inactive the wave would no longer visible to any user in the dashboard by default when the user created any wave the status of thw wave is active and when created successfully it is shown to to everyone.
  const handleStatusToggle = async (id: number) => {
    // it will take the id of the wave as  an argument which helps to identify the wave then it will send two parameter as args to the backend one is id and other is wave status that have to change
    const updatedEntries = await Promise.all(
      userWaves.map(async (wave) => {
        if (wave.id === id) {
          // Toggle between 'active' and 'inactive'
          const newStatus = wave.wave_status === 'active' ? 'inactive' : 'active';
          wave.wave_status = newStatus;

          try {
            // Update the wave_status in the database
            const response = await axios.put(
              `http://127.0.0.1:8000/api/update_wave_status/${id}`,
              {
                wave_status: newStatus,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );

            if (response.data.status === 'success') {
              toast.success(response.data.message);
              setFormUpdated(true); // Trigger a data fetch after updating the status
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            console.error('Error updating wave status:', error);
            toast.error('An error occurred while updating the wave status');
          }
        }
        return wave;
      })
    );
    setUserWaves(updatedEntries);
  };



  useEffect(() => {
    // This code snippet defines an asynchronous function called fetchData, which sends an HTTP GET request to 'http://127.0.0.1:8000/api/user_waves' using axios. If the request is successful, it updates the state with the received data and sets a flag to indicate that the form has been updated. If there's an error, it logs the error to the console.

    // this will fetch all the waves created by the loggedin user from the backend
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_waves', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // setEntries(response.data);
        setUserWaves(response.data.data);
        setFormUpdated(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [formUpdated]);

  //  this function is responsible for creating the wave
  // it will send the wave name and message to the backend
  const handleWaveSubmitForm = async (event) => {
    event.preventDefault();
    // it will check if the user has successfully entered the wave image and message only then the wave is submitted
    if (selectedFile!=='' && message !== '') {
      // 
      const url = 'http://127.0.0.1:8000/api/upload_wave';
      // here an instance of the object is created when all the data about the is appended in the variable of formData
      const formData = new FormData();
      formData.append('wave_name', selectedFile);
      formData.append('wave_message', message);
      formData.append('wave_status', 'active');
      // here the wave is created
      // axios
      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === 'success') {
          // when the wave is created the message is shown
          toast.success(response.data.message);
          // and the form is reseted
          setFormUpdated(true);
          setMessage('');
          setSelectedFile('');
          setText('Upload Photos');
        }


      } catch (error) {
        console.error('Error creating wave:', error);
        toast.error('An error occurred while creating the wave');
      }
    }
    else {
      toast.error('Please fill all the fields');
    }

  }

  return (
    <div className='createWaves h-full w-full'>
      <div className='flex text-2xl w-56 justify-evenly items-center mt-8 cursor-pointer'>
        <IoArrowBackOutline className='goBackIcon hover:-translate-x-1 hover:transition-all hover:ease-in-out hover:duration-300 text-3xl' onClick={() => navigate('/friendly')} /> Create Waves
      </div>
      <div className='createWavesMain flex flex-col w-11/12 my-0 mx-auto'>
        <div className='createWavesContent mt-10'>

          <Card className="w-[90%]">
            <CardHeader className='w-full'>
              <CardTitle><CreateWavePanel user={user} /></CardTitle>
              <CardDescription>What do you want to share ?</CardDescription>
            </CardHeader>

            <form onSubmit={handleWaveSubmitForm}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="custom-file-upload" className={`custom-file-upload border-2 h-12 flex items-center pl-5 text-xl font-normal  active:scale-90 transition-transform duration-300 ease-in-out cursor-pointer rounded-lg ${text === 'Uploaded' ? 'text-green-600' : 'text-black'}`}>
                      {text}
                    </label>
                    <Input
                      type="file"
                      id="custom-file-upload"
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      onChange={handleFileChange}
                      className='hidden'
                    />
                    {selectedFile && <span>Selected file: {selectedFile.name}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5 mt-6 h-[10rem] w-full">
                    <textarea className='focus:outline-none resize-none h-full border-2 rounded-lg pt-3 pl-5 text-2xl font-serif font-thin' id='description' placeholder='Write Something ...' value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" variant="outline" className='bg-sidebar text-2xl active:scale-90 transition-transform duration-300 ease-in-out text-white font-nunito'>Create Wave</Button>
              </CardFooter>
            </form>
            <CardHeader className='w-full'>
              <CardTitle>
                <div className='bg-white w-full h-20 py-0 pl-5 shadow-2xl border-2 rounded-3xl flex items-center'>
                  <FaSearch className='text-sidebar' />
                  <input
                    className='bg-transparent border-none h-full w-full text-lg font-medium ml-3 focus:outline-none'
                    placeholder='Type to search...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    {filteredEntries.map((wave) => (
                      <li key={wave.id} className="list-none">
                        <AlertDialog>
                          <div className='flex items-center bg-[rgba(0,255,0,0.137)] h-20 justify-between w-full mb-3 outline-none rounded-lg hover:bg-green-200'>
                            <AlertDialogTrigger>
                              <div className='flex items-center justify-around gap-[5px] w-[20rem]'>
                                <div className='userImage'>
                                  <img src={wave.user.profile_photo ? `http://127.0.0.1:8000/profile_photos/${wave.user.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='h-10 w-10 rounded-full border-2 cursor-pointer bg-white' />
                                </div>
                                <div className='text-lg'>
                                  <p className='username text-linkcolor'>@{wave.user.username}</p>
                                  <TextWithEllipsis text={wave.wave_message} maxWidth='150px' />
                                </div>
                              </div>
                            </AlertDialogTrigger>
                            <Button variant='outline' className={wave.wave_status === 'active' ? 'text-white mr-16 bg-green-600 rounded-3xl hover:text-green-600' : 'text-white bg-red-600 mr-16 rounded-3xl hover:text-red-600'} onClick={() => { handleStatusToggle(wave.id) }} >{wave.wave_status === 'active' ? 'Active' : 'In Active'}</Button>
                          </div>

                          <AlertDialogContent className='max-w-none w-1/2 -translate-y-[60%] -translate-x-[40%]'>
                            <AllWavesPopup
                              user={wave.user}
                              waveImage={wave.wave_name}
                              message={wave.wave_message}
                              waveId={wave.id} />
                          </AlertDialogContent>
                        </AlertDialog>
                      </li>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CreateWaves