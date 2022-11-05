import { Fragment,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import apiClient from "../../url/index";
import classes from "./WholeSalers.module.css";


const OrderHistory = () => {

  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const componentRef = useRef()
  const coldRooms = useSelector(state =>state.coldroom)
  useEffect( ()=>{
    async function  featchOrder(){
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
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>  
    <h6 className="fw-bold">Wholesaler's Order History</h6>
      <div className="mt-3"><span className="fw-bold">Wholesaler Name</span>: <span className="fs-5">Azimeraw Amare</span></div>
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
              <th>Order id</th>
              <th>Order Date</th>
              <th>Cold room</th>
              <th>Order Price(ETB)</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Paid Amount</th>
              <th>Remaining Amount</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">#213</td>
              <td className="p-3">11-04-2022</td>
              <td className="p-3">ColdRoom01</td>
              <td className="p-3 text-center">2000</td>
              <td className="p-3">Completed</td>
              <td className="p-3">Partially Paid</td>
              <td className="p-3 text-center">1000</td>
              <td className="p-3 text-center">1000</td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      </div>
    </Fragment>
  );
};
export default OrderHistory;
