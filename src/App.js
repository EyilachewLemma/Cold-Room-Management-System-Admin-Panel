import {Fragment,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Spiner from './Spiner';
import Router from './routes';
import './App.css';
import { userAction } from './store/slices/UserSlice';

function App() {
  const isLoading = useSelector((state=>state.loading.isLoading))
  const isAuthenticated = useSelector(state=>state.user.isAuthenticated)
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = localStorage.getItem('tokenc')
    if(token){
      dispatch(userAction.setIsAuthenticated(true))
    }
    // if(isAuthenticated){
    // navigate('/dash-board')
    // }
    // else{
    //   navigate('/login')
    // }
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
