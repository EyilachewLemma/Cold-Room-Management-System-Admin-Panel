import { useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { farmerAction } from "../../store/slices/FarmerSlice";
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

  const dispatch = useDispatch()
  const farmers = useSelector(state =>state.farmer.farmers)
  const navigate = useNavigate()
  const componentRef = useRef()
  const searchBy = useRef()

  const featchFarmers = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/farmers?search=${searchBy.current.value}`)
   if(response.status === 200){
    console.log('farmers=',response.data)
    dispatch(farmerAction.setFarmers(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
   
  featchFarmers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handlBalanceHistory = (tbc,id) =>{
    navigate(`/farmers/${id}/balance/${tbc}`)
  }
//   const handlRentFee = (tr,id) =>{
//     navigate(`/farmers/${id}/rent-fee/${tr}`)
// }
const handlProductHistory = (tp,id) =>{
    navigate(`/farmers/${id}/product-history/${tp}`)
}
const enterKeyHandler = (event) =>{
  if(event.key === 'Enter' || !event.target.value){
    featchFarmers()
    console.log('event value',event.target.value)
  }
}
const searchHandler = () =>{
  featchFarmers()
  console.log('search value',searchBy.current.value)
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
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search orders by wholsaler name"
            ref={searchBy}
            aria-label="Username"
            aria-describedby="basic-addon1"
            onKeyUp={enterKeyHandler}
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
      {farmers.length > 0 && (
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
            farmers.map((farmer,index) =>(
              <tr className={classes.row} key={farmer.id}>
              <td className="p-3">{index+1}</td>
              <td className="p-3">{farmer.fullName}</td>
              <td className="p-3">{farmer.location}</td>
              <td className="p-3 text-center">{farmer.totalProduct}</td>
              <td className="p-3 text-center">{farmer.totalRent}</td>
              <td className="p-3 text-center">{farmer.totalBalance}</td>
            <td className="p-3 onPrintDnone">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Button
        variant="none"
        className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
        onClick={()=>handlBalanceHistory(farmer.totalBalance,farmer.id)}>Balance History</Button>
     {
      // <Button
      // variant="none"
      // className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
      //  onClick={()=>handlRentFee(farmer.totalRent,farmer.id)}>Rent Fee</Button>
     }
      <Button
        variant="none"
         className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
          onClick={()=>handlProductHistory(farmer.totalProduct,farmer.id)}>Product History</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      )}
      {farmers.length === 0 &&(
        <div className="mt-5 text-center">No farmers found</div>
      )}
      </div>
  );
};
export default FarmersList;
