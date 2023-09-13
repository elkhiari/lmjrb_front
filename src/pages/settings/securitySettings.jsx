import React, { useContext, useState } from 'react'
import BackButton from '../../components/settings/backButton'
import Button from '../../components/global/button'
import Input from '../../components/global/inputFieald'
import axios from 'axios'
import LoadingAnim from '../../components/global/loading'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import Alert from '../../components/global/alert'


function SecuritySettings() {
    const {token,tokenIsValid,user} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState()
    const [password, setPassword] = useState()
    const [Cpassword, setCpassword] = useState()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        if(!password || !Cpassword){
            setError('Veuillez remplir les champs obligatoires')
            return
        }
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)){
            return
        }
        if(password !== Cpassword){
            return
        }
        if(user.password && password === oldPassword) {
            setError("Désolé, vous ne pouvez pas réutiliser l'ancien mot de passe comme nouveau mot de passe. Veuillez en choisir un autre")
        }
        setError('')
        setLoading(true)
        try {
            const data  = {password:oldPassword | null,newPassword:password}
            const res = await axios.put(process.env.REACT_APP_API_URL + 'change_password',data,{headers: {Authorization: `Bearer ${token}`,},})
            tokenIsValid();
            console.log(res.data)
            navigate('/settings');
        } catch (error) {
            setError(error.response.data.message)
        } 
        setLoading(false)
    }
  return (
    <div className='flex flex-col w-full min-h-[100%]  p-2 mx-auto max-w-5xl place-content-center place-items-center'>
        {!loading ?<>
        <BackButton titleH='Paramètres de sécurité' />
        <form onSubmit={handleSubmit} className='flex flex-col place-content-center w-full space-y-3 '>
            {user.password && <div>
                <Input placeholder={'•••••••••••'} ErrorIs={!oldPassword?0:!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(oldPassword)?1:0} text={'Ancien mot de passe'} type="password" required={true} setFieald={setOldPassword}/>
                {oldPassword && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(oldPassword)?<span className="text-[10px] text-red-500">* Le mot de passe doit avoir 8 caractères avec majuscule, minuscule et chiffre.</span>:''}
            </div>}
            <div>
                <Input placeholder={'•••••••••••'} ErrorIs={!password?0:!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)?1:0} text={'Mote de passe'} type="password" required={true} setFieald={setPassword}/>
                {password && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)?<span className="text-[10px] text-red-500">* Le mot de passe doit avoir 8 caractères avec majuscule, minuscule et chiffre.</span>:''}
            </div>
            <div>
                <Input placeholder={'•••••••••••'} ErrorIs={!Cpassword?0:password !== Cpassword?1:0} text={'Confirmer mot de passe'} type="password" required={true} setFieald={setCpassword}/>
                {Cpassword && password !== Cpassword?<span className="text-[10px] text-red-500">* Les mots de passe ne correspondent pas</span>:''}
            </div>
            
            <div className='flex flex-col space-y-2'>
                {error &&  <Alert error={error} setError={setError} /> }
                <Button Title='Enregistrer' type='submit' />
            </div>
        </form>
        </>:<>
            <LoadingAnim />
        </>}
    </div>
  )
}

export default SecuritySettings