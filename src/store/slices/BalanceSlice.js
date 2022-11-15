import {createSlice} from '@reduxjs/toolkit'

const balanceSlice = createSlice({
    name:'balance',
    initialState:{balances:[]},
    reducers:{
        setBalances(state,action){
            state.balances = action.payload
        },
        


    }
})
export const balanceAction = balanceSlice.actions
export default balanceSlice.reducer