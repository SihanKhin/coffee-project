import React, { useEffect, useState } from 'react'
import { fetchData } from '../features/coffees/coffeeSlice'
import { getAllData } from '../features/coffees/coffeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
const SearchBar = ({openSearch}) => {
    const dispatch = useDispatch();
    const products = useSelector(getAllData);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
      dispatch(fetchData());
    }, [dispatch]);
    useEffect(() => {
      if (products) {
        const filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
      }
    }, [search, products]);
    const handleRemoveSearch = (id) => {
      setFilteredProducts(filteredProducts => filteredProducts.filter(pro => pro.id !== id));
    };
    const searchResult = (e) => {
      setSearch(e.target.value);
    };
    const cancelSearch = () => {
        setSearch('');
      };
    const isOpen = openSearch ? 'block' : 'hidden';
    return (
      <section className='flex w-full  flex-col justify-center items-center'>
        <form  className={`transition-all duration-300 ${isOpen} w-full md:flex justify-center items-center`} action="">
            <div className=" w-3/4 relative flex justify-center items-center">
               <button className='flex text-sm justify-center items-center text-gray-500 absolute left-2'>
                <FontAwesomeIcon icon={faSearch} />
                </button>
              <input
                className= 'w-full rounded-full h-12 outline-none pl-7 text-base font-Roboto font-medium'
                type="text"
                placeholder="Search..."
                value={search}
                onChange={searchResult}
              />
              { search &&
              <button className=' absolute right-3 text-base' onClick={(e)=>{e.preventDefault();cancelSearch()}}>
                <FontAwesomeIcon icon={faRemove} />
              </button>
                }
            {search && (
            <div className=' absolute top-14 flex flex-col justify-center  items-center  md:w-full  bg-slate-50 rounded'>
              {filteredProducts.map((pro) => (
                <Link className='w-full' to={`/product/${pro.id}`}>
                  <div className='flex flex-row   justify-between items-center w-full hover:bg-white hover:rounded' key={pro.id}>
                  <div className='w-16 min-h-16'>
                    <img className=' object-cover w-full h-16' src={pro.image_url} alt="Product" />
                  </div>
                  <div className='flex flex-col justify-center items-start w-full'>
                    <span className=' font-Roboto text-xl font-normal'>{pro.name}</span>
                  </div>
                  <button className='flex flex-col w-10 justify-center items-center' 
                  onClick={(e)=>{e.preventDefault(); handleRemoveSearch(pro.id)}} >
                  <FontAwesomeIcon icon={faRemove} />
                  </button>
                </div>
                </Link>  
              ))}
            </div>
            
          )}
              </div>
        </form>
       {/*  {search && ( // Render cancel button only if search is not empty
          
        )} */}
      </section>

    );
  };


export default SearchBar