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

  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const saleses = useSelector(state =>state.sales.saleses)
  const componentRef = useRef()
  const searchBy = useRef()
   const  featchSaleses = async() =>{
    // dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/sales?search=${searchBy.current.value}`)
   if(response.status === 200){
    dispatch(salesAction.setSaleses(response.data || []))
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
    console.log('search value',searchBy.current.value)
  }
    const filterByColdRoomHandler =(e)=>{
      console.log('option=', e.target.value)
    }
    const filterByDateHandler = (e) =>{
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
        <option value='all'>All</option>
        <option value="1">Cold Room 1</option>
        <option value="2">Cold Room 2</option>
        <option value="3">Cold Room 3</option>
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
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="px-2 py-3 text-center">#765</td>
              <td className="px-2 py-3 text-center">Gashaw Emiru</td>
              <td className="px-2 py-3 text-center">Cold Room 2</td>
              <td className="px-2 py-3 text-center">10-02-2022</td>
              <td className="px-2 py-3 text-center">1300</td>
              <td className="px-2 py-3 text-center">Partially Paid</td>
              <td className="px-2 py-3 text-center">900</td>
              <td className="px-2 py-3 text-center">400</td>
              
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
export default Sales;
