import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='absolute inset-0 w-full h-full bg-black flex justify-center items-center'>
      <span className="loader"></span>
    </div>
  )
}

export default LoadingSpinner