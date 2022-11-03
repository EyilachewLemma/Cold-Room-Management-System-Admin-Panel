import {createSlice} from '@reduxjs/toolkit'

const buttonSpiner = createSlice({
    name:'isLoading',
    initialState:false,
    reducers:{
        setButtonSpiner(__,action){
            return action.payload
        },


    }
})
export const buttonSpinerAction = buttonSpiner.actions
export default buttonSpiner.reducer