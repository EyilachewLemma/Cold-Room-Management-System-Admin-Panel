import { Fragment,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { revenueAction } from "../../store/slices/RevenueSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import classes from "./Revenue.module.css";


const Revenue = () => {

  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const revenues = useSelector(state =>state.revenue.revenues)
  const componentRef = useRef()
  const searchBy = useRef()

  const  featchRevenues = async() =>{
    // dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/revenues?search=${searchBy.current.value}`)
   if(response.status === 200){
    dispatch(revenueAction.setRevenues(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
      featchRevenues()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log('revenues from',revenues)
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchRevenues()
      console.log('event value',event.target.value)
    }
  }
  const searchHandler = () =>{
    featchRevenues()
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
    <div className="fw-bold">Rent Revenue List</div>
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
            placeholder="search orders by farmer name"
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
              <th>Farmer Name</th>
              <th>Product Name</th>
              <th>Product SQU</th>
              <th>Product Type</th>
              <th>Cold Room</th>
              <th>Added Date(GC)</th>
              <th>Sold Date(GC)</th>
              <th>Quantity(Kg)</th>
              <th>Amount(ETB)</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">Fentahun Wale</td>
              <td className="p-3">Tomato</td>
              <td className="p-3">#324</td>
              <td className="p-3">Type 1</td>
              <td className="p-3">Cold room 1</td>
              <td className="p-3">10-02-2022</td>
              <td className="p-3">10-8-2022</td>
              <td className="p-3 text-center">200</td>
              <td className="p-3 text-center">100</td>
              
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
export default Revenue;
