import React from 'react'
import Input from '../components/global/inputFieald'
import ButtonGoogle from '../components/auth/buttonGoogle'
import Button from '../components/global/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Alert from '../components/global/alert'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useEffect } from 'react'

function Login() {
  
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [error,setError] = useState('')
  const [code,setCode] = useState('')
  const urlParams = new URLSearchParams(window.location.search);
  const {loginCardinalty,setloading} = useContext(AuthContext)

  useEffect(()=>{
    if(urlParams.get('code')) setCode(urlParams.get('code'))
    document.title = "Se connecter | Lmjrb"
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
    <div className='w-full'>
      <div className='relative'>
      <form className=" mx-auto mt-8 mb-8 md:mb-4 md:mt-4  shadow-green  space-y-4 container  bg-white backdrop-blur-sm flex flex-col place-content-center w-full max-w-lg rounded-xl p-6 sm:shadow-[0_40px_80px_rgba(255,59,48,0.1)] md:p-12" onSubmit={HandleLogin}>
        <h1 className='text-2xl font-black md:text-3xl text-center'>Se connecter à <span className='text-[#20B37C]'>Lmjrb</span></h1>
        <ButtonGoogle setCode={setCode} usingFor={"login"} Title={"Connectez-vous"}/>
        <div className='text-center ort relative font-bold '>
          Ou
        </div>
        <Input placeholder={'Othmane@domain.com'} text={'Email'} type="email" required={true} setFieald={setEmail}/>
        <Input placeholder={'•••••••••••'} text={'Mote de passe'} type="password" required={true} setFieald={setPassword}/>
          <Link to={"/rest-password"} className='font-medium text-blue-600 bg-red' >
            Mote de passe oublié ?
          </Link> 
        {error && <Alert error={error} setError={setError} />}
        <Button OnCLick={HandleLogin} Title={"Connectez-vous"}/>
      </form>
      </div>
    </div>
  )
}

export default Login