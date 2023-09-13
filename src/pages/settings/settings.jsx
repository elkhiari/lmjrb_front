import React, { useContext } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import SettingsMenu from '../../components/settings/settingsMenu'
import { AuthContext } from '../../contexts/AuthContext'



function Settings() {
    const {user} = useContext(AuthContext)
    const location = useLocation()
  return (
    <>
        {
            user &&
            <div className='w-full'>
                <div className="w-full px-3 md:px-10 flex flex-col md:flex-row md:space-x-5 relative">
                    <div className='absolute duration-300   top-0 left-16 w-44 h-full md:bg-[#20B37C]/40  rounded-b-3xl md:rounded-none -z-10'></div>
                    <div className={`w-full md:w-1/3  rounded   ${location.pathname != '/settings' && 'hidden md:block'} bg-gradient-to-br from-white/60 from-[11.97%] to-white/30 to-[63.37%]  text-gray-900 backdrop-blur-3xl  `}>
                        <SettingsMenu user={user} />
                    </div>
                    <div className="w-full md:w-3/4 bg-white  rounded   flex place-content-center place-items-center">
                        {
                            location.pathname == '/settings' &&
                            <div className='w-full h-full hidden md:flex flex-col place-content-center place-items-center'>
                                <h1 className='text-2xl font-bold text-[#20B37C]'>Paramètres</h1>
                                <span className='text-gray-500 text-sm font-bold'>Sélectionnez un paramètre pour commencer</span>
                            </div>
                        }
                        <Outlet />
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default Settings