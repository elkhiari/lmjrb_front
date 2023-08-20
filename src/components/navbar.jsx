import React,{ useEffect ,useState }  from 'react'
import { useContext } from 'react';
import { FiLogIn, FiMenu } from 'react-icons/fi'
import {BiSolidLogInCircle} from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { GrClose } from 'react-icons/gr';
import UserDropd from './userDropd';
import Button from './button';
import { useRef } from 'react';





function Navbar() {
  const {user,token,logout} = useContext(AuthContext)
  const [navActive, setNavActive] = useState(false);
  const location = useLocation();
  const navRef = useRef(null)
  // if click to any link in navbar then close the navbar
  const handleClick = () => {
    setNavActive(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavActive(false);
      }
    };
  
    document.addEventListener('mousedown', handleOutsideClick);
  
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  
  return (
    <>
      <div className={`w-full  z-40 relative flex px-5 md:px-20 justify-between place-items-center  duration-150  py-4  bg-white rounded-b-3xl `} >
        <Link to={"/"} className='flex space-x-2 place-items-center group duration-150 cursor-pointer'>
          <img src={require('../assets/media/logo_v2.png')} alt='logo' className='md:w-16 md:h-16 w-10 h-10  duration-150 rounded group-hover:bg-black group-hover:opacity-50 ' />
          </Link>
          <ul 
            className={`lg:flex pt-20 lg:pt-0 lg:space-x-20 place-items-center  lg:flex-row lg:space-y-0 space-y-4 absolute lg:relative  right-0 bg-white lg:bg-transparent   lg:right-0 lg:place-items-center  lg:py-0 py-4 lg:px-0 px-10 duration-500 lg:shadow-none shadow-xl lg:rounded-none rounded-b-3xl lg:items-center lg:justify-between w-full lg:w-auto -z-10 ${navActive?"top-14":"-top-80"} lg:top-0 lg:z-0`}
            ref={navRef}
          >
            <li className='list relative flex'>
              <Link to={"/"} onClick={handleClick} className='text-black w-full font-bold   hover:text-[#20B37C] duration-150'>Accueil</Link>
            </li>
            <li className='list relative flex'>
              <Link to={"/about"} onClick={handleClick} className='text-black  font-bold w-full  hover:text-[#20B37C] duration-150'>A propos</Link>
            </li>
            {!token && <li className='flex space-x-3 place-content-center '>
            {location.pathname != '/login' && <Link to={"login"} onClick={handleClick} className='bg-[#20B37C]  hover:bg-white shadow-2xl shadow-[#20B37C]   border-[#20B37C] relative py-2 px-5 min-w-[120px]  md:min-w-[150px]  hover:shadow-xl border-2  text-sm rounded text-white hover:text-[#20B37C] font-bold duration-300  outline-none flex place-content-center place-items-center'>
                Se connecter
                </Link>}
              {location.pathname != '/register' && location.pathname != '/' && <Link to={"register"} onClick={handleClick} className='bg-[#20B37C] hover:bg-white shadow-2xl shadow-[#20B37C]   border-[#20B37C] relative py-2 px-5 min-w-[120px] md:min-w-[150px] hover:shadow-xl border-2  text-sm rounded text-white hover:text-[#20B37C] font-bold duration-300  outline-none flex place-content-center place-items-center'>
                S'inscrire
                </Link> }
            </li> }
          </ul>
          {
            token && user && 
            <div>
              <UserDropd user={user} logout={logout} />
            </div>
          }
          <button className='lg:hidden' onClick={()=>setNavActive(!navActive)}>
            {
              navActive ? <GrClose className='text-2xl text-black' /> : <FiMenu className='text-2xl text-black' />
            }
          </button>
        </div>
        
      </>
  )
}

export default Navbar

