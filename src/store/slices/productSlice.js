import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name:'coldroomList',
    initialState:[],
    reducers:{
        setProduct(state,action){
           return state.coldRooms = action.payload
        },
        addProduct(state,action){
            state.coldRooms.push(action.payload)
        },


    }
})
export const productAction = productSlice.actions
export default productSlice.reducer