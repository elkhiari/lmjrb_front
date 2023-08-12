import React, { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import NotFound from '../../pages/NotFound'
import Navbar from '../../components/navbar'
import { AuthContext } from '../../contexts/AuthContext'
import Loading from '../../pages/loading'
import { useState } from 'react'
import { useEffect } from 'react'

function Routing() {
  const {user,role,token,loading} = useContext(AuthContext)
  const location = useLocation()
  const [title,setTitle] = useState(location.pathname)

  useEffect(()=>{
    setTitle(location.pathname)
  },[location])

  useEffect(()=>{
    document.title = title.charAt(0) == '/' ? title.charAt(1).toUpperCase() + title.slice(2) + " | " + "Lmjrb" : title + " | " + "Lmjrb"
  },[user,role])
  
  return (
    <div>
        {loading?
          <Loading />
        :''}
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={token?<Navigate to={"/"} />:<Login />} />
            <Route path='/register' element={token?<Navigate to={"/"} />:<Register />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Routing