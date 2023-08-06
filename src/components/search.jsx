import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';




function Search() {
  const [locationData, setLocationData] = useState(null);
  const [vileData, setVileData] = useState();
  const [ville, setVille] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [specialityData, setSpecialityData] = useState();
  const [whofocus, setWhofocus] = useState();
  const {loading} = useContext(AuthContext)
  
  const qoutes = [ 
    "Mieux se sentir dans sa recherche de soins de santé : Trouvez le médecin idéal dès aujourd'hui !"
    ,"Le pouvoir de votre parcours de santé : Découvrez le médecin parfait en toute confiance."
    ,"Recherche de soins simplifiée : Reliez-vous à des professionnels de la santé experts."
    ,"Votre santé, votre choix : Découvrez les meilleurs médecins en toute assurance."
    ,"Où commence le bien-être : Explorez des prestataires de soins de santé de confiance."
    ,"Faciliter vos choix de santé : Votre recherche de médecin personnalisée."
    ,"Une expérience de santé améliorée : La garantie de soins de qualité."
    ,"Recherche de médecin réinventée : Confiance, confort et commodité en un seul endroit."
    ,"Votre bien-être, notre priorité : Reliez-vous à des médecins bienveillants."
    ,"Une touche de guérison vous attend : Trouvez le médecin idéal pour transformer votre santé."
  ]
  const [number,setNumber] = useState(Math.floor(Math.random() * qoutes.length))

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/local')
      .then((response) => {
        setLocationData(response.data);
        setVille(response.data.city)
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/speciality')
      .then((response) => {
        setSpecialityData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/ville')
      .then((response) => {
        setVileData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }, []);

  const randomquote = qoutes[number]
  const firstthreewords = randomquote.split(' ').slice(0,3).join(' ')
  const restofwords = randomquote.split(' ').slice(3).join(' ')


  return (
    <div className='w-full   flex flex-col justify-center items-center py-5 '>
    <div className='absolute top-0 left-0 w-full bg-cover  min-h-full  -z-50 backdrop-blur-sm brightness-90 bg-gradient-to-t from-white/200 '  style={{backgroundImage:'url("https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg")' ,backgroundSize:'cover'}}></div>
    <div className='absolute top-0 left-0 w-full bg-cover  min-h-full  -z-40 bg-gradient-to-t from-white '></div>
      <div className='w-full flex flex-col justify-center items-center container mx-auto  mt-20  px-5 py-2'>
        <div className='w-full flex'>
          <span className='text-2xl md:text-4xl text-center md:text-left font-bold'>
            <span className="underline underline-offset-3 decoration-8 decoration-[#51989B] dark:decoration-[#51989B]">{firstthreewords}</span> {restofwords}
          </span>
          <div className='w-full md:flex hidden justify-center items-center'>
          </div>
        </div>
        <div className='bg-white shadow-md mt-10 w-full min-h-[200px] rounded-md px-6 py-6 place-content-center flex flex-col'>
            <h1 className='mb-4 text-xl  font-extrabold text-gray-900 dark:text-white '>
              Accéder à des services <span className='text-blue-600 dark:text-blue-500'> médicaux experts</span>
            </h1>
          <div>
              <div className="relative md:flex space-y-4 md:space-y-0">
                <div className="relative w-full">
                      <input type="search" onFocus={()=>setWhofocus("sp")} onChange={(e)=>setSpeciality(e.target.value)} value={speciality} onBlur={()=>setWhofocus('')}  className="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 md:rounded-l-lg border-rl-gray-50 border-lr-2 md:mr-1 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 outline-none" placeholder="Recherche de spécialité médicale..." required />
                      {whofocus == 'sp' && <div className="z-10 absolute top-full   bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
                      <ul className="py-2 text-sm max-h-[170px] min-h-[170px] overflow-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                          {
                            specialityData && specialityData.filter(item => item.name.toLowerCase().includes(speciality.toLowerCase())).map((item,index)=>(
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer py-2 px-4" onMouseDown={()=>setSpeciality(item.name)}>
                                  {item.name}
                                </li>
                              ))
                          }
                      </ul>
                  </div>}
                  </div>
                  <div className="relative w-full">
                      <input type="search" value={ville} onBlur={()=>setWhofocus('')} onChange={(e)=>setVille(e.target.value)}   onFocus={()=>setWhofocus('lo')} className="block p-4 w-full z-20 text-sm text-gray-900 md:ml-1 bg-gray-50 md:rounded-r-lg border-lr-gray-50 border-lr-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 outline-none" placeholder="Tapez votre ville" required />
                      {whofocus == 'lo' && <div className="z-10 absolute top-full right-0   bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
                      <ul className="py-2 text-sm max-h-[170px] min-h-[170px] overflow-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                          {
                            vileData && vileData.filter(item => item.name.toLowerCase().includes(ville.toLowerCase())).map((item,index)=>(
                              <li className="hover:bg-gray-100 dark:hover:bg-gray-600 py-2 px-4 cursor-pointer  " onMouseDown={()=>setVille(item.name)} key={index}>
                                {item.name}
                              </li>
                              ))
                          }
                      </ul>
                  </div>
                      }
                      <button type="submit" className="absolute top-0 right-0 md:-right-1 p-4 text-sm font-medium h-full text-white bg-blue-700 md:rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                          <span className="sr-only">Search</span>
                      </button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Search

