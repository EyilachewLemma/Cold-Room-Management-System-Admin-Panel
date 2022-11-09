import {createSlice} from '@reduxjs/toolkit'

const salesSlice = createSlice({
    name:'sales',
    initialState:{saleses:[]},
    reducers:{
        setRevenues(state,action){
            state.saleses = action.payload
        },


    }
})
export const salesAction = salesSlice.actions
export default salesSlice.reducer