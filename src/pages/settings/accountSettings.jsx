import React, { useContext, useState } from 'react'
import BackButton from '../../components/settings/backButton'
import Button from '../../components/global/buttonClick'
import Input from '../../components/global/inputFieald'
import axios from 'axios'
import LoadingAnim from '../../components/global/loading'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Alert from '../../components/global/alert'
import ConfirmModal from '../../components/global/confirmModal'


function AccountSettings() {
    const {token,tokenIsValid,user,logout} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState()
    const [error, setError] = useState('')
    const [model, setModel] = useState(false)
    const navigate = useNavigate()

    const openModel = () => {
        setModel(!model)
        console.log(model)
    }

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(!password){
            setError('Veuillez remplir les champs obligatoires')
            return
        }
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)){
            return
        }
        if(!user.password) {
            setError("Désolé, mais votre compte est actuellement lié à Google. Veuillez d'abord ajouter un mot de passe à votre compte avant d'utiliser cette action.")
            return
        }
        setError('')
        setLoading(true)
        try {
            const data  = {password}
            const res = await axios.delete(process.env.REACT_APP_API_URL + '/me',data,{headers: {Authorization: `Bearer ${token}`,},})
            logout();
            navigate('/');
        } catch (error) {
            setError(error.response.data.message)
        } 
        setLoading(false)
    }
  return (
    <div className='flex flex-col w-full min-h-[100%]  p-2 mx-auto max-w-5xl place-content-center place-items-center'>
        {!loading ?<>
        <BackButton titleH='Paramètres de compte' />
        <form className='w-full min-h-full'>
            {model && <ConfirmModal header="Supprimer votre compte"  openModel={openModel}/>}
            <Button Title='Supprimer mon compte' nCLick={openModel} className='bg-red-600 border-red-600 hover:text-red-600' />
        </form>
        </>:<>
            <LoadingAnim />
        </>
        }
    </div>
  )
}

export default AccountSettings