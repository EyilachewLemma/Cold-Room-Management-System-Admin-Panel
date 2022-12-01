import {createSlice} from '@reduxjs/toolkit'

const wholesalerSlice = createSlice({
    name:'wholesaller',
    initialState:{wholesalers:[],orders:[]},
    reducers:{
        setWholesalers(state,action){
            state.wholesalers = action.payload
        },
        setOrders:(state,action)=>{
            state.orders = action.payload
        },


    }
})
export const wholesalerAction = wholesalerSlice.actions
export default wholesalerSlice.reducer