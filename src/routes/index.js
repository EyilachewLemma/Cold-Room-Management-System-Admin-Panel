import {Routes,Route} from 'react-router-dom'
import AppContainer from '../AppContainer';
import DashBoard from '../views/dashboard/DashBoard'
import ColdRooms from '../views/coldroom/ColdRooms'
import ColdRoomLists from "../views/coldroom/ColdRoomList";
import ColdRoomProducts from "../views/coldroom/ColdRoomProduct";
import ProductDetail from '../views/coldroom/ProductDetail';
import Orders from '../views/order/Orders'
import Farmers from '../views/farmer/Farmers'
import BalanceHistory from '../views/farmer/BalanceHistory';
import RentFee from '../views/farmer/RentFee';
import FarmersList from '../views/farmer/FarmersList';
import ProductHistory from '../views/farmer/ProductHistory';
import WholeSalers from '../views/wholesaler/WholeSalers';
import WholeSalerList from '../views/wholesaler/WholeSalerList';
import OrderHistory from '../views/wholesaler/OrderHistry';
import Employees from '../views/employee/Employees'
import Revenue from '../views/revenue/Revenue'
import Saleses from '../views/sales/Salses'
import Products from '../views/product/Products'
import ProductList from '../views/product/ProductList';
import ProductsDetail from '../views/product/ProductDetail';
import OrderDetail from '../views/order/OrderDetail';
import OrderList from '../views/order/OrderList';
import LoginPage from '../views/login/LoginPage';
import AskToForgot from '../views/login/AskToForgot';
import ForgotPassword from '../views/login/ForgotPassword';
import Account from '../views/account/Account';
import NotFound from '../Notfound';
const Router = () =>{
  return <Routes>
  <Route path='/' element={<AppContainer />}>
   <Route path='dash-bord' element={<DashBoard />} /> 
    <Route path='products' element={<Products />}>  
    <Route index element={<ProductList />} />  
    <Route path=':prId/detail' element={<ProductsDetail />} />    
    </Route>
    <Route path='orders' element={<Orders />}>  
    <Route index element={<OrderList />} />
    <Route path=':orderId' element={<OrderDetail />} />      
    </Route>            
    <Route path='cold-rooms' element={<ColdRooms />}>
    <Route index element={<ColdRoomLists />} />
    <Route path=':crId/products' element={<ColdRoomProducts />} />
    <Route path=':crId/product/:proId/prduct-detail/:amount' element={<ProductDetail />} />
     </Route>
     <Route path='farmers' element={<Farmers />}>
     <Route index element={<FarmersList />} />
    <Route path=':faId/product-history/:tp' element={<ProductHistory />} />
    <Route path=':faId/rent-fee/:tr' element={<RentFee />} />
    <Route path=':faId/balance/:tb' element={<BalanceHistory />} />
     </Route>
     <Route path='wholesalers' element={<WholeSalers />}>
     <Route index element={<WholeSalerList />} />
     <Route path=':whId/order-history' element={<OrderHistory />} />
      </Route>
     <Route path='employees' element={<Employees />}>
     </Route>
     <Route path='/revenue' element={<Revenue />}>
     </Route>
     <Route path='sales' element={<Saleses />}>
     </Route>
     <Route path='/account' element={<Account />}>
     </Route>
     </Route>
     <Route path='/login' element={<LoginPage />} />
     <Route path='/forgot-password' element={<ForgotPassword />} />
     <Route path='/forgot' element={<AskToForgot />} />
     
     <Route path="*" element={<NotFound />}/>
  </Routes>
  
}
export default Router