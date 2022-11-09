import {createSlice} from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name:'employee',
    initialState:{employees:[]},
    reducers:{
        setEmployees(state,action){
            state.employees = action.payload
        },


    }
})
export const employeeAction = employeeSlice.actions
export default employeeSlice.reducer