import { Fragment,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"
import ExportBtn from "../../components/ExportBtn";
import apiClient from "../../url/index";
import {useNavigate } from "react-router-dom";
import classes from "./Orders.module.css";



const OrderDetail = () => {
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

  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
      <div className="fw-bold">Order Details</div>
      <div className="d-flex justify-content-between">
      <div>
        <div className="mt-3">
          <span className="fw-bold">Order Id</span>: #34814
        </div>
        <div className="mt-3">
          <span className="fw-bold">Wholesaler</span>: Ribika Chekol
        </div>
      </div>
      <div className="me-5">
        <div className="mt-3">
          <span className="fw-bold">Total Price(ETB)</span>: 23,500
        </div>
        <div className="mt-3">
          <span className="fw-bold">Payment Status</span>: Partially Paid
        </div>
      </div>
      <div>
        <div className="mt-3">
          <span className="fw-bold">Paid Amount(ETB)</span>: 13,500
        </div>
        <div className="mt-3">
          <span className="fw-bold">Remaining Amount(ETB)</span>: 1000
        </div>
      </div>
    </div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-end mt-3 p-2`}>
        <div>
          <ExportBtn />
        </div>
      </div>
      
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Product SKU</th>
              <th>Product</th>
              <th>Type</th>
              <th>Quality</th>
              <th>Quantity(kg)</th>
              <th>Price per Kg(ETB)</th>
              <th>Vat %</th>
              <th>Total Price(ETB)</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">#34814</td>
              <td className="p-3">Tomato</td>
              <td className="p-3">Type 1</td>
              <td className="p-3">Fresh</td>
              <td className="p-3">50</td>
              <td className="p-3">30</td>
              <td className="p-3 text-center">0</td>
              <td className="p-3 text-center">1500</td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};
export default OrderDetail;
