import React from 'react'

// Defines the User interface
interface User {
  first_name: string;
  last_name: string;
  profile_photo: string;
}

// Defines the props interface
interface CreateWavePanelProps {
  user: User;
}

// Define the CreateWavePanel component
// this function is responsible for displaying the create wave panel
const CreateWavePanel:React.FC<CreateWavePanelProps> = (props) => {
  return (
    <div className='CreateWavePanel'>
      <div className='border-2 h-40 bg-linkcolor w-full text-center mb-20 rounded-xl'>
        <span className='text-9xl opacity-5'>Create Waves</span>
        <div className='flex justify-start items-center mb-28 w-full relative bottom-14'>
        <img src={props.user.profile_photo ? `http://127.0.0.1:8000/profile_photos/${props.user.profile_photo}` : '../../public/assets/icons/Layer_1.png'} alt='profile' className='ml-10 h-36 mb-12 w-36 rounded-[50%] bg-white' />
          <span className='text-3xl ml-10 mb-28 text-white'>{props.user.first_name} {props.user.last_name}</span>
        </div>
      </div>
    </div>
  )
}

export default CreateWavePanel