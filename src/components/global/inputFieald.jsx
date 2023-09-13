import React from 'react'

function Input({placeholder,type,setFieald,text,ErrorIs,DefultValue,required}) {
  return (
    <div>
        <label htmlFor={text} className='font-bold'>{text}</label>
        <input id={text} defaultValue={DefultValue} type={type} onChange={(e)=>setFieald(e.target.value)}  autoComplete={placeholder == 'password'?"current-password":""} className={`block p-4 w-full focus:shadow-xl border ${ErrorIs?"border-red-500 text-red-500":"border-gray-200"} rounded hover:shadow-xl  text-sm  text-gray-900 duration-300  outline-none`} placeholder={placeholder} required={required} />
    </div>
  )
}

export default Input