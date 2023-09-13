import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiSearchAlt } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';




function Search() {
  const [locationData, setLocationData] = useState(null);
  const [vileData, setVileData] = useState();
  const [ville, setVille] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [specialityData, setSpecialityData] = useState();
  const [whofocus, setWhofocus] = useState();
  const {loading,token,user} = useContext(AuthContext)
  
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
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/ville')
      .then((response) => {
        setVileData(response.data);
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
      <div className='w-full flex flex-col justify-center items-center   mx-auto px-5 py-2'>
        {/* <div className='w-full flex'>
          <span className='text-2xl md:text-4xl text-center md:text-left font-extrabold'>
            <span className="text-[#20B37C]">{firstthreewords}</span> {restofwords}
          </span>
          <div className='w-full md:flex hidden justify-center items-center'>
          </div>
        </div> */}
        <div className='w-full md:flex space-y-10 md:space-y-0 md:space-x-2  mt-10 relative'>
          <div className=' w-full space-y-4 flex flex-col justify-center'>
            {/* <img src={require('../assets/media/doctor/pngwing.com.png')} alt='doctor' className='w-full' /> */}
          <div>
            <span className='text-2xl md:text-4xl  md:text-left font-extrabold'>
              <span className="text-[#20B37C]">{firstthreewords}</span> {restofwords}
            </span>
          </div> 
         <div>
         {!token && <Link to={'/register'} className='text-[#20B37C] text-left  w-auto  font-bold transition-all duration-300 inline-flex  place-items-center group'>
          Rejoignez la communauté
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" class="ml-24 group-hover:ml-32  duration-300  " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
          </Link>}
         </div>
          </div>
          <div className='absolute bottom-10 md:bottom-14  md:right-2 h-1/2 w-full md:w-1/2 bg-[#20B37C] shadow-[0_40px_80px_rgba(255,59,48,0.1)] -z-50'></div>
          <div className=' bg-gradient-to-br from-white/60 from-[11.97%] to-white/30 to-[63.37%] p-6 text-gray-900 shadow-[0_20px_40px_rgba(255,69,58,0.05)] backdrop-blur-3xl  w-full min-h-[200px] rounded-md px-6 py-6 place-content-center mx-auto flex flex-col relative'>
              <h1 className='mb-4 text-xl  font-extrabold text-gray-900 '>
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
                  className="block border border-gray-200 p-4 w-full z-20 text-sm text-gray-900 bg-white/70 duration-150 rounded focus:rounded-b-none focus:bg-white hover:shadow-lg focus:shadow-lg outline-none"
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
                                  className="hover:bg-gray-100 hover:px-7 duration-300 dark:hover:bg-gray-600 cursor-pointer py-2 px-4"
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
                        className="block border border-gray-200 p-4 w-full z-20 text-sm text-gray-900 bg-white/70 duration-150 rounded  focus:rounded-b-none focus:bg-white hover:shadow-lg focus:shadow-lg outline-none"
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
                                className="hover:bg-gray-100  hover:px-7 duration-300 dark:hover:bg-gray-600 cursor-pointer py-2 px-4"
                                onMouseDown={() => setVille(item.name)}
                              >
                                {item.name}
                              </li>
                            ))}
                      </ul>
              </div>
            </div>
            <Link to={`/search?speciality=${speciality}&ville=${ville}`} className='w-full flex justify-center items-center mt-4'>
              <button className='bg-[#20B37C] relative border flex justify-center items-center border-[#20B37C] text-white hover:bg-transparent hover:text-[#20B37C]  w-full px-4 py-2 rounded-md  transition-all duration-300'>
                Rechercher
                <BiSearchAlt className='absolute right-4 ' />
              </button>
            </Link>

          </div>
          
        </div>
      </div>
    </div>

  )
}

export default Search

