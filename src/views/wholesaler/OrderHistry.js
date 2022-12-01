import { Fragment,useEffect,useRef } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import { wholesalerAction } from "../../store/slices/WholesalerSlice";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import apiClient from "../../url/index";
import classes from "./WholeSalers.module.css";

const OrderHistory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const componentRef = useRef()
  const orders = useSelector(state =>state.wholesaler.orders)
  const {whId} = useParams()

  const featchOrder = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
    try{
     var response = await apiClient.get(`admin/wholesalers/orders/${whId}`)
     if(response.status === 200){
      dispatch(wholesalerAction.setOrders(response.data || []))
     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))}
  }
  useEffect( ()=>{  
      featchOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log('coldrooms from',orders)
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>  
    <h6 className="fw-bold">Wholesaler's Order History</h6>
      <div className="mt-3"><span className="fw-bold">Wholesaler Name</span>: <span className="fs-5">{orders?.fName+' '+orders?.lName}</span></div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-between mt-3 p-2`}>    
      
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
      {
        orders.orders?.length > 0 &&(
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
            orders.orders?.map((order,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">{order.orderCode}</td>
              <td className="p-3">{order.createdAt.slice(0,10)}</td>
              <td className="p-3">{order.coldRoom?.name}</td>
              <td className="p-3 text-center">{order.totalPrice}</td>
              <td className="p-3">{order.orderStatus}</td>
              <td className="p-3">{order.paymentStatus}</td>
              <td className="p-3 text-center">{order.paidAmount}</td>
              <td className="p-3 text-center">{order.totalPrice - order.paidAmount}</td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
        )}
        {
          orders.orders?.length === 0 &&(
            <div className="mt-5 text-center">No order history found</div>
          )
          
        }
      </div>
      </div>
    </Fragment>
  );
};
export default OrderHistory;
