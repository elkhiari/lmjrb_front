import React from 'react'

function Input({placeholder,type,setFieald}) {
  return (
    <>
        <input type={type} onChange={(e)=>setFieald(e.target.value)}  autoComplete={placeholder == 'password'?"current-password":""} className="block p-4 w-full focus:shadow-xl hover:shadow-xl shadow text-sm focus:scale-105 hover:scale-105 text-gray-900 duration-300  outline-none" placeholder={placeholder} required />
    </>
  )
}

export default Input