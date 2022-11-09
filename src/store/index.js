import { configureStore } from "@reduxjs/toolkit";
import ColdroomReducer from "./slices/coldroomSlice";
import ColdroomProductReducer from "./slices/ColdroomProductSlice";
import IsLoadingReducer from './slices/spinerSlice'
import BtnSpinerReducer from "./slices/ButtonSpinerSlice";
import ProductReducer from "./slices/productSlice";
import OrderReducer from "./slices/OrderSlice";
import FarmerReducer from "./slices/FarmerSlice";
import WholesalerReducer from "./slices/WholesalerSlice";
import RevenueReducer from "./slices/RevenueSlice";
import SalesReducer from "./slices/SalesSlice";
import EmployeeReducer from "./slices/EmployeeSlice";
import UserReducer from "./slices/UserSlice";
import ProductDetailReducer from "./slices/ProductDetailSlice";
import CrProDetail from "./slices/ColdRoomProductDetailSlice";

 


const store = configureStore({
    reducer:{
        coldroom:ColdroomReducer,
        coldroomProduct:ColdroomProductReducer,
        crProDetail:CrProDetail,
        loading:IsLoadingReducer,
        btn:BtnSpinerReducer,
        product:ProductReducer,
        productDetail:ProductDetailReducer,
        order:OrderReducer,
        farmer:FarmerReducer,
        wholesaler:WholesalerReducer,
        revenue:RevenueReducer,
        sales:SalesReducer,
        employee:EmployeeReducer,
        user:UserReducer,
    }
})
 
export default store