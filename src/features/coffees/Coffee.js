import React, { useEffect, useState } from 'react'
import { getAllData } from './coffeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { fetchData } from './coffeeSlice'
import { addToCart } from './coffeeSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Coffee = () => {
  const dispatch = useDispatch()
  const products = useSelector(getAllData);
  useEffect(()=>{
       dispatch(fetchData())
  },[dispatch])


  const Showtoast = () => {
    toast.success('successfully added to cart', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: undefined,
      });
  }
  
  //Add Product to the cart
  const handleAddToCart = (productId)=>{
       const {id,name,price,quantity,image_url} = productId;
       dispatch(addToCart({id:id,name:name,price:price,quantity:quantity,image_url:image_url}))
       console.log(productId)
       Showtoast();
  }
  // State to track hovered product ID
  const [hoveredProductId, setHoveredProductId] = useState(null)
  
  // Event handler for when mouse enters product
  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId)
  }
  
  // Event handler for when mouse leaves product
  const handleMouseLeave = () => {
    setHoveredProductId(null)
  }
  
  if(!products){
    return <div className='flex flex-col justify-center items-center min-h-screen w-full'>
      <span className='text-2xl font-Roboto font-normal'>Loading...</span>
          </div>
  }

  const render = products.map(pro=>(
      <div  onMouseEnter={() => handleMouseEnter(pro.id)} 
        onMouseLeave={handleMouseLeave}
      className="relative rounded flex  pb-10 flex-col bg-white w-96 sm:w-80 md:w-64 justify-center items-center" key={pro.id}>
        ​​​​​         <div className='w-full h-64 flex justify-center items-center'>
                 <img className='object-cover w-full h-64'  src={pro.image_url} alt="image" /> 
                 </div>
             <div className='flex flex-col justify-center items-center w-full'>
                  <h1 className='text-xl font-Roboto font-medium'>{pro.name}</h1>
                  <span className='mt-4 text-lg font-Roboto font-medium'>$ {pro.price}</span>
             </div>
              <div className={`flex ${hoveredProductId === pro.id ? 'block' : 'hidden'} flex-col justify-center p-1 gap-2 items-center bg-slate-200 h-24 w-14 absolute top-2 right-2`}>
                 <button onClick={()=>handleAddToCart(pro)} className='bg-white hover:opacity-75 text-black w-full h-12 '>
                 <FontAwesomeIcon icon={faCartShopping} />     
                 </button>   
                         
                 <button className='hover:opacity-75 bg-white text-black w-full h-12'>
                 <Link to={`/product/${pro.id}`}><FontAwesomeIcon  icon={faEye} /></Link>
                 </button>        
              </div>
      </div>
  ))
  if(!products){
    return <p>Loading......</p>
  }
  return (
    <main className=' grid place-content-center p-4 gap-8 md:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  min-h-screen bg-slate-50'>
      
        {render}
    </main>
  )
}

export default Coffee