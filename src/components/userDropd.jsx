import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function UserDropd({user,logout}) {
    const [isDroped,setIsDroped] = useState(false)

    // useEffect(()=>{
    //     document.addEventListener("click",()=>{
    //         setIsDroped(false)
    //     })
    // },[])
  return (
    <div className='relative'>          
        <button onClick={()=>setIsDroped(!isDroped)} className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full object-cover" src={process.env.REACT_APP_API_URL + user.profile} alt="user photo" />
        </button>


        <div className={`z-10 bg-white ${isDroped ?'absolute':'hidden'} left-1/2 mt-2 -translate-x-[50%] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.firstName + ' ' + user.lastName}</div>
            <div className="font-medium truncate">{user.email.toLowerCase()}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >
            <li>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
            </li>
            <li>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
            </li>
            
            </ul>
            <div className="py-2">
            <button onClick={logout} to="#" className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
            </div>
        </div>
    </div>
  )
}

export default UserDropd