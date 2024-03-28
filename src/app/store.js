import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/coffees/coffeeSlice'
export const store = configureStore({
    reducer: {
        products: productsReducer
    }
})