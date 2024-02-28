import React from 'react'
// This code defines a React functional component called Loader, which renders a centered image as a loading indicator.
// this is responsible for displaying the loader
const Loader:React.FC = () => {
    return (
        <div className='flex-center w-full'>
            <img
                src="../../../public/assets/loader/Loader.gif"
                alt="Loader" />
        </div>
    )
}

export default Loader