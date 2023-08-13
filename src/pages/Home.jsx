import React from 'react'
import Search from '../components/search'
import { useEffect } from 'react'

function Home() {
  useEffect(()=>{
    document.title = 'Acceuil | Lmjrb'
  },[])
  return (
    <div>
      <Search />
      <div className='w-full h-[300px] '>
        dcdc
      </div>
    </div>
  )
}

export default Home