import {createSlice} from '@reduxjs/toolkit'

const productHistorySlice = createSlice({
    name:'productHistorySlice',
    initialState:{products:[]},
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        },
       
        

    }
})
export const productHistoryAction = productHistorySlice.actions
export default productHistorySlice.reducer