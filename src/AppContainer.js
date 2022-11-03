import { Fragment } from 'react';
import TheHeader from './components/TheHeader';
import SideBar from './components/SideBar';
import Router from './routes/index';

const AppContainer = () =>{
    return <Fragment>
        <TheHeader />
        <div className='d-flex'>
         <div className='sideBar'>
         <SideBar />
         </div>
        <div className='flex-fill px-3 px-lg-5 py-4 mb-4'>     
        <Router />
        </div>
         </div>
       </Fragment>
}
export default AppContainer