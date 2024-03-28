import React, { useState } from 'react'
const Sidebar = ({open}) => {
  
  const isOpen = open ? 'translate-x-0' : '-translate-x-40'
  return (
    <nav className={` z-40 flex flex-row justify-center items-start pt-28 fixed top-0 bottom-0 w-32 bg-slate-100  transition-transform duration-300 ${isOpen} md:hidden`}>
         <ul className=' list-none'>
             <li>Home</li> 
             <li>Cart</li> 
         </ul>
    </nav>
  )
}

export default Sidebar