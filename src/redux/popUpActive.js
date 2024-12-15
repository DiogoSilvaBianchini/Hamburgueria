import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: "popUpActive",
    initialState: {
        activePopUp: false
    },
    reducers: {
        setPopUp: (state, {payload}) => {
            state.activePopUp = payload
        }
    }
})

export const {setPopUp} = slice.actions
export default slice.reducer