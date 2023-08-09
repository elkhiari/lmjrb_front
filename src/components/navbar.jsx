import React,{ useEffect ,useState }  from 'react'
import { useContext } from 'react';
import { FiLogIn } from 'react-icons/fi'
import {BiSolidLogInCircle} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import UserDropd from './userDropd';





function Navbar() {
  const {user,token,logout} = useContext(AuthContext)
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 400) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
      <div className={`w-full  z-40 flex px-20 justify-between duration-150  py-4  top-0 left-0 ${scrolled ?'sticky  shadow':''} bg-white rounded-b-3xl `}>
        <Link to={"/"} className='flex space-x-2 place-items-center group duration-150 cursor-pointer'>
          <img src={require('../assets/media/logoo.png')} alt='logo' className='w-10 h-10 md:w-12 duration-150 md:h-12 rounded group-hover:bg-black group-hover:opacity-50 ' />
            <span className='font-extrabold text-black text-2xl  tracking-tighter duration-150 relative group-hover:opacity-50'>
              Lmjrb <span className='text-3xl absolute -right-4 top-0'>*</span>
            </span>
          </Link>
          <div>
            {user ? <UserDropd user={user} logout={logout}/> : !token && window.location.pathname != '/login' && window.location.pathname != '/register' && <Link to={'/login'} className=' p-2 rounded bg-[#51989b]  backdrop-blur-sm text-white hover:scale-105 duration-150 po flex'>
              <BiSolidLogInCircle className='text-2xl ' />
            </Link>}
          </div>
        </div>
  )
}

export default Navbar

