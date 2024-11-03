import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "cartManager",
    initialState: {
        products: []
    },
    reducers: {
        agreeProduct(state, {payload}){
            const filterProduct = state.products.find(product => product.title == payload.title)
            if(filterProduct){
                filterProduct.quant += 1
            }else{
                state.products = [...state.products, payload]
            }
        },

        updateProduct(state, {payload}){
            let findProduct = state.products.find(product => product.title == payload.title)
            if(findProduct){
                findProduct.quant = payload.quant
            }
        },

        deleteProduct(state, {payload}){
            let removeProduct = state.products.filter(product => product.title !== payload.title)
            state.products = removeProduct
        }
    }
})

export const {agreeProduct, updateProduct, deleteProduct} = slice.actions
export default slice.reducer