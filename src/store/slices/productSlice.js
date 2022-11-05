import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name:'coldroomList',
    initialState:{products:[]},
    reducers:{
        setProduct(state,action){
           return state.products = action.payload
        },
        addProduct(state,action){
            state.products.push(action.payload)
        },


    }
})
export const productAction = productSlice.actions
export default productSlice.reducer