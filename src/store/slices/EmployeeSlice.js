import {createSlice} from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name:'employee',
    initialState:{employees:[]},
    reducers:{
        setEmployees:(state,action)=>{
            state.employees = action.payload
        },
        addEmployee:(state,action)=>{
            state.employees.push(action.payload)
        },
        editEmployee:(state,action)=>{
            const index = state.employees.findIndex(employee=>employee.id*1===action.payload.id*1)
            state.employees[index] = action.payload 
        },
        setStatus:(state,action)=>{
            state.employees[action.payload.index].status=action.payload.status
        },


    }
})
export const employeeAction = employeeSlice.actions
export default employeeSlice.reducer