import React, { useContext } from 'react'
import { Link, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import SettingsMenu from '../../components/settingsMenu'
import { AuthContext } from '../../contexts/AuthContext'



function Settings() {
    const {user} = useContext(AuthContext)
    const location = useLocation()
  return (
    <>
        {
            user &&
            <div className='w-full'>
                <div className="w-full px-10 flex flex-col md:flex-row md:space-x-5">
                    <div className={`w-full md:w-1/3 bg-white md:shadow-lg rounded md:border ${location.pathname != '/settings' && 'hidden md:block '} md:border-gray-100`}>
                        <SettingsMenu user={user} />
                    </div>
                    <div className="w-full md:w-3/4 bg-white md:shadow-lg rounded md:border md:border-gray-100 flex place-content-center place-items-center">
                        {
                            location.pathname == '/settings' &&
                            <div className='w-full h-full hidden md:flex flex-col place-content-center place-items-center'>
                                <h1 className='text-2xl font-bold text-gray-500'>Paramètres</h1>
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