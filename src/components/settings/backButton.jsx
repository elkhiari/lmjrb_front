import React from 'react'
import { IoArrowBackCircle } from 'react-icons/io5'
import { Link } from 'react-router-dom'
function BackButton({titleH}) {
  return (
    <Link to='/settings' className='w-full h-10 text-[#20B37C]  py-2 mb-5'>
            <IoArrowBackCircle className='text-2xl inline-block' />
            <span className=' text-sm font-bold ml-4'>{titleH}</span>
    </Link>
  )
}

export default BackButton