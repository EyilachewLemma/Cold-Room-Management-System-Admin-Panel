import { Fragment,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { salesAction } from "../../store/slices/SalesSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import classes from "./Sales.module.css";


const Sales = () => {

  const dispatch = useDispatch()
  const saleses = useSelector(state =>state.sales.saleses)
  const coldRooms = useSelector(state=>state.coldRoomName.coldRooms)
  const componentRef = useRef()
  const searchBy = useRef()
   const  featchSaleses = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/sales?search=${searchBy.current.value}&coldRoomId=${''}&date=${''}`)
   if(response.status === 200){
    dispatch(salesAction.setSales(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
    
  featchSaleses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log('saleses from',saleses)
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchSaleses()
      console.log('event value',event.target.value)
    }
  }
  const searchHandler = () =>{
    featchSaleses()
  }
    const filterByColdRoomHandler = async (e)=>{
      dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/sales?search=${searchBy.current.value}&coldRoomId=${e.target.value}&date=${''}`)
   if(response.status === 200){
    dispatch(salesAction.setSales(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
    }
    const filterByDateHandler = async(e) =>{
      dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/sales?search=${searchBy.current.value}&coldRoomId=${''}&date=${e.target.value}`)
   if(response.status === 200){
    dispatch(salesAction.setSales(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
      console.log('date=',e.target.value)
    }
  return (
    <Fragment>
    <div ref={componentRef}>
    <div className="fw-bold">Sales List</div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-between mt-3 p-2`}>
        <InputGroup className="w-50 border rounded onPrintDnone">
          <InputGroup.Text id="searchbyfarmerName" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search orders by wholesaler's name"
            aria-label="search by product name"
            aria-describedby="searchbyproductName"
            ref={searchBy}
            onKeyUp={enterKeyHandler}
          />
        </InputGroup>
        <div className="ms-auto onPrintDnone">
        <Form.Select aria-label="Default select example" onChange={filterByColdRoomHandler}>
        <option value=''>All</option>
        {coldRooms.map(coldRoom=>{
         return(<option key={coldRoom.id} value={coldRoom.id}>{coldRoom.name}</option>)
        })}
      </Form.Select>
        </div>
      <div className="ms-3 me-3 onPrintDnone">
      <Form.Group controlId="search-by-date">
      <Form.Control 
      type="date"
      onChange={filterByDateHandler}
       />
    </Form.Group>
      </div>
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn onPrintDnone py-1"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
        </div>
      </div>
      {
        saleses.data_name?.length && (
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Order Id</th>
              <th>Wholesaler Name</th>
              <th>Cold Room</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Paid Amount(ETB)</th>
              <th>Remaining Amount(ETB)</th>
            </tr>
          </thead>
          <tbody>
          {
            saleses.data_name.map((sales,index) =>(
              <tr className={classes.row} key={index}>
              <td className="px-2 py-3 text-center">{sales.orderCode}</td>
              <td className="px-2 py-3 text-center">{sales.wholeSaler?.fName+' '+sales.wholeSaler?.lName}</td>
              <td className="px-2 py-3 text-center">{sales.coldRoom.name}</td>
              <td className="px-2 py-3 text-center">{sales.createdAt.slice(0,10)}</td>
              <td className="px-2 py-3 text-center">{sales.totalPrice}</td>
              <td className="px-2 py-3 text-center">{sales.paymentStatus}</td>
              <td className="px-2 py-3 text-center">{sales.paidAmount}</td>
              <td className="px-2 py-3 text-center">{sales.totalPrice-sales.paidAmount}</td>
              
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      )
      }
      {
        !saleses.data_name?.length && (
          <div className="mt-5 text-center">No data found</div>
        )
      }
      </div>
    </Fragment>
  );
};
export default Sales;
