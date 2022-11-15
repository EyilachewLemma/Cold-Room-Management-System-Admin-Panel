import { Fragment,useEffect,useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { balanceAction } from "../../store/slices/BalanceSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import { useNavigate,useParams } from "react-router-dom";
import classes from "./Farmers.module.css";


const BalanceHistory = () => {

  const dispatch = useDispatch()
  const balances = useSelector(state =>state.balance.balances)
  const navigate = useNavigate()
  const componentRef = useRef()
  const {tb,faId} = useParams()
  async function  featchBalances(){
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/farmers/balances/${faId}`)
   if(response.status === 200){
    dispatch(balanceAction.setBalances(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
 
  featchBalances()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  console.log('coldrooms from',balances)
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>
    <div className="fw-bold">Farmers Balance History</div>
    <div className="d-flex align-items-center">
    <div>
      <div className="mt-3">
        <span className="fw-bold">Farmer</span>: {balances.farmer.fName+' '+balances.farmer.lName}
      </div>
      <div className="mt-3">
        <span className="fw-bold">Total Balance(ETB)</span>: {tb}
      </div>
    </div>
    <div className="ms-5 ps-5">
    <div><span className="fw-bold">Cold Room</span>: null</div>
    </div>  
   
  </div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-between mt-3 p-2`}>
        <InputGroup className="w-50 border rounded onPrintDnone">
          <InputGroup.Text id="searchbyproductName" className={classes.searchIcon}>
            <span>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search by Product name"
            aria-label="search by product name"
            aria-describedby="searchbyproductName"
          />
        </InputGroup>
        <div className="ms-3 onPrintDnone">
        <Form.Select aria-label="Default select example">
        <option value='all'>All</option>
        <option value="1">Type 1</option>
        <option value="2">Type 2</option>
        <option value="3">Type 3</option>
      </Form.Select>
        </div>
      <div className="ms-3 me-3 onPrintDnone">
      <Form.Group controlId="search-by-date">
      <Form.Control type="date" />
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
              <th>Order-ID</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Order Date(GC)</th>
              <th>Quantity(Kg)</th>
              <th>Price per(ETB)</th>
              <th>Balance(ETB)</th>
              <th>Withdraw Status</th>
            </tr>
          </thead>
          <tbody>
          {
            balances.farmerBalances?.map((balance) =>(
              <tr className={classes.row} key={balance.orderCode}>
              <td className="p-3">{balance.orderCode}</td>
              <td className="p-3">{balance.productName}</td>
              <td className="p-3">{balance.productType}</td>
              <td className="p-3">{balance.orderDate.slice(0,10)}</td>
              <td className="p-3">{balance.quantity}</td>
              <td className="p-3 text-center">{balance.price}</td>
              <td className="p-3 text-center">{balance.balanceAmount}</td>
            <td className="p-3 text-center">{balance.state}</td>
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
export default BalanceHistory;
