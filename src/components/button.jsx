import React from 'react'
import { IoLogIn } from 'react-icons/io5'
import {AiOutlineUserAdd} from 'react-icons/ai'

function Button({OnCLick,Title}) {
  return (
    <button onSubmit={OnCLick} type="submit" className="bg-[#20B37C] hover:bg-white shadow-[#20B37C] group  border-[#20B37C] relative p-4 w-full hover:shadow-xl border-2  text-sm rounded text-white hover:text-[#20B37C] font-bold duration-300  outline-none flex place-content-center place-items-center">
            {/* {Title == "Connectez-vous" ?<IoLogIn className='text-2xl mr-2 text-[#20B37C]' />:<AiOutlineUserAdd className='text-2xl mr-2 text-[#20B37C]' />} */}
            {Title}
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="absolute right-8 group-hover:right-5  duration-300  " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
    </button>
  )
}

export default Button