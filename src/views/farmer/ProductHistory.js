import { Fragment,useEffect,useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { productHistoryAction } from "../../store/slices/ProductHistorySlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";
import apiClient from "../../url/index";
import { useNavigate,useParams } from "react-router-dom";
import classes from "./Farmers.module.css";


const ProductHistory = () => {

  const dispatch = useDispatch()
  const products = useSelector(state =>state.productHistory.products)
  const navigate = useNavigate()
  const componentRef = useRef()
  const {tp,faId} = useParams()

  async function  featchProductHistory(){
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/farmers/products/${faId}`)
   if(response.status === 200){
    dispatch(productHistoryAction.setProducts(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{
   
  featchProductHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
console.log('pppp---',products)
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>
    <div className="fw-bold">Farmers Product History</div>
    <div className="d-flex align-items-center">
    <div>
      <div className="mt-3">
        <span className="fw-bold">Farmer</span>: {products[0]?.farmer.fName+' '+products[0]?.farmer.lName}
      </div>
      <div className="mt-3">
        <span className="fw-bold">Total Product Instock</span>: {tp} Kg
      </div>
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
      {products.length > 0 &&(
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Cold Room</th>
              <th>Added Date(GC)</th>
              <th>Sold Stock(Kg)</th>
              <th>Current Stock(Kg)</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product) =>(
              <tr className={classes.row} key={product.id}>
              <td className="p-3">{product.warehousePosition}</td>
              <td className="p-3">{product.productType.product.name}</td>
              <td className="p-3">{product.productType.title}</td>
              <td className="p-3">{product.coldRoom.name}</td>
              <td className="p-3">{product.createdAt.slice(0,10)}</td>
              <td className="p-3 text-center">{product.soldQuantity}</td>
              <td className="p-3 text-center">{product.currentQuantity}</td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      )}
      {products.length === 0 &&(
        <div className="mt-5 text-center">No products found</div>
      )}
      </div>
    </Fragment>
  );
};
export default ProductHistory;
