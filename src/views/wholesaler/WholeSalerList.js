import { useEffect,useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import { useNavigate } from "react-router-dom";
import classes from "./WholeSalers.module.css";


const WholeSalerList = () => {

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

  const orderHistoryHandler = () =>{
    navigate('/wholesalers/order-history')
  }
  return (
    <div ref={componentRef}>
      <h5 className="text-bold">Wholesalers List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the Wholesalers section you can view  all list of Wholesalers and there order history.      their details. 
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
              <th>Wholesaler's Name</th>
              <th>Location</th>
              <th className="text-end">Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">{index+1}</td>
              <td className="p-3">Kelemu Belay</td>
              <td className="p-3">Amhara</td>
              <td className="p-3 text-end">0911244516</td>
            <td className="p-3 text-end">
            <Button 
             variant="none"
             className={`${classes.btn} onPrintDnone`}
             onClick={event=>orderHistoryHandler()}>Order History</Button>
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
export default WholeSalerList;
