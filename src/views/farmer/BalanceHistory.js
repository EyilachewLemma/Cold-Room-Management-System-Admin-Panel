import { Fragment,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { balanceAction } from "../../store/slices/BalanceSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
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
  const searchBy = useRef()
  const {tb,faId} = useParams()


  const featchBalances = async() =>{
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
  },[faId])
  // const enterKeyHandler = (event) =>{
  //   if(event.key === 'Enter' || !event.target.value){

  //   }
  // }
  // const searchHandler = () =>{
  // }
    const filterByDateHandler = async(e) =>{
      dispatch(isLoadingAction.setIsLoading(false))
    try{
     var response = await apiClient.get(`admin/orders?search=${searchBy.current.value}&status=${''}&date=${e.target.value}`)
     if(response.status === 200){
     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))
    }
    } 
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>
    <div className="fw-bold">Farmers Balance History</div>
    <div className="d-flex align-items-center">
    <div>
      <div className="mt-3">
        <span className="fw-bold">Farmer</span>: {balances.farmer?.fName+' '+balances.farmer?.lName}
      </div>
      <div className="mt-3">
        <span className="fw-bold">Total Balance(ETB)</span>: {tb}
      </div>
    </div>
    <div className="ms-5 ps-5">
    {
      // <div><span className="fw-bold">Cold Room</span>: null</div>
    }
    </div>  
   
  </div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-end mt-3 p-2`}>
      {
      //   <InputGroup className="w-50 border rounded onPrintDnone">
      //   <InputGroup.Text id="searchbyproductName" className={classes.searchIcon}>
      //     <span onClick={searchHandler}>
      //       <i className="fas fa-search"></i>
      //     </span>
      //   </InputGroup.Text>
      //   <Form.Control
      //     className={classes.searchInput}
      //     placeholder="search by Product name"
      //     aria-label="search by product name"
      //     aria-describedby="searchbyproductName"
      //     ref={searchBy}
      //     onKeyUp={enterKeyHandler}
      //   />
      // </InputGroup>
      }
      <div className="ms-3 me-3 onPrintDnone">
      <Form.Group controlId="search-by-date">
      <Form.Control type="date" 
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
        balances.farmerBalances?.length > 0 &&(
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Order Code</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Order Date</th>
              <th>Quantity(Kg)</th>
              <th>Price(ETB)</th>
              <th>Rent Fee</th>
              <th>Balance(ETB)</th>
              <th>Net Balance(ETB)</th>
              <th>Withdrawal State</th>
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
              <td className="p-3 text-center">{balance.rentAmount}</td>
              <td className="p-3 text-center">{balance.balanceAmount}</td>
              <td className="p-3 text-center">{balance.balanceAmount - balance.rentAmount}</td>
            <td className="p-3 text-center">
            {balance.state*1?"Withdrawed":"Unwithdraw"}
            </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      )}
      {
        balances.farmerBalances?.length === 0 &&(
          <div className="mt-5 text-center">No data found</div>
        )
      }
      </div>
    </Fragment>
  );
};
export default BalanceHistory;
