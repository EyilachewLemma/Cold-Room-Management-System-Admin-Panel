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
          const index = state.findIndex(type=>type.id === action.payload.id)
          state[index] = action.type
        },
        deleteProductType:(state,action)=>{
            state = state.map(product=>product.id*1 !==action.payload*1)
        }
        

    }
})
export const productDetailAction = productDetailSlice.actions
export default productDetailSlice.reducer