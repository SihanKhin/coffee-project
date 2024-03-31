import React, { useEffect } from 'react'
import { fetchData } from '../features/coffees/coffeeSlice';
import { getAllId } from '../features/coffees/coffeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../features/coffees/coffeeSlice';
import { toast } from 'react-toastify'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
function ProductDetails() {
  const dispatch = useDispatch();
  const {proId} = useParams();
  useEffect(()=>{
    dispatch(fetchData())
 },[dispatch]);
  const product = useSelector(state=>getAllId(state,parseInt(proId)));
  // Ensure product exists before rendering options
  let renderFlavorOptions = null;
  let renderGrindOptions = null;
  if (product) {
    if (product.flavor_profile) {
      renderFlavorOptions = product.flavor_profile.map((flavor, index) => (
        <option key={index} value={flavor}>
          {flavor}
        </option>
      ));
    }
    if (product.grind_option) {
      renderGrindOptions = product.grind_option.map((grind, index) => (
        <option key={index} value={grind}>
          {grind}
        </option>
      ));
    }
  }
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
  const handleAddToCart = (productId)=>{
        const {id,image_url,quantity,price,name} = productId;
        dispatch(addToCart({
          id:id,
          image_url:image_url,
          quantity:quantity,
          price:price,
          name:name
        }))
        Showtoast();
  }
  if(!product){
    return <nav className='flex flex-grow min-h-screen justify-center items-center w-full flex-col'>
         <p className='text-xl font-Roboto'>Loading...</p>
    </nav>
  }
  return (
     <main className='flex  relative flex-grow w-full min-h-screen flex-col justify-start items-center '>
        <Link to="/"><div className=' absolute left-7 top-9 md:top-10 text-lg hover:opacity-75 cursor-pointer
        '>
           <FontAwesomeIcon icon={faArrowLeftLong}/>
        </div></Link>
          <div className='flex p-8 flex-col w-full justify-center items-center'>
            <h1 className=' text-3xl md:text-5xl font-Roboto font-semibold'>PRODUCT DETAILS</h1>
            </div>
         <div className=' flex flex-col md:flex-row  justify-start items-center w-full'>
           <div className='flex flex-col justify-center  items-center w-full'>
             <img className=' object-cover h-96 md:h-full w-full' src={product.image_url} alt="image" />
           </div>
           <div className='flex flex-col justify-center items-center w-96  md:w-full p-4'>
               <div className=' md:mb-10'>
                   <h1 className='text-2xl md:text-6xl font-Roboto font-medium'>{product.name}</h1>
               </div>
               <div className=' md:mb-8'>
                   <span className='text-xl md:text-2xl font-Roboto font-extralight'>{product.description}</span>
               </div>
               <div className='flex flex-col justify-start items-start w-full'>
                   <span className='text-lg md:text-xl font-Roboto font-normal mb-1'>Region: {product.region}</span>
                   <span className='text-lg md:text-xl font-Roboto font-normal mb-1'>Weight: {product.weight}</span>
                   <span className='text-lg md:text-xl font-Roboto font-normal mb-4'>Roast Level: {product.roast_level}</span>
               </div>
                <div className='flex flex-row justify-between  md:justify-start items-center w-full'>
                   <div>
                    <label className='text-base  md:text-xl font-Roboto font-normal text-nowrap' htmlFor="flavor">Flavor:</label>
                    <select className='ml-4 w-24 md:w-32 h-6 text-xs md:text-base font-Roboto font-light' name="flavor" id="flavor">
                    {renderFlavorOptions}
                    </select>
                    </div>
                    <div>
                    <label className= 'md:ml-20 text-base md:text-xl font-Roboto font-normal text-nowrap' htmlFor="grind">Grind Option:</label>
                    <select  className=' font-Roboto font-light ml-4 w-24 md:w-32 h-6 text-xs md:text-base' name="grind" id="grind">
                    {renderGrindOptions}
                    </select>
                    </div>
               </div>
               <div className='flex flex-col justify-center items-center w-full pb-6 mt-3 md:mt-5 '>
                <button onClick={()=>handleAddToCart(product)} className=' rounded hover:opacity-80 w-96 md:w-full h-10 bg-red-950 text-white font-Roboto font-medium'>Buy Now</button>
            </div>   
           </div>
              
        </div>
     </main>
  )
}

export default ProductDetails