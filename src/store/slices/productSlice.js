import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name:'product',
    initialState:{products:[]},
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        },
        addProduct:(state,action)=>{
            state.products.push(action.payload)
        },
        deleteProduct:(state,action)=>{
            state = state.map(product=>product.id*1 !==action.payload*1)
        }
        

    }
})
export const productAction = productSlice.actions
export default productSlice.reducer