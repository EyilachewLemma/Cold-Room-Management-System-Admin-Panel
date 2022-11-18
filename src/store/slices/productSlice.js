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
            const index = state.products.findIndex(product=>product.id*1===action.payload.id*1)
            console.log('edited index=',index)
            const totalAmount = state.products[index].totalProduct
            const product ={
                name:action.payload.name,
                imageUrl:action.payload.imageUrl,
                totalProduct:totalAmount,
            }
            state.products[index] = product
        },
        deleteProduct:(state,action)=>{
            console.log('deleted pr id=',action.payload) 
            const index = state.products.findIndex(product=>product.id*1 ===action.payload*1)
            state.products.splice(index,1)
        }
        

    }
})
export const productAction = productSlice.actions
export default productSlice.reducer