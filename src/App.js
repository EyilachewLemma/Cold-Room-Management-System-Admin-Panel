import {Fragment,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spiner from './Spiner';
import Router from './routes';
import { userAction } from './store/slices/UserSlice';
import apiClient from './url/index';
import fileApiClient from './url/fileApiClient';
import './App.css';


function App() {
  const isLoading = useSelector((state=>state.loading.isLoading))
  const isAuthenticated = useSelector(state=>state.user.isAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchUserData = async() =>{
    try{
     const response = await apiClient.get('admin/auth/my-account')
     if(response.status === 200){
        dispatch(userAction.setUser(response.data))
     }
    }
    catch(err){
      console.log('error')
    }
   }
  useEffect(()=>{
    const token = localStorage.getItem('tokenc')
    if(token){
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fileApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData()
      dispatch(userAction.setIsAuthenticated(true))
    }
    if(isAuthenticated){
    navigate('/dash-board')
    }
    else{
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthenticated])
  return ( 
    <Fragment>
    <Router />
    
    {
      isLoading && (<Spiner /> )
    }    
    
    </Fragment>
    
  );
}

export default App;
