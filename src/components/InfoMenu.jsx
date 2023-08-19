import React from 'react'
import { AiFillCamera } from 'react-icons/ai'

function InfoMenu({user}) {
  return (
    <div>
        <div className='w-32 h-32 mx-auto p-5 bg-gray-50 flex items-center justify-center relative  '>
           <img src={user.google ?  user.profile : process.env.REACT_APP_API_URL + user.profile} className='w-full h-full object-cover rounded-full' alt="arrow left" />
           <AiFillCamera className='absolute bottom-5 cursor-pointer right-5 text-gray-500 text-3xl bg-gray-50 p-[3px] rounded-full' />
        </div>
        <div className='w-full h-5  bg-gray-50 flex items-center justify-center'>
            <span className='text-gray-500 text-sm font-bold'>{user.firstName + ' ' + user.lastName}</span>
        </div>
        <div className='w-full h-5 mb-5 bg-gray-50 flex items-center justify-center'>
            <span className='text-gray-500 text-sm font-bold'>{user.email.toLowerCase()}</span>
        </div>
    </div>
  )
}

export default InfoMenu