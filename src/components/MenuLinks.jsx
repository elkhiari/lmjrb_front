import React ,{useEffect , useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

function MenuLinks({name,link}) {
    const [current, setCurrent] = useState(false)
    const location = useLocation()
    useEffect(() => {
        location.pathname == '/settings/'+link?setCurrent(true):setCurrent(false)
    }, [location])
  return (
        <Link to={link} className={`w-full duration-300 border-t   border-gray-200 h-10 text-gray-500 ${current ? 'bg-[#20B37C] text-white ' : 'hover:pl-14 hover:pr-5'} flex items-center px-10`}>
            <span className=' text-sm font-bold'>{name}</span>
            <span className='ml-auto text-sm font-bold'>{current && '•'}</span>
            {
                !current &&
                <span className='ml-auto text-sm font-bold'>›</span>
            }

        </Link>
  )
}

export default MenuLinks