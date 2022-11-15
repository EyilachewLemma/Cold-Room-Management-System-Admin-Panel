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
        editProduct:(state,action)=>{
            const index = state.findIndex(product=>product.id*1===action.payload.id*1)
            console.log('edited index=',index)
            state[index] = action.payload.product
        },
        deleteProduct:(state,action)=>{
            state = state.map(product=>product.id*1 !==action.payload*1)
        }
        

    }
})
export const productAction = productSlice.actions
export default productSlice.reducer