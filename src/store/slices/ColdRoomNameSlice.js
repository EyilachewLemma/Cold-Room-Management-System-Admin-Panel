import {createSlice} from '@reduxjs/toolkit'

const coldRoomNameSlice = createSlice({
    name:'coldroomNames',
    initialState:{coldRooms:[]},
    reducers:{
        setColdRooms(state,action){
            state.coldRooms = action.payload
        },
        


    }
})
export const coldRoomNameAction = coldRoomNameSlice.actions
export default coldRoomNameSlice.reducer