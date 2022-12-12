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
        },
        editColdRoom:(state,action)=>{
            const index = state.coldRooms.findIndex(room=>room.id*1 === action.payload.id*1)
            state.coldRooms[index] = action.payload
        }


    }
})
export const coldRoomAction = coldRoomSlice.actions
export default coldRoomSlice.reducer