import {useEffect} from 'react'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Router from './routes';
import { userAction } from './store/slices/UserSlice';
import apiClient from './url/index';
import axios from 'axios';
import './App.css';


function App() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchUserData = async(token) =>{
    try{
     const response = await axios.get('http://coldroomapinew.merahitechnologies.com/admin/auth/my-account',{
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:`Bearer ${token}`,    

    }
     })
     if(response.status === 200){
      dispatch(userAction.setUser(response.data))
      navigate('/dash-bord')
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
      dispatch(userAction.setIsAuthenticated(true))
       fetchUserData(token)
    }
    else{
      navigate('/login')
    
    
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (<Router /> );
}

export default App;
