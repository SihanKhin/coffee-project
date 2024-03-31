import React, { useState } from 'react'
import img1 from '../logo/photo_2024-03-27_18-11-19-removebg-preview.png'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { getAllProductInCart } from '../features/coffees/coffeeSlice'
import { useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'
const Header = () => {
  const [open,setOpen] = useState(false)
  const handleOpenSidebar = ()=>{
      setOpen(!open)
  }
  const products = useSelector(getAllProductInCart)
  const hamburger = open ? '✕' : '☰';
  const quantity = products.reduce((acc,cur)=>
     acc + cur.quantity
   ,0);

  return (
    <>
    <header className=' sticky fixed top-0 z-50 w-full h-24  bg-slate-100 flex flex-row justify-between items-center'>
         <section className='w-20 md:w-52 h-20 md:h-28 ml-5 flex flex-col justify-center items-center' >
               <Link to='/'><img className=' object-cover h-20 md:h-28'  src={img1} alt="image" /></Link>
         </section>
          <SearchBar />
         <section className='flex flex-row justify-center items-center w-36 md:w-72'>
              <button className=' flex justify-center items-center md:hidden text-2xl cursor-pointer' onClick={handleOpenSidebar}>{hamburger}</button>
               <ul className=' list-none hidden  md:flex md:flex-row md:justify-between md:items-center'>
                  <Link to='/'><li className='hover:opacity-75 cursor-pointer text-2xl'><FontAwesomeIcon icon={faHouse} /></li></Link>
                  <nav className='relative'>
                    <Link to='/cart'><li className='ml-24 text-2xl hover:opacity-75 cursor-pointer'><FontAwesomeIcon icon={faCartShopping} /></li></Link>
                      <nav className='  absolute bottom-5 right-0 bg-slate-50 rounded-full w-4 h-4 flex items-center justify-center'>
                          <span className='text-xs text-black font-Roboto font-medium'>{quantity}</span>
                      </nav>
                  </nav>
               </ul>
         </section> 
       {/*   <div className={`transition-transform duration-300 ${hidd}
         top-4 right-10 absolute w-11/12 flex flex-row justify-start items-center rounded-md bg-emerald-100 text-lime-500 min-h-12 
         `}>
               <FontAwesomeIcon  className='ml-2' icon={faCircleCheck}/><span className='ml-2'>succesfully added to cart</span>
         </div> */}
    </header>
    <Sidebar open={open}/>
    </>
  )
}

export default Header