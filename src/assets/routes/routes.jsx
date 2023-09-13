import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import NotFound from '../../pages/NotFound'
import Navbar from '../../components/global/navbar'
import { AuthContext } from '../../contexts/AuthContext'
import Loading from '../../pages/loading'
import Dashboard from '../../pages/dashboard/dashboard'
import Settings from '../../pages/settings/settings'
import ProfileSettings from '../../pages/settings/profileSettings'
import SecuritySettings from '../../pages/settings/securitySettings'

function Routing() {
  const {user,role,token,loading} = useContext(AuthContext)
  
  return (
    <div>
        {loading?
          <Loading />
        :''}
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={token?<Navigate to={"/"} />:<Login />} />
            <Route path='/settings' element={!token?<Navigate to={"/"} />:<Settings />} >
              <Route path='profile' element={<ProfileSettings />} />
              <Route path='security' element={<SecuritySettings />} />
            </Route>
            <Route path='/register' element={token?<Navigate to={"/"} />:<Register />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Routing