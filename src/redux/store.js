import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import categorySearch from './categorySearchSlice'

export default configureStore({
    reducer: {
        cartSlice,
        categorySearch
    }
})