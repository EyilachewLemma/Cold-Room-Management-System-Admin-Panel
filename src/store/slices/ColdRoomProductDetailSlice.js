import {createSlice} from '@reduxjs/toolkit'

const crProDetailSlice = createSlice({
    name:'coldroomProductDetail',
    initialState:{products:[]},
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        },
        


    }
})
export const crProAction = crProDetailSlice.actions
export default crProDetailSlice.reducer