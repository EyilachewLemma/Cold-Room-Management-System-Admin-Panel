import { useEffect,useState,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { orderAction } from "../../store/slices/OrderSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import OrderStatus from "./OrderStatus";
import PaymentStatus from "./PaymentStatus";
import classes from "./Orders.module.css";


const OrderList = () => {
  const [isOrderStatusOpen,setIsOrderStatusOpen] = useState(false)
  const [isPayMentStatusOpen,setIsPayMentStatusOpen] = useState(false)
  const dispatch = useDispatch()
  const orders = useSelector(state =>state.order.orders)
  const componentRef = useRef()
  const searchBy = useRef()
  const navigate = useNavigate()
   
  const  featchOrders = async () =>{
    dispatch(isLoadingAction.setIsLoading(false))
  try{
   var response = await apiClient.get(`admin/orders?search=${searchBy.current.value}`)
   if(response.status === 200){
    dispatch(orderAction.setOrders(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
   
  featchOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log('coldrooms from',orders)

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
const enterKeyHandler = (event) =>{
  if(event.key === 'Enter' || !event.target.value){
    featchOrders()
    console.log('event value',event.target.value)
  }
}
const searchHandler = () =>{
  featchOrders()
  console.log('search value',searchBy.current.value)
}
  const filterOrderHandler =(e)=>{
    console.log('option=', e.target.value)
  }
  const filterByDateHandler = (e) =>{
    console.log('date=',e.target.value)
  }
  return (
    <div ref={componentRef}>
      <h5 className="text-bold">Orders List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the Orders section you can review and manage all orders with
        their detail.You can view and change many information such as order status
        and payment status of an order. 
      </p>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex  mt-3 p-2`}>
        <InputGroup className="w-50 border rounded align-self-center onPrintDnone">
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
        <div className="ms-auto me-3 align-self-center onPrintDnone">
        <Form.Select aria-label="Default select example" onChange={filterOrderHandler}>
        <option value='all'>All</option>
        <option value="1">Completed orders</option>
        <option value="2">pending orders</option>
        <option value="3">Payed Orders</option>
        <option value="4">Unpaid Orders</option>
      </Form.Select>
        </div>
      <div className="me-3 align-self-center onPrintDnone">
      <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Control
       type="date"
       onChange={filterByDateHandler}
        />
    </Form.Group>
      </div>
        <div className="align-self-center">
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
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
            orders.map((order) =>(
              <tr className={classes.row} key={order.id}>
              <td className="p-3">{order.code}</td>
              <td className="p-3">{order.coldRoom.name}</td>
              <td className="p-3">{order.wholeSaler?.fName+' '+order.wholeSaler?.lName}</td>
              <td className="p-3">{order.createdAt.slice(0,10)}</td>
              <td className="p-3">{order.totalPrice}</td>
              <td className="p-3 text-center">{order.orderStatus}</td>
              <td className="p-3 text-center">{order.paymentStatus}</td>
            <td className="p-3 onPrintDnone">
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
    </div>
  );
};
export default OrderList;
