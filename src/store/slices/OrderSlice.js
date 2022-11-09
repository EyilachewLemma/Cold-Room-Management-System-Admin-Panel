import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name:'coldroomList',
    initialState:{orders:[]},
    reducers:{
        setOrders(state,action){
            state.orders = action.payload
        },


    }
})
export const orderAction = orderSlice.actions
export default orderSlice.reducer