import React from 'react'
import Input from './inputFieald'
import Button from './buttonClick'
import { useState } from 'react'

function ConfirmModal({header,model,openModel}) {
    const [password,setPassword] = useState()
  return (
    <div className='w-full z-50 min-h-full p-4 absolute top-0 left-0 backdrop-blur-sm flex place-content-center place-items-center'>
        <div className='p-5 bg-white rounded shadow  w-full sm:w-[600px] flex flex-col space-y-4'>
            <div>
            <h1 className='text-2xl font-bold text-gray-900 text-center'>{header}</h1>
            <h1 className='text-gray-500 text-sm font-bold text-center'>    
                Veuillez confirmer votre mot de passe pour continuer
            </h1>
            </div>
            <div>
                <Input placeholder={'•••••••••••'} ErrorIs={!password?0:!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)?1:0} text={'Mote de passe'} type="password" required={true} setFieald={setPassword}/>
                {password && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)?<span className="text-[10px] text-red-500">* Le mot de passe doit avoir 8 caractères avec majuscule, minuscule et chiffre.</span>:''}
            </div>
            <div className='sm:flex sm:space-x-4 space-y-4 sm:space-y-0'>
                <Button Title='Supprimer' nCLick={()=>{}} className='bg-red-600 border-red-600 hover:text-red-600' />
                <Button Title='Annuler'  nCLick={openModel} className='bg-blue-600 border-blue-600 hover:text-blue-600' />
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal