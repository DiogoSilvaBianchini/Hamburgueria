import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "productList",
    initialState: {
        isProducts: []
    },
    reducers: {
        addProductsList: (state, {payload}) => {
            if(state.isProducts.length == 0){
                state.isProducts = payload.data
                localStorage.setItem("productsList", JSON.stringify(payload.data))
            }
        },
        loadProducts: (state) => {
            const products = localStorage.getItem("productsList")
            if(products){
                state.isProducts = JSON.parse(products)
            }
        }
    }
})

export const { addProductsList, loadProducts } = slice.actions
export default slice.reducer