import React , { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/global/inputFieald'
import axios from 'axios'
import LoadingAnim from '../../components/global/loading'
import Alert from '../../components/global/alert'
import { AuthContext } from '../../contexts/AuthContext'
import Button from '../../components/global/button'
import BackButton from '../../components/settings/backButton'

function ProfileSettings() {
    const {token,tokenIsValid} = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
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
        setLoading(true)
        try {
            const data  = {lastName:nom,firstName:prenom,phonenumber:telephone}
            const res = await axios.put(process.env.REACT_APP_API_URL + '/me',data,{headers: {Authorization: `Bearer ${token}`,},})
            tokenIsValid();
            navigate('/settings');
        } catch (error) {
            setError(error.response.data.message)
        }
        setLoading(false)
    }




  return (
    <div className='flex flex-col w-full min-h-[100%]  p-2 mx-auto max-w-5xl place-content-center place-items-center'>
        {!loading ?<>
        <BackButton titleH='Paramètres de profil' />
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
            {telephone && !/^(\+212[5-8])\d{8}$/.test(telephone)?<span className="text-[10px] text-red-500">* Le numéro de téléphone doit commencer par +212 et avoir au moins 9 chiffres.</span>:''}
        </div>
        <div className='flex flex-col space-y-2'>
            {error && <Alert error={error} setError={setError} />}
            <Button Title='Enregistrer' type='submit' />
        </div>
        </form>
        </>:<>
            <LoadingAnim />
        </>}
    </div>
  )
}

export default ProfileSettings