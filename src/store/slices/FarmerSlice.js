import {createSlice} from '@reduxjs/toolkit'

const farmerSlice = createSlice({
    name:'farmers',
    initialState:{farmers:[]},
    reducers:{
        setOrders(state,action){
            state.farmers = action.payload
        },


    }
})
export const farmerAction = farmerSlice.actions
export default farmerSlice.reducer