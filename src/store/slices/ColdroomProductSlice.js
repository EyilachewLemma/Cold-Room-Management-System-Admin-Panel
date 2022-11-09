import {createSlice} from '@reduxjs/toolkit'

const coldRoomProductSlice = createSlice({
    name:'coldroomProduct',
    initialState:{products:[]},
    reducers:{
        setProducts(state,action){
            state.products = action.payload
        },
        


    }
})
export const coldRoomProductAction = coldRoomProductSlice.actions
export default coldRoomProductSlice.reducer