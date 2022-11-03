import {Fragment} from 'react'
import { useSelector } from 'react-redux';
import AppContainer from './AppContainer'
import Spiner from './Spiner';
import './App.css';

function App() {
  const isLoading = useSelector((state=>state.isLoading))
  return ( <Fragment>
    <AppContainer />
    {
      isLoading && (
        <Spiner /> 
      )
    }    
    
    </Fragment>
    
  );
}

export default App;
