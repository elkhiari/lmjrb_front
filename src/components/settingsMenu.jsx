import React from 'react'
import { Link } from 'react-router-dom'
import MenuLinks from './MenuLinks'
import InfoMenu from './InfoMenu'


function SettingsMenu({user}) {
    
  return (
    <>
        <div className='w-full h-10 bg-gray-100 flex items-center justify-center'>
            <span className='text-gray-500 text-sm font-bold'>Paramètres</span>
        </div>
        <InfoMenu user={user} />
        <MenuLinks name='Profil' link='profile' />
        <MenuLinks name='Compte' link='account' />
        <MenuLinks name='Sécurité' link='security' />
        <MenuLinks name='Notifications' link='notifications' />
        <MenuLinks name='Devenir médecin' link='become-doctor' />
        <MenuLinks name='Intégrations' link='integrations' />
        <MenuLinks name='API' link='api' />
    </>
  )
}

export default SettingsMenu