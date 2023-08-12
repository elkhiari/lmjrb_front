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
    {/* <div className='absolute top-0 left-0 w-full bg-cover  min-h-full  -z-50 backdrop-blur-sm brightness-90 bg-gradient-to-t from-white/200 '  style={{backgroundImage:'url("https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg")' ,backgroundSize:'cover'}}></div>
    <div className='absolute top-0 left-0 w-full bg-cover  min-h-full  -z-40 bg-gradient-to-t from-white '></div> */}
      <div className='w-full flex flex-col justify-center items-center container mx-auto  mt-20  px-5 py-2'>
        <div className='w-full flex'>
          <span className='text-2xl md:text-4xl text-center md:text-left font-extrabold'>
            <span className="text-[#20B37C]">{firstthreewords}</span> {restofwords}
          </span>
          <div className='w-full md:flex hidden justify-center items-center'>
          </div>
        </div>
        <div className='w-full flex container mt-10 relative'>
          <div className='absolute top-10 left-1/4 h-14 w-1/2 bg-green-600 shadow-lg -z-50'></div>
          <div className='bg-white/40 backdrop-blur-sm shadow-md  w-full min-h-[200px] rounded-md px-6 py-6 place-content-center mx-auto flex flex-col relative'>
              <h1 className='mb-4 text-xl  font-extrabold text-gray-900 dark:text-white '>
                Accéder à des services <span className='text-[#20B37C]'> médicaux experts</span>
              </h1>
              <div className="relative  space-y-4 ">
                <div className="relative w-full">
                <input
                  type="search"
                  onFocus={() => setWhofocus('sp')}
                  onChange={(e) => setSpeciality(e.target.value)}
                  value={speciality}
                  onBlur={() => setWhofocus('')}
                  className="block p-4 w-full z-20 text-sm text-gray-900 bg-white/70 duration-150 rounded shadow focus:rounded-b-none focus:bg-white hover:shadow-lg focus:shadow-lg outline-none"
                  placeholder="Recherche de spécialité médicale..."
                  required
                />
                        <ul
                          className={`z-10 absolute transition-all top-full ${
                            whofocus === 'sp' ? 'max-h-[170px] opacity-100' : 'max-h-0 opacity-0 hidden'
                          } bg-white divide-y divide-gray-100 text-sm rounded-b shadow w-full `}
                        >
                          {specialityData &&
                            specialityData
                              .filter((item) => item.name.toLowerCase().includes(speciality.toLowerCase()))
                              .map((item, index) => (
                                <li
                                  key={index}
                                  className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer py-2 px-4"
                                  onMouseDown={() => setSpeciality(item.name)}
                                >
                                  {item.name}
                                </li>
                              ))}
                      </ul>
                  </div>
                  <div className="relative w-full">
                      
                      <input
                        type="search"
                        onFocus={() => setWhofocus('lo')}
                        onChange={(e) => setVille(e.target.value)}
                        value={ville}
                        onBlur={() => setWhofocus('')}
                        className="block p-4 w-full z-20 text-sm text-gray-900 bg-white/70 duration-150 rounded shadow focus:rounded-b-none focus:bg-white hover:shadow-lg focus:shadow-lg outline-none"
                        placeholder="Recherche de spécialité médicale..."
                        required
                      />
                      <ul
                        className={`z-10 absolute transition-all top-full ${
                          whofocus === 'lo' ? 'max-h-[170px]  opacity-100' : 'max-h-0 opacity-0 hidden'
                        } bg-white divide-y divide-gray-100 text-sm rounded-b shadow w-full`}
                      >
                        { vileData &&
                          vileData
                            .filter(item => item.name.toLowerCase().includes(ville.toLowerCase()))
                            .map((item, index) => (
                              <li
                                key={index}
                                className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer py-2 px-4"
                                onMouseDown={() => setVille(item.name)}
                              >
                                {item.name}
                              </li>
                            ))}
                      </ul>
              </div>
            </div>
          </div>
          <div className=' w-full hidden lg:block'>
                          
          </div>
        </div>
      </div>
    </div>

  )
}

export default Search

