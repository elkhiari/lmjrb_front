import React from 'react'
import { IoLogIn } from 'react-icons/io5'
import {AiOutlineUserAdd} from 'react-icons/ai'

function Button({OnCLick,Title}) {
  return (
    <button onSubmit={OnCLick} type="submit" className="block p-4 w-full focus:shadow-xl shadow text-sm focus:scale-105 text-gray-900 duration-300  outline-none flex place-content-center place-items-center">
            {Title == "Connectez-vous" ?<IoLogIn className='text-2xl mr-2' />:<AiOutlineUserAdd className='text-2xl mr-2' />}
            {Title}
    </button>
  )
}

export default Button