import { Fragment } from 'react';
import TheHeader from './components/TheHeader';
import SideBar from './components/SideBar';
import { Outlet } from "react-router-dom"

const AppContainer = () =>{
    return <Fragment>
        <TheHeader />
        <div className='d-flex'>
         <div className='sideBar'>
         <SideBar />
         </div>
        <div className='flex-fill px-3 px-lg-5 py-4 mb-4'>     
        <Outlet />
        </div>
         </div>
       </Fragment>
}
export default AppContainer