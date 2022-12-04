import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name:'coldroomList',
    initialState:{orders:[],orderItems:[]},
    reducers:{
        setOrders:(state,action)=>{
            state.orders = action.payload
        },
        setOrderItems:(state,action)=>{
            state.orderItems = action.payload
        },


    }
})
export const orderAction = orderSlice.actions
export default orderSlice.reducer