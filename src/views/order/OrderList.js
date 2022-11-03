import { Fragment,useEffect,useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ExportBtn from "../../components/ExportBtn";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import { useNavigate } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import PaymentStatus from "./PaymentStatus";
import classes from "./Orders.module.css";


const OrderList = () => {
  const [isOrderStatusOpen,setIsOrderStatusOpen] = useState(false)
  const [isPayMentStatusOpen,setIsPayMentStatusOpen] = useState(false)
  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const coldRooms = useSelector(state =>state.coldroom)
  const navigate = useNavigate()
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

  const handlOrderItem = () =>{
    navigate('/orders/items')
  }
  const handlOrderStatus = () =>{
    setIsOrderStatusOpen(true)
}
const handlOrderModalClose = () =>{
  setIsOrderStatusOpen(false)
}
const handlPaymentStatus = () =>{
  setIsPayMentStatusOpen(true)
}
const handlPaymentStatusModalClose = () =>{
  setIsPayMentStatusOpen(false)
}
  return (
    <Fragment>
      <h5 className="text-bold">Orders List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the Orders section you can review and manage all orders with
        their detail.You can view and change many information such as order status
        and payment status of an order. 
      </p>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-between mt-3 p-2`}>
        <InputGroup className="w-50 border rounded">
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
        <div className="ms-auto me-3">
        <Form.Select aria-label="Default select example">
        <option value='all'>All</option>
        <option value="1">Completed orders</option>
        <option value="2">pending orders</option>
        <option value="3">Payed Orders</option>
        <option value="3">Unpaid Orders</option>
      </Form.Select>
        </div>
      <div className="me-3">
      <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Control type="date" />
    </Form.Group>
      </div>
        <div>
          <ExportBtn />
        </div>
      </div>
      
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Order-Id</th>
              <th>Cold Room</th>
              <th>Wholesaler</th>
              <th>Ordered Date</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">814</td>
              <td className="p-3">Bahir Dar</td>
              <td className="p-3">Dagne Menberu</td>
              <td className="p-3">10-30-2022</td>
              <td className="p-3">21,300</td>
              <td className="p-3 text-center">completed</td>
              <td className="p-3 text-center">Unpaid</td>
            <td className="p-3">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Button
        variant="none"
        className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
        onClick={event=>handlOrderItem()}>Order Item</Button>
      <Button
        variant="none"
        className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
         onClick={handlOrderStatus}>Order Status</Button>
      <Button
        variant="none"
         className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
          onClick={handlPaymentStatus}>Payment Status</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <OrderStatus show={isOrderStatusOpen} onClose={handlOrderModalClose} />
      <PaymentStatus show={isPayMentStatusOpen} onClose={handlPaymentStatusModalClose} />
    </Fragment>
  );
};
export default OrderList;
