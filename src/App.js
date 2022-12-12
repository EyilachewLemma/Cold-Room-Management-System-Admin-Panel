import {useEffect} from 'react'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Router from './routes';
import { userAction } from './store/slices/UserSlice';
import axios from 'axios';
import apiClient from './url';
import './App.css';



function App() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchUserData = async(token) =>{
    try{
     const response = await axios.get('https://coldroomapinew.rensysengineering.com/admin/auth/my-account',{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:`Bearer ${token}`,    

    }
     })
     if(response.status === 200 || 201){
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
