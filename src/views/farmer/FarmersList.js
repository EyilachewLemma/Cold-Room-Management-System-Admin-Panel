import { useEffect,useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import { useNavigate } from "react-router-dom";
import classes from "./Farmers.module.css";


const FarmersList = () => {

  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const coldRooms = useSelector(state =>state.coldroom)
  const navigate = useNavigate()
  const componentRef = useRef()
  useEffect( ()=>{
    async function  featchOrder(){
      // dispatch(isLoadingAction.setIsLoading(true))
    try{
     var response = await apiClient.get('api/cold_rooms')
     if(response.status === 200){
      dispatch(coldRoomAction.setColdRooms(response.data || []))
     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))}
  }
  featchOrder()
  },[dispatch])

  console.log('coldrooms from',coldRooms)

  const handlBalanceHistory = () =>{
    navigate('/farmers/balance')
  }
  const handlRentFee = () =>{
    navigate('/farmers/rent-fee')
}
const handlProductHistory = () =>{
    navigate('/farmers/product-history')
}

  return (
    <div ref={componentRef}>
      <h5 className="text-bold">Farmers List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the Farmers section you can view  all farmers related information with
        their detail. 
      </p>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-between mt-3 p-2`}>
        <InputGroup className="w-50 border rounded onPrintDnone">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search orders by wholsaler name"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>        
      
        <div className="ms-auto">
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn onPrintDnone py-1"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
        </div>
      </div>
      
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Farmer Name</th>
              <th>Location</th>
              <th>Product stock in Cold room(Kg)</th>
              <th>Product Rent Fee(ETB)</th>
              <th>Balance(ETB)</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">{index+1}</td>
              <td className="p-3">Kelemu Belay</td>
              <td className="p-3">Amhara</td>
              <td className="p-3 text-center">2000</td>
              <td className="p-3 text-center">200</td>
              <td className="p-3 text-center">5500</td>
            <td className="p-3 onPrintDnone">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Button
        variant="none"
        className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
        onClick={event=>handlBalanceHistory()}>Balance History</Button>
      <Button
        variant="none"
        className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
         onClick={handlRentFee}>Rent Fee</Button>
      <Button
        variant="none"
         className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
          onClick={handlProductHistory}>Product History</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      </div>
  );
};
export default FarmersList;
