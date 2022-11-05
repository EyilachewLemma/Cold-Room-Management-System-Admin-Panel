import { configureStore } from "@reduxjs/toolkit";
import coldroomReducer from "./slices/coldroomSlice";
import isLoadingReducer from './slices/spinerSlice'
import ButtonSpinerReducer from "./slices/ButtonSpinerSlice";
import productReducer from "./slices/productSlice";

 


const store = configureStore({
    reducer:{
        coldroom:coldroomReducer,
        isLoading:isLoadingReducer,
        btn:ButtonSpinerReducer,
        product:productReducer,
    }
})
 
export default store