import React from 'react'

function Input({placeholder,type,setFieald}) {
  return (
    <>
        <input type={type} onChange={(e)=>setFieald(e.target.value)}  autoComplete={placeholder == 'password'?"current-password":""} className="block p-4 w-full  text-sm text-gray-900   border-2  focus:ring-[#4285F4] focus:border-[#4285F4] dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#4285F4] outline-none" placeholder={placeholder} required />
    </>
  )
}

export default Input