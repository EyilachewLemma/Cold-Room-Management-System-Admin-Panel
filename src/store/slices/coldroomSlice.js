import {createSlice} from '@reduxjs/toolkit'

const coldRoomSlice = createSlice({
    name:'coldroomList',
    initialState:[],
    reducers:{
        setColdRooms(state,action){
            state.coldRooms = action.payload
        },
        addColdRoom(state,action){
            state.coldRooms.push(action.payload)
        },


    }
})
export const coldRoomAction = coldRoomSlice.actions
export default coldRoomSlice.reducer