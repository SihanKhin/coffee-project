import React, { useEffect } from 'react'
import { addToCart, fetchData } from '../features/coffees/coffeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../features/coffees/coffeeSlice'
import { deleteAllProduct } from '../features/coffees/coffeeSlice'
import { getAllProductInCart } from '../features/coffees/coffeeSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProductInCart);
  useEffect(()=>{
    dispatch(fetchData());
},[dispatch])
  if(!products){
    return <p>No Products</p>
  }
  const decreaseQuantity = (proId) =>{
      dispatch(deleteProduct(proId))
  }
  const increaseQuantity = (proId) =>{
      dispatch(addToCart(proId))
  }
  const deleteEntireProduct = (productId) =>{
    dispatch(deleteAllProduct(productId))
  }
  console.log(products)
  const productQuantity = products.reduce((acc,cur)=>(
        acc + cur.quantity
  ),0)
  const totalPrice = products.reduce((acc,cur)=>(
             acc + cur.price * cur.quantity
  ),0);
  const displayQuantity = productQuantity >  1 ?  "ITEMS" : "ITEM" 
  return (
    <main className='flex flex-grow w-full min-h-screen justify-start items-center'>
       <div className='flex flex-col  justify-center items-center w-full min-h-screen'>
           <div className='flex flex-row justify-between items-start w-11/12 py-10  md:-ml-7'>
              <h1 className='text-3xl font-Roboto font-semibold '>Shopping Cart</h1>
              <div className='md:w-80 md:mr-8'>
                <span className='text-2xl font-Roboto font-medium'>{productQuantity} {displayQuantity}</span>
                </div>
              
            </div>
          
        <div className='flex flex-col md:flex-row w-full justify-center items-center gap-x-2 pt-4'>
          <div className='flex flex-col justify-start items-start bg-white  min-h-32 md:min-h-96 w-11/12 md:w-9/12 border
              border-gray-300 rounded
            '>              
                      <>  
                      
                  {products.length ?  <span className='hidden'></span> : <div className='flex justify-center items-center flex-col min-h-80 w-full'>
                      <span className='text-2xl font-Roboto font-medium'>No Products</span>
                      </div>}
                  {products.map((product,index) => (
                     <>
                    <div className='flex flex-row justify-between  items-center w-full' key={`${product.id}-${index}`}>
                      <div className='w-40 h-40 flex flex-col justify-center items-center'>
                      <img src={product.image_url} className=' object-cover w-full h-20 md:h-40' alt="Product" />
                    </div>
                    <div className='flex flex-row w-full justify-between items-center '>
                      <div className=' mr-2 w-32 md:w-52'>
                        <span className='text-base md:text-xl font-Roboto font-normal'>{product.name}</span>
                      </div>
                      <div className='text-base mr-2 md:text-lg  font-Roboto font-medium flex justify-center items-center border border-gray-300 w-10'>
                        <span>{product.quantity}</span>
                      </div>
                      <div className=' w-16'>
                        <span className='text-base md:text-xl font-Roboto font-medium'>${parseFloat(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                      <div className='flex flex-row justify-between items-center ml-2 w-24 lg:w-40  mr-3 lg:mr-10
                      '>
                          <div>
                            <button className=' hover:opacity-70 text-base  md:text-xl' onClick={()=>decreaseQuantity(product.id)} type='button'>
                               <FontAwesomeIcon icon={faMinus}/>
                            </button>
                          </div>
                          <div>
                             <button className=' hover:opacity-70 text-base md:text-xl' onClick={()=>increaseQuantity(product)} type='button'>
                             <FontAwesomeIcon icon={faPlus}/>
                             </button>
                          </div>
                          <div>
                          <button  className='hover:opacity-70 text-base md:text-xl' onClick={()=>deleteEntireProduct(product.id)} type='button'><FontAwesomeIcon icon={faTrash}/></button>
                          </div>                 
                      </div>
                    </div>
                    
                  </div>
                  <hr className='w-11/12 ml-6 md:ml-12 border border-gray-300'/>
                  </>
                ))}
                  
                </>
                <Link to="/"><div className='flex flex-row w-full justify-start py-4 items-center md:ml-12 ml-6'>
                  <button className='hover:underline hover:opacity-80 w-32 md:w-40 h-10 bg-blue-600 rounded text-white 
                    text-xs text-nowrap
                  md:text-base font-Roboto font-normal '>
                     <FontAwesomeIcon className="mr-1" icon={faArrowLeftLong}/>Continue Shopping
                  </button>
                  </div></Link>
        </div> 
           <div className=' mt-2 md:mt-0 bg-white min-h-20 md:min-h-96  w-11/12 md:w-72 border rounded 
              border-gray-300 py-2'>
                <div className='flex flex-col justify-center items-start w-full p-1 ml-2'>
                 <h1 className='text-xl font-Roboto font-medium'>Summary</h1>
                </div>
                   <div className='w-full flex flex-col justify-center items-center'>
                  <hr className='w-11/12 border border-gray-300'/>
                  </div>
                   <div className='w-full flex p-2 flex-row justify-between items-center ml-2 md:ml-1 '>
                     <span className='text-xs font-Roboto font-medium'>{displayQuantity} {productQuantity}</span>
                     <span className=' mr-4 md:mr-2 text-xs font-Roboto font-medium'>$ {totalPrice}</span>
                  </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                    <hr className='w-11/12 border border-gray-300'/>
                    </div> 
                   <div className='w-full flex p-2 flex-row justify-between items-center ml-2 md:ml-1'>
                     <span className='text-xs font-Roboto font-medium'>TOTAL PRICE</span>
                     <span className=' mr-4 md:mr-2 text-xs font-Roboto font-medium'>$ {totalPrice}</span>
                  </div>
                  <div className=' w-full flex justify-center items-center
                  '>
                      <button className=' hover:opacity-80 w-11/12 h-8  bg-black rounded-sm text-white font-Roboto
                       font-medium
                      '>CHECKOUT</button>
                  </div>
           </div>
          
     </div> 
    </div>
</main>
  )

}

export default Cart