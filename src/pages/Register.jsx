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
  },[])

  const HandleRegister = async(e)=>{
    e.preventDefault();
    if (!email || !password || !Cpassword || !nom || !prenom) return setError("Tous les champs sont obligatoires.")
    if(!/^[a-zA-Z]{3,}/.test(nom)) return setError("Veuillez entrer un nom valide contenant au moins trois lettres alphabétiques");
    if(!/^[a-zA-Z]{3,}/.test(prenom)) return setError("Veuillez entrer un prénom valide contenant au moins trois lettres alphabétiques");
    if(!/\S+@\S+\.\S+/.test(email)) return setError("Veuillez entrer une adresse e-mail valide.");
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) return setError("Le mot de passe doit contenir au moins un chiffre, une lettre minuscule, une lettre majuscule et avoir au moins 8 caractères.");
    if (password != Cpassword) return setError("Les mots de passe ne correspondent pas.")
    setloading(true)
    setError('')
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
      if(error.response && error.response.data && error.response.data.message)  setError(error.response.data.message)
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
      <form className="p-6  md:w-1/2 space-y-4 flex flex-col place-content-center md:pt-0 pt-20" onSubmit={HandleRegister}>
          <ButtonGoogle setCode={setCode} usingFor={"register"} Title={"inscrivez-vous"}/>
        <div className='text-center ort relative'>
          Ou
        </div>
        <div className='mb-4 w-full flex place-content-center'>
          <label htmlFor="file" className=''>
            <img src={avatar} className='w-20 mx-auto object-cover h-20 shadow hover:shadow-lg mb-2 p-[1px] hover:scale-105 duration-150 ease-in-out cursor-pointer rounded' alt='' />
            <p className='text-center text-sm text-gray-500'>Choose your photo</p>
          </label>
          <input type='file'  name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} className='hidden'/>
        </div>
        <div className='grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4'>
          <Input placeholder={'Nom'} type="text" setFieald={setNom}/>
          <Input placeholder={'Prenom'} type="text" setFieald={setPrenom}/>
        </div>

        <Input placeholder={'Email'} type="email" setFieald={setEmail}/>
        <Input placeholder={'Mote de passe'} type="password" setFieald={setPassword}/>
        <Input placeholder={'confirmer mot de passe'} type="password" setFieald={setCpassword}/>
        <Link to={"/login"} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >
          Vous avez déjà un compte ?
        </Link>
        {error && <Alert error={error} setError={setError} />}
        <Button OnCLick={HandleRegister} Title={"inscrivez-vous"} />
      </form>
      <div className="img hidden md:w-1/2  md:flex flex-col place-items-center place-content-center">
        <img src={require('../assets/media/cr1.png')} className='w-2/3' />
      </div>
    </div>
  )
}

export default Register