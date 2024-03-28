import { createSlice,createAsyncThunk,createSelector } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
     product: [],
     cart:JSON.parse(localStorage.getItem('cart')) || [] // Initialize cart state from localStorage
}
const PRO_URL = "https://fake-coffee-api.vercel.app/api"
export const fetchData = createAsyncThunk('coffee/fetchData',async()=>{
       try {
             const respone = await axios.get(PRO_URL)
             return respone.data;
       }catch(err){
          return err.message;
       }
})
export const addToCart = createAsyncThunk('coffee/addToCart',async(productId)=>{
           try{
              return productId;
           }catch(err){
            return err.message;
           }
})
export const deleteProduct = createAsyncThunk('coffee/deleteProduct',async(productId)=>{
           try{
                      return productId;
           }catch(err){
            return err.message;
           }
})
export const deleteAllProduct = createAsyncThunk('coffee/deleteAllProduct',async(productId)=>{
           try{
                      return productId;
           }catch(err){
            return err.message;
           }
})
const coffeeSlice = createSlice({
      name: "products",
      initialState,
      reducers:{},
      extraReducers(builder){
         builder
         .addCase(fetchData.fulfilled,(state,action)=>{
            state.product = [...action.payload];
         })
         .addCase(addToCart.fulfilled,(state,action)=>{
              const {id} = action.payload;
              const existProduct = state.cart.findIndex(pro=>pro.id === id);
              if(existProduct !== -1){
                 state.cart[existProduct].quantity++;
              }else {
               state.cart.unshift({...state.product.find(pro=>pro.id ===id), quantity: 1})
              }
              // Update local storage with updated cart data
              localStorage.setItem('cart', JSON.stringify(state.cart));
         })
         .addCase(deleteProduct.fulfilled,(state,action)=>{
             const id = action.payload
             const existingProduct = state.cart.findIndex(pro=>pro.id === id);
             if(existingProduct !== -1){
               if (state.cart[existingProduct].quantity > 1) {
                  state.cart[existingProduct].quantity--;
              } else{
                  state.cart.splice(existingProduct, 1);
              }
             }
             localStorage.setItem('cart', JSON.stringify(state.cart));
         })
         .addCase(deleteAllProduct.fulfilled,(state,action)=>{
                const id = action.payload
                state.cart = state.cart.filter(pro=>pro.id !== id)
                localStorage.setItem('cart', JSON.stringify(state.cart));
         })
      }
})
export const getAllData = (state)=>state.products.product;
export const getAllId = (state,proId) =>state.products.product.find(pro=>pro.id === proId)
export const getAllProductInCart = (state)=>state.products.cart
export default coffeeSlice.reducer