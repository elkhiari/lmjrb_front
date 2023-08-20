import React , { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IoArrowBackCircle } from 'react-icons/io5'
import Input from '../../components/inputFieald'
import axios from 'axios'

import { AuthContext } from '../../contexts/AuthContext'
import Button from '../../components/button'

function ProfileSettings() {
    const {token,tokenIsValid} = useContext(AuthContext)
    const {user} = useContext(AuthContext)
    const [nom, setNom] = useState(user.lastName)
    const [prenom, setPrenom] = useState(user.firstName)
    const [telephone, setTelephone] = useState(user.phonenumber)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!nom || !prenom){
            setError('Veuillez remplir les champs obligatoires')
            return
        }
        if(!/^[a-zA-Z]{3,}/.test(nom)){
            return
        }
        if(!/^[a-zA-Z]{3,}/.test(prenom)){
            return
        }
        if(telephone && !/^(\+212[5-8])\d{8}$/.test(telephone)){
            return
        }
        
        setError('')
        try {
            const data  = {lastName:nom,firstName:prenom,phonenumber:telephone}
            const res = await axios.put(process.env.REACT_APP_API_URL + '/me',data,{headers: {Authorization: `Bearer ${token}`,},})
            tokenIsValid();
            navigate('/settings');
        } catch (error) {
            alert("error")
        }
    }




  return (
    <div className='flex flex-col w-full min-h-[100%]  p-2 mx-auto max-w-5xl'>
        <Link to='/settings' className='w-full h-10 text-[#20B37C]  py-2'>
            <IoArrowBackCircle className='text-2xl inline-block' />
            <span className=' text-sm font-bold ml-4'>Profil</span>
        </Link>

        <form onSubmit={handleSubmit} className='flex flex-col place-content-center w-full space-y-3 '>
        <div className='grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 space-y-4'>
          <div>
            <Input DefultValue={user.firstName} placeholder={'Othmane'} ErrorIs={!nom?0:!/^[a-zA-Z]{3,}/.test(nom)?1:0} text={'Nom'} type="text" setFieald={setNom}/>
            {nom && !/^[a-zA-Z]{3,}/.test(nom)?<span className="text-[10px] text-red-500">* Nom doit avoir au moins 3 lettres.</span>:''}
          </div>
          <div>
            <Input placeholder={'Elkhiari'} DefultValue={user.lastName}  ErrorIs={!prenom?0:!/^[a-zA-Z]{3,}/.test(prenom)?1:0} text={'Prenom'} type="text" setFieald={setPrenom}/>
            {prenom && !/^[a-zA-Z]{3,}/.test(prenom)?<span className="text-[10px] text-red-500">* Prénom doit avoir au moins 3 lettres.</span>:''}
          </div>
        </div>
        <div>
            <Input placeholder={'+212684149860'} DefultValue={user?.phonenumber}   ErrorIs={!telephone?0:!/^(\+212[5-8])\d{8}$/.test(telephone)?1:0} text={'Telephone'} type="text" setFieald={setTelephone}/>
            {telephone && !/^(\+212[5-8])\d{8}$/.test(telephone)?<span className="text-[10px] text-red-500">* Le numéro de téléphone doit commencer par +212 et avoir au moins 8 chiffres.</span>:''}
        </div>
        <div className='flex flex-col space-y-2'>
            <Button Title='Enregistrer' type='submit' />
        </div>
        </form>
    </div>
  )
}

export default ProfileSettings