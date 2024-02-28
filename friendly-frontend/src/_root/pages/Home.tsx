import AllWaves from '@/components/shared/AllWaves'
import RequestedFriends from '@/components/shared/RequestedFriends'
import React from 'react'

// This code defines a React functional component called Home, which renders a layout with two sections: "Stored Waves" and "Friends". Each section has specific styling and contains child components like AllWaves and RequestedFriends.
const Home: React.FC = () => {
  return (
    <>
      <div className='h-full flex flex-col justify-evenly w-[80%] my-0 mx-auto'>
        <div className='h-[400px] flex flex-wrap w-full border-2 bg-white my-0 mx-auto max-w-[1370px] rounded-[50px] '>
          {/* Stored Waves */}
          <div className='pl-[70px] py-5 text-[30px] w-full shadow-2xl rounded-[50px]'>
            Making Waves
          </div>
          <div className='flex flex-wrap justify-start w-full h-[80%] my-0 ml-[50px] overflow-y-scroll'>
            <AllWaves />
          </div>
        </div>

        <div className='h-[300px] flex flex-wrap w-full border-2 bg-white max-w-[1370px] rounded-[50px] my-[20px] mx-0'>
          <span className='pl-[70px] py-5 text-[30px] w-full shadow-2xl rounded-[50px]'>
            Friends
          </span>
          <div className='flex flex-wrap items-start w-full justify-between my-0 mx-auto h-[200px] overflow-y-scroll pt-8 pl-8'>
            <RequestedFriends />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
