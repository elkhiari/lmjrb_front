import React from 'react'
import Search from '../components/home/search'
import { useEffect } from 'react'
import Footer from '../components/global/footer'

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
      <Footer />
    </div>
  )
}

export default Home