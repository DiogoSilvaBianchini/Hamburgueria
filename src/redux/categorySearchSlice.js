import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "categorySearch",
    initialState: {
        category: ""
    },
    reducers: {
        setCategory: (state, {payload}) => {
            state.category = payload.category
        }
    }
})

export const { setCategory } = slice.actions 
export default slice.reducer