
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
const Sidebar = ({open}) => {
  const isOpen = open ? 'translate-x-0' : '-translate-x-40'
  return (
    <nav className={` z-40 flex flex-row justify-center items-start pt-28 fixed top-0 bottom-0 w-28 bg-slate-100  transition-transform duration-300 ${isOpen} md:hidden`}>
         <ul className=' list-none'>
             <Link className='flex flex-row text-base font-Roboto font-normal hover:opacity-75 mt-4' to='/'>
              <li className='mr-2 text-xl'><FontAwesomeIcon icon={faHome}/></li>
              Home
              </Link>
             <Link className='flex font-Roboto font-normal flex-row text-base mt-4 hover:opacity-75' to='/cart'>
              <li className='mr-2 text-xl'>
              <FontAwesomeIcon icon={faCartShopping}/></li>
              Cart
              </Link>
         </ul>
    </nav>
  )
}

export default Sidebar