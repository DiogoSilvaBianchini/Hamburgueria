import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import categorySearch from './categorySearchSlice'
import productList from "./productList";

export default configureStore({
    reducer: {
        cartSlice,
        categorySearch,
        productList
    }
})