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
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    nom: "",
    prenom: "",
    password: "",
    Cpassword: "",
  });

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
    setFieldErrors({
      email: "",
      nom: "",
      prenom: "",
      password: "",
      Cpassword: "",
    });
    setError('')
    if (!email || !password || !Cpassword || !nom || !prenom) return setFieldErrors({ email: "Veuillez remplir tous les champs", nom: "Veuillez remplir tous les champs", prenom: "Veuillez remplir tous les champs", password: "Veuillez remplir tous les champs", Cpassword: "Veuillez remplir tous les champs" })
    if(!/^[a-zA-Z]{3,}/.test(nom)) setFieldErrors({ nom: "Veuillez entrer un nom valide contenant au moins trois lettres alphabétiques"});
    if(!/^[a-zA-Z]{3,}/.test(prenom)) setFieldErrors((prevField)=>({...prevField,prenom: "Veuillez entrer un prenom valide contenant au moins trois lettres alphabétiques"}))
    if(!/\S+@\S+\.\S+/.test(email)) setFieldErrors((prevField)=>({...prevField,email: "Veuillez entrer un email valide"}))
    if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) setFieldErrors((prevField)=>({...prevField,password: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre"}))
    if (password != Cpassword) setFieldErrors((prevField)=>({...prevField,Cpassword:"Les mots de passe ne correspondent pas"}))
    if (fieldErrors.email || fieldErrors.nom || fieldErrors.prenom || fieldErrors.password || fieldErrors.Cpassword) return
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
      if(error.response && error.response.data && error.response.data.email)
        return setFieldErrors({
          nom: "",
          prenom: "",
          password: "",
          Cpassword: "",
          email: error.response.data.message
        })
      else if (error.response && error.response.data && error.response.data.message)  setError(error.response.data.message)
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
        <h1 className='text-2xl font-black md:text-3xl text-center'>S'nscription à <span className='text-[#20B37C]'>Lmjrb</span></h1>  
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
            <Input placeholder={'Othmane'} ErrorIs={fieldErrors.nom} text={'Nom'} type="text" setFieald={setNom}/>
            {fieldErrors.nom && <span className="text-[10px] text-red-500">* {fieldErrors.nom}</span>}
          </div>
          <div>
            <Input placeholder={'Elkhiari'} ErrorIs={fieldErrors.prenom} text={'Prenom'} type="text" setFieald={setPrenom}/>
            {fieldErrors.prenom && <span className="text-[10px] text-red-500">* {fieldErrors.prenom}</span>}
          </div>
        </div>

        <div>
          <Input placeholder={'Othmane@domain.com'} ErrorIs={fieldErrors.email} text={'Email'} type="email" setFieald={setEmail}/>
          {fieldErrors.email && <span className="text-[10px] text-red-500">* {fieldErrors.email}</span>}
        </div>
        <div>
        <Input placeholder={'•••••••••••'} ErrorIs={fieldErrors.password} text={'Mote de passe'} type="password" setFieald={setPassword}/>
          {fieldErrors.password && <span className="text-[10px] text-red-500">* {fieldErrors.password}</span>}
        </div>
        <div>
        <Input placeholder={'•••••••••••'} ErrorIs={fieldErrors.Cpassword} text={'Confirmer mot de passe'} type="password" setFieald={setCpassword}/>
        {fieldErrors.Cpassword && <span className="text-[10px] text-red-500">* {fieldErrors.Cpassword}</span>}
        </div>
        <Link to={"/login"} className='font-medium text-blue-600 dark:text-blue-500 hover:underline' >
          Vous avez déjà un compte ?
        </Link>
        {error && <Alert error={error} setError={setError} />}
        <Button OnCLick={HandleRegister} Title={"Inscrivez-vous"} />
      </form>
      {/* <div className="img hidden md:w-1/2  md:flex flex-col place-items-center place-content-center">
        <img src={require('../assets/media/cr0.png')} className='w-2/3' />
      </div> */}
    </div>
  )
}

export default Register