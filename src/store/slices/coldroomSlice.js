import {createSlice} from '@reduxjs/toolkit'

const coldRoomSlice = createSlice({
    name:'coldroomList',
    initialState:{coldRooms:[]},
    reducers:{
        setColdRooms:(state,action)=>{
            state.coldRooms = action.payload
        },
        addColdRoom:(state,action)=>{
            state.coldRooms.push(action.payload)
        },
        assignManager:(state,action)=>{
            state.coldRooms[action.payload.index].employee= action.payload.employee
        }


    }
})
export const coldRoomAction = coldRoomSlice.actions
export default coldRoomSlice.reducer