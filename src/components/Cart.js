import React, { useEffect } from 'react'
import { addToCart, fetchData } from '../features/coffees/coffeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../features/coffees/coffeeSlice'
import { deleteAllProduct } from '../features/coffees/coffeeSlice'
import { getAllProductInCart } from '../features/coffees/coffeeSlice'
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
  return (
    <main className='flex flex-grow w-full min-h-screen justify-start items-center'>
       <div className='flex flex-col justify-center items-center w-full min-h-screen'>
           <div className='flex flex-col justify-center items-start w-11/12 min-h-20'>
            <h1 className='text-3xl font-Roboto font-semibold'>Shopping Cart</h1>
            </div>
        <div className='flex flex-row w-full justify-center items-center gap-x-2 pt-4'>
          <div className='flex flex-col justify-start items-start bg-white min-h-96 w-9/12 border
              border-gray-300 rounded
            '>
               <nav className='flex flex-row justify-between items-center p-4 w-3/5'>
                 <span>PRODUCT</span>
                 <span>QUANTITY</span>
                 <span>PRICE</span>
                  </nav>
                      <>  
                    {products.length ?  <span className='hidden'></span> : <div className='flex justify-center items-center flex-col min-h-80 w-full'>
                      <span className='text-2xl font-Roboto font-medium'>No Products</span>
                      </div>}
                  {products.map((product,index) => (
                    <div className='flex flex-row justify-between items-center w-full' key={`${product.id}-${index}`}>
                      <div>
                      <img src={product.image_url} className=' object-cover w-full h-40' alt="Product" />
                    </div>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <div>
                        <span>{product.name}</span>
                      </div>
                      <div>
                        <span>{product.quantity}</span>
                      </div>
                      <div>
                        <span>${parseFloat(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                      <div className='flex flex-row justify-between items-center w-40'>
                          <button onClick={()=>decreaseQuantity(product.id)} type='button'>-</button>
                          <button onClick={()=>increaseQuantity(product)} type='button'>+</button>
                          <button onClick={()=>deleteEntireProduct(product.id)} type='button'>Remove</button>
                      </div>
                        
                    </div>
                  </div>
                  
                ))}
                </>
        </div> 
           <div className='  bg-white min-h-96 w-64 border rounded
              border-gray-300 rounded-sm'>
               
           </div>
     </div> 
    </div>
</main>
  )

}

export default Cart