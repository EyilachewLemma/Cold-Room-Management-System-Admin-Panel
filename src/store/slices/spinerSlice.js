import {createSlice} from '@reduxjs/toolkit'

const isLoadingSlice = createSlice({
    name:'isLoading',
    initialState:false,
    reducers:{
        setIsLoading(__,action){
           return  action.payload
        },


    }
})
export const isLoadingAction = isLoadingSlice.actions
export default isLoadingSlice.reducer