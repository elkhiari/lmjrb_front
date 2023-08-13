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
  const [file, setFile] = useState(null)
  const [nom,setNom] = useState()
  const [prenom,setPrenom] = useState()
  const [error,setError] = useState('')
  const [code,setCode] = useState('')
  const [avatar, setAvatar] = useState("https://raw.githubusercontent.com/elkhiari/feeds_app_front/main/src/user.png")
  const urlParams = new URLSearchParams(window.location.search);
  const {loginCardinalty,setloading} = useContext(AuthContext)
  const [isError, setIsError] = useState(false);

 

  useEffect(() => {
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      }
      reader.readAsDataURL(file);
    }

  }, [file])

  useEffect(()=>{
    if(urlParams.get('code')) setCode(urlParams.get('code'))
    document.title = "S'inscrire | Lmjrb"
  },[])

  const HandleRegister = async(e)=>{
    e.preventDefault();
    setError('')
    setIsError(false)
    if (!password || !Cpassword || !email || !nom || !prenom) return setError("Veuillez remplir tous les champs")
    if (!/^[a-zA-Z]{3,}/.test(nom)) return setIsError(true)
    if (!/^[a-zA-Z]{3,}/.test(prenom)) return setIsError(true)
    if (!/\S+@\S+\.\S+/.test(email)) return setIsError(true)
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) return setIsError(true)
    if (password !== Cpassword) return setIsError(true)
    setloading(true) 
    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("firstName", prenom);
      formdata.append("lastName", nom);
      formdata.append("profile", file);
      const res = await axios.post(process.env.REACT_APP_API_URL+"/register", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          },
      });
      loginCardinalty(res.data.token,res.data.user)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.message)  setError(error.response.data.message)
      else setError("Verifier connexion internet")
    }
    setloading(false)
  }

  const hanlde_Change = async()=>{
      setloading(true)
      setError('')
      try {
          const res = await axios.post(process.env.REACT_APP_API_URL + '/oauth/google/register',{code})
          loginCardinalty(res.data.token,res.data.user)
      } catch (error) {
          if(error.response && error.response.data && error.response.data.message) setError([{error : error.response.data.message}])
          else setError([{error:"Verifier connexion internet"}])
      }
      setloading(false)
  }
  useEffect(()=>{
        if (code) hanlde_Change()
    },[code])
  return (
    <div className=''>
      <form className=" mx-auto mt-8 mb-8 md:mb-4 md:mt-4   space-y-4 container  bg-white backdrop-blur-sm flex flex-col place-content-center w-full max-w-2xl rounded-xl p-6 sm:shadow-[0_40px_80px_rgba(255,59,48,0.1)] md:p-12" onSubmit={HandleRegister}>
        <h1 className='text-2xl font-black md:text-3xl text-center'>S'inscription à <span className='text-[#20B37C]'>Lmjrb</span></h1>  
        <ButtonGoogle setCode={setCode} usingFor={"register"} Title={"Inscrivez-vous"}/>
        <div className='text-center ort relative'>
          Ou
        </div>
        <div className='mb-4 w-full flex place-content-center'>
          <label htmlFor="file" className=''>
            <img src={avatar} className='w-20 mx-auto object-cover h-20 shadow hover:shadow-lg mb-2 p-[1px] hover:scale-105 duration-150 ease-in-out cursor-pointer rounded-full' alt='' />
            <p className='text-center text-sm text-gray-500'>Choisissez votre profil</p>
          </label>
          <input type='file'  name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} className='hidden'/>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4'>
          <div>
            <Input placeholder={'Othmane'} ErrorIs={!nom?0:!/^[a-zA-Z]{3,}/.test(nom)?1:0} text={'Nom'} type="text" setFieald={setNom}/>
            {nom && !/^[a-zA-Z]{3,}/.test(nom)?<span className="text-[10px] text-red-500">* Nom doit avoir au moins 3 lettres.</span>:''}
          </div>
          <div>
            <Input placeholder={'Elkhiari'} ErrorIs={!prenom?0:!/^[a-zA-Z]{3,}/.test(prenom)?1:0} text={'Prenom'} type="text" setFieald={setPrenom}/>
            {prenom && !/^[a-zA-Z]{3,}/.test(prenom)?<span className="text-[10px] text-red-500">* Prénom doit avoir au moins 3 lettres.</span>:''}
          </div>
        </div>
        <div>
          <Input placeholder={'Othmane@domain.com'} ErrorIs={!email?0:!/\S+@\S+\.\S+/.test(email)?1:0} text={'Email'} type="email" setFieald={setEmail}/>
          {email && !/\S+@\S+\.\S+/.test(email)?<span className="text-[10px] text-red-500">* Veuillez entrer un email valide</span>:''}
        </div>
        <div>
          <Input placeholder={'•••••••••••'} ErrorIs={!password?0:!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)?1:0} text={'Mote de passe'} type="password" setFieald={setPassword}/>
          {password && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)?<span className="text-[10px] text-red-500">* Le mot de passe doit avoir 8 caractères avec majuscule, minuscule et chiffre.</span>:''}
        </div>
        <div>
        <Input placeholder={'••••••••••'} ErrorIs={!Cpassword?0:password !== Cpassword?1:0} text={'Confirmer mot de passe'} type="password" setFieald={setCpassword}/>
        {Cpassword && password !== Cpassword?<span className="text-[10px] text-red-500">* Les mots de passe ne correspondent pas</span>:''}
        </div>
        {error && <Alert error={error} setError={setError} />}
        <Button OnCLick={HandleRegister} Title={"Inscrivez-vous"} />
      </form>
    </div>
  )
}

export default Register