import React,{ useEffect ,useState }  from 'react'
import { useContext } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import UserDropd from './userDropd';




function Navbar() {
  const {user,token,logout} = useContext(AuthContext)
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
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
      <div className={`w-full px-8 z-40 flex justify-around duration-150  py-4 sticky top-0 left-0 ${scrolled ?'bg-white/25 backdrop-blur-sm':''}`}>
        <Link to={"/"} className='flex space-x-2 place-items-center group duration-150 cursor-pointer'>
          <img src={require('../assets/media/logoo.png')} alt='logo' className='w-10 duration-150 h-10 rounded group-hover:bg-black group-hover:opacity-50 ' />
            <span className='font-extrabold text-black text-2xl  tracking-tighter duration-150 relative group-hover:opacity-50'>
              Lmjrb <span className='text-3xl absolute -right-4 top-0'>*</span>
            </span>
          </Link>
          <div>
            {user ? <UserDropd user={user} logout={logout}/> : !token && <Link to={'/login'} className=' p-2 rounded  text-black hover:scale-105 duration-150 po flex'>
              <span className='font-bold mr-2 hidden sm:block'>
                Connexion
              </span> <FiLogIn className='text-2xl ' />
            </Link>}
          </div>
        </div>
  )
}

export default Navbar

