import {Routes,Route} from 'react-router-dom'
import DashBoard from '../views/DashBoard'
import ColdRooms from '../views/coldroom/ColdRooms'
import ColdRoomLists from "../views/coldroom/ColdRoomList";
import ColdRoomProducts from "../views/coldroom/ColdRoomProduct";
import Orders from '../views/order/Orders'
import Farmers from '../views/farmer/Farmers'
import BalanceHistory from '../views/farmer/BalanceHistory';
import RentFee from '../views/farmer/RentFee';
import FarmersList from '../views/farmer/FarmersList';
import ProductHistory from '../views/farmer/ProductHistory';
import WholeSalers from '../views/wholesaler/WholeSalers';
import WholeSalerList from '../views/wholesaler/WholeSalerList';
import OrderHistory from '../views/wholesaler/OrderHistry';
import Employees from '../views/Employees'
import Revenue from '../views/revenue/Revenue'
import Saleses from '../views/Saleses'
import Products from '../views/product/Products'
import Settings from '../views/Settings'
import OrderDetail from '../views/order/OrderDetail';
import OrderList from '../views/order/OrderList';
const Router = () =>{
  return <Routes>
    <Route path='/products' element={<Products />}>        
    </Route>
    <Route path='/orders' element={<Orders />}>  
    <Route path='list' element={<OrderList />} />
    <Route path='items' element={<OrderDetail />} />      
    </Route>
    <Route path='/dash-board' element={<DashBoard />}>        
    </Route>
    <Route path='/cold-rooms' element={<ColdRooms />}>
    <Route path='list' element={<ColdRoomLists />} />
    <Route path='products' element={<ColdRoomProducts />} />
     </Route>
     <Route path='/farmers' element={<Farmers />}>
     <Route path='list' element={<FarmersList />} />
    <Route path='product-history' element={<ProductHistory />} />
    <Route path='rent-fee' element={<RentFee />} />
    <Route path='balance' element={<BalanceHistory />} />
     </Route>
     <Route path='/wholesalers' element={<WholeSalers />}>
     <Route path='list' element={<WholeSalerList />} />
     <Route path='order-history' element={<OrderHistory />} />
      </Route>
     <Route path='/employees' element={<Employees />}>
     </Route>
     <Route path='/revenue' element={<Revenue />}>
     </Route>
     <Route path='/sales' element={<Saleses />}>
     </Route>
     <Route path='/settings' element={<Settings />}>
     </Route>
  </Routes>
  
}
export default Router