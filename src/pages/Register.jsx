import React from 'react'
import Input from '../components/inputFieald'
import ButtonGoogle from '../components/buttonGoogle'
import Button from '../components/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Alert from '../components/alert'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useEffect } from 'react'

function Register() {
  
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [Cpassword,setCpassword] = useState()
  const [error,setError] = useState('')
  const [code,setCode] = useState('')
  const urlParams = new URLSearchParams(window.location.search);
  const {loginCardinalty,setloading} = useContext(AuthContext)

  useEffect(()=>{
    if(urlParams.get('code')) setCode(urlParams.get('code'))
  },[])

  const HandleLogin = async(e)=>{
    e.preventDefault();
    setloading(true)
    setError('')
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + '/login',{email,password})
      loginCardinalty(res.data.token,res.data.user)
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message)  setError(error.response.data.message)
      else setError("Verifier connexion internet")
    }
    setloading(false)
  }

  const hanlde_Change = async()=>{
      setloading(true)
      setError('')
      try {
          const res = await axios.post(process.env.REACT_APP_API_URL + '/oauth/google',{code})
          loginCardinalty(res.data.token,res.data.user)
      } catch (error) {
          if(error.response && error.response.data && error.response.data.message) setError(error.response.data.message)
          else setError("Verifier connexion internet")
      }
      setloading(false)
  }
  useEffect(()=>{
        if (code) hanlde_Change()
    },[code])
  return (
    <div className='dynamic-min-h md:flex'>
      <form className="p-6  md:w-1/2 space-y-4 flex flex-col place-content-center md:pt-0 pt-20" onSubmit={HandleLogin}>
          <ButtonGoogle setCode={setCode}/>
        <div className='text-center ort relative'>
          Ou
        </div>
        <Input placeholder={'Email'} type="email" setFieald={setEmail}/>
        <Input placeholder={'Mote de passe'} type="password" setFieald={setPassword}/>
        <Input placeholder={'Confirme Mote de passe'} type="password" setFieald={setCpassword}/>
        <Link to={"/rest-password"} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >
          Mote de passe oublié ?
        </Link>
        {error && <Alert error={error} setError={setError} />}
        <Button OnCLick={HandleLogin} />
      </form>
      <div className="img hidden md:w-1/2  md:flex flex-col place-items-center place-content-center">
        <img src={require('../assets/media/cr1.png')} className='w-2/3' />
      </div>
    </div>
  )
}

export default Register