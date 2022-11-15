import React,{useRef,useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactToPrint from "react-to-print";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { crProAction } from "../../store/slices/ColdRoomProductDetailSlice";
import apiClient from "../../url/index";
import classes from './ProductDetail.module.css'

const ProductDetail = (props) => {
  const componentRef = useRef()
    const {crId,proId,amount} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state=>state.crProDetail.products)



    const featchColdRoomProductDetails = async() =>{
      dispatch(isLoadingAction.setIsLoading(true))
      try{
       var response = await apiClient.get(`admin/coldroom-products/product/${proId}?coldRoomId=${crId}`)
       if(response.status === 200){
        console.log('cold room product details',response.data)
        dispatch(crProAction.setProducts(response.data))
       }
      }
      catch(err){}
      finally {dispatch(isLoadingAction.setIsLoading(false))}
    }
    useEffect(()=>{
      featchColdRoomProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <>
      
        <div ref={componentRef}>
          <h6 className="fw-bold px-3 pt-3">Product Stock Listing</h6>
          <div className="d-flex justify-content-between px-3 pt-2">
            <div>
              <div className="mt-3">
                <span className="fw-bold">Product</span>: {products[0]?.product.name}
              </div>
              <div className="mt-3">
                <span className="fw-bold">Total product in stock(kg)</span>: {amount}
              </div>
            </div>
            <div className="me-5">
              <div className="mt-3">
                <span className="fw-bold">Cold room name</span>: {products[0]?.coldRoom.name}
              </div>
            </div>
          </div>
          <div className="d-flex px-3 mt-4 align-items-center">
          <div className="me-3 onPrintDnone">
          <div className="ms-2 py-2">Filter By product type</div>
          <Form.Select aria-label="Default select example">
          <option value='all'>All</option>
          <option value="1">type 1</option>
          <option value="2">type 2</option>
          <option value="3">type 3</option>
        </Form.Select>
          </div>
        <div className="ms-5 mt-3 onPrintDnone">
        <Form.Group className="mb-3" controlId="filterbydate">
        <Form.Label>Filter by Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
        </div>
           <div className="ms-auto mt-4">
           <ReactToPrint
           trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
           content={()=>componentRef.current}       
           documentTitle='new document'
           pageStyle='print'
           />
           </div>
          </div>
          <div className={`${classes.borderTop} mt-4`} >
          <Table responsive="md">
            <thead className=''>
              <tr>
                <th>Product SKU</th>
                <th>Product Type</th>
                <th>Farmer</th>
                <th>Added Date</th>
                <th>Original Quantity</th>
                <th>Sold Quantity</th>
                <th>Current Quantity(Kg)</th>
                <th>Added by</th>
              </tr>
            </thead>
            <tbody>
            {
              products.map((product,index) =>(
                <tr className={classes.tdPadding} key={index}>
                <td className='py-3'>{product.warehousePosition}</td>
                <td className="p-2">{product.productType?.title}</td>
                <td className="p-2 text-center">{product.farmer.fName+' '+product.farmer.lName}</td>
                <td className="p-2">{product.createdAt.slice(0,10)}</td>
                <td className="p-2 text-center">{product.oldQuantity}</td>
                <td className="p-2 text-center">{product.soldQuantity}</td>            
                <td className="p-2 text-center">{product.currentQuantity}</td>
                <td className="p-2 text-center">{'null'}</td>
              </tr>
              ))
            }
              
             
            </tbody>
          </Table>
        </div>
        </div>       
       
    </>
  );
};
export default ProductDetail;
