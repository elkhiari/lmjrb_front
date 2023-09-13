import React from 'react'

function Footer() {
  return (
        <section class="flex w-full flex-col items-center gap-16 bg-[#1C1C1E] pt-16 text-white md:pt-[88px]">
            <div class="flex w-[90%] max-w-[1300px] flex-col gap-12 md:gap-16 lg:flex-row">
                <div class="flex flex-1 flex-col gap-6">
                    <figure>
                        <img src={require('../../assets/media/logo512.png')} className='w-24' alt="logo" />
                </figure>
                <p class="text-lg leading-[30px]">12, Agdal à Rabat, Maroc</p>
                </div>
                <div class="flex flex-wrap gap-16 sm:flex-row">
                    <div class="flex flex-col gap-6">
                        <span class="text-2xl font-bold">À propos</span>
                        <a href="/"><span class="text-sm font-normal md:text-lg">Acceuil</span></a>
                        <a href="/contact"><span class="text-sm font-normal md:text-lg">Contactez-nous</span></a>
                    </div> 
                </div>
            </div>            
        </section>
  )
}

export default Footer