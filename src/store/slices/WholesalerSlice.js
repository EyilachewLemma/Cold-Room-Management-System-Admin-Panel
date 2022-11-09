import {createSlice} from '@reduxjs/toolkit'

const wholesalerSlice = createSlice({
    name:'wholesaller',
    initialState:{wholesalers:[]},
    reducers:{
        setWholesalers(state,action){
            state.orders = action.payload
        },


    }
})
export const wholesalerAction = wholesalerSlice.actions
export default wholesalerSlice.reducer