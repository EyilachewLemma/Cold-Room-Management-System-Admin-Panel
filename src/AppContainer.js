import { Fragment,useEffect } from 'react';
import TheHeader from './components/TheHeader';
import SideBar from './components/SideBar';

import { Outlet } from "react-router-dom"
import { coldRoomNameAction } from './store/slices/ColdRoomNameSlice';
import { employeeAction } from "./store/slices/EmployeeSlice";
import { isLoadingAction } from "./store/slices/spinerSlice";
import { useSelector,useDispatch } from 'react-redux';
import Spiner from './Spiner';
import apiClient from './url/index';
const AppContainer = () =>{
  const isLoading = useSelector((state=>state.loading.isLoading))
  const dispatch = useDispatch()
  
  const fetchColdRooms = async() =>{
    try{
      var response =await apiClient.get('admin/coldRoomNames')
      if(response.status === 200){
        console.log('coldroom names=',response.data)
        dispatch(coldRoomNameAction.setColdRooms(response.data))
      }
    }
    catch(err){}
  }
  const  featchEmployees = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/employees?search=${''}`)
   if(response.status === 200){
    dispatch(employeeAction.setEmployees(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}

  useEffect(()=>{
    fetchColdRooms()
    featchEmployees()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return <Fragment>
        <TheHeader />
        <div className='d-flex'>
         <div className='sideBar'>
         <SideBar />
         </div>
        <div className='flex-fill px-3 px-lg-5 py-4 mb-4 position-relative'>  
        {
          isLoading && (<Spiner /> )
        }       
        <Outlet />
        </div>
         </div>
       </Fragment>
}
export default AppContainer