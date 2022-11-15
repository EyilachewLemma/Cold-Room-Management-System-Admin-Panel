import {NavLink} from 'react-router-dom'
import classes from './SideBar.module.css'
const SideBar = () =>{
   
    return <div className='px-3'>
    <div className='my-4 fs-5 fw-bold ms-4'>Menu</div>
      <div className='mb-3'>     
        <NavLink to={'/dash-board'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fas fa-th-large"></i></span>            
        <span>Dashboard</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/products/list'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-layer-group"></i></span>            
        <span>Products</span>
          </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/cold-rooms/list'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-warehouse"></i></span>            
        <span>Coldrooms</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/orders/list'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-cart-shopping"></i></span>            
        <span>Orders</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/farmers/list'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-user-group"></i></span>            
        <span>Farmers</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/wholesalers/list'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-people-carry-box"></i></span>            
        <span>Wholesalers</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/revenue'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-chart-line"></i></span>            
        <span>Revenue</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/sales'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4 py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-coins"></i></span>            
        <span>Sales</span>
            </NavLink>
        </div>
        <div className='mb-3'>     
        <NavLink to={'/employees'}  className={({ isActive }) =>isActive ? classes.active+" border rounded px-1 px-xl-4 py-2" : classes.inactive+' px-1 px-xl-4  py-2'}>
        <span className="fs-5 me-3"><i className="fa-solid fa-users"></i></span>            
        <span>Employees</span>
            </NavLink>
        </div>
        
    </div>
}
export default SideBar