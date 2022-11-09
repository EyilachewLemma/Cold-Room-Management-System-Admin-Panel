import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{token:null,isAuthenticated:false},
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload
        },
        setIsAuthenticated:(state,action) =>{
            state.isAuthenticated = action.payload
        }


    }
})
export const userAction = userSlice.actions
export default userSlice.reducer