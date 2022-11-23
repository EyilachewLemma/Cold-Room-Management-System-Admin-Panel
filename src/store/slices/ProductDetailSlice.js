import {createSlice} from '@reduxjs/toolkit'

const productDetailSlice = createSlice({
    name:'productDetailSlice',
    initialState:{productTypes:[]},
    reducers:{
        setProductTypes:(state,action)=>{
            state.productTypes = action.payload
        },
        addProductType:(state,action)=>{
            state.productTypes.push(action.payload)
        },
        editProductType:(state,action)=>{
          const index = state.productTypes.findIndex(type=>type.id*1 === action.payload.id*1)
          state.productTypes[index] = action.payload
        },
        deleteProductType:(state,action)=>{
            const index = state.productTypes.findIndex(type=>type.id*1 === action.payload*1)
            state.productTypes.splice(index,1)
        }
        

    }
})
export const productDetailAction = productDetailSlice.actions
export default productDetailSlice.reducer