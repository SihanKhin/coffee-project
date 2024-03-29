import React from 'react'
import img2 from '../logo/pngtree-coffee-hot-drink-afternoon-tea-banner-background-image_181987_LE_auto_x2.jpg'
import Coffee from '../features/coffees/Coffee'
const Home = () => {
  return (
    <>
    <main className='flex flex-grow justify-start items-center flex-col w-full min-h-screen bg-[length:800px_800px] md:bg-contain md:bg-center'
    style={{ backgroundImage: `url(${img2})`}}    
    >
         <div className='flex flex-col justify-center items-center min-h-screen ml-10'>
                <h1 className=' text-center ml-2 text-4xl md:text-7xl text-red-950 mb-5 font-Roboto font-bold'>Love Coffee
                </h1>
                <span className='text-center text-base md:text-2xl text-red-950 font-Roboto font-normal italic'>Make your day feels great</span>
                <a href="#allproduct"><button className='  bg-red-950 text-white text-sm w-32 h-8 md:text-base font-Roboto italic mt-4 md:mt-8 hover:underline rounded-sm'>Checkout Now</button></a>
         </div>
       
    </main>
    <nav id='allproduct'  className='  my-5 flex justify-center items-center w-full text-red-950'><h1 className=' text-3xl font-Roboto font-normal'>All Products Here</h1></nav>
    <Coffee />
    </>
  )
}

export default Home