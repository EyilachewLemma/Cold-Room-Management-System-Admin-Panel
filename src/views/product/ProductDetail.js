import { useState,useRef,useEffect } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ReactToPrint from "react-to-print";
import { useSelector,useDispatch } from "react-redux";
import {productDetailAction} from '../../store/slices/ProductDetailSlice'
import { isLoadingAction } from "../../store/slices/spinerSlice";
import apiClient from "../../url/index";
import EditProductType from './EditProductType'
import { useParams } from "react-router-dom";

import classes from "./Products.module.css";


const ProductList = () => {
  const [show,setShow] = useState(false)
  const [product,setProduct] = useState({})
  const componentRef = useRef()
 const products = useSelector(state=>state.productDetail.productTypes)
  const dispatch = useDispatch()
  const productlist = [1,2,4,5,6,7]
  const {prId} = useParams()

console.log(products)
  const featchProductDetails = async ()=>{
    dispatch(isLoadingAction.setIsLoading(false))
  try{
   var response = await apiClient.get(`admin/products/${prId}`)
   if(response.status === 200){
    console.log('product types=..',response.data)
    dispatch(productDetailAction.setProductTypes(response.data))
   
   }
  }
  catch(err){
    console.log(err)
  }
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
   useEffect(()=>{   
    featchProductDetails()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
  const deleteProductTypeHandler = async (id) =>{
    try{
      var response = await apiClient.delete(`admin/products/${id}`)
      if(response.status === 200){
       dispatch(productDetailAction.deleteProduct(id))
      }
     }
     catch(err){
       console.log(err)
     }
     finally {dispatch(isLoadingAction.setIsLoading(false))}
   }
  const editProductTypeHandler = (product) =>{
    setProduct(product)
    setShow(true)
  }
  const closeModalHandler = () =>{
    setShow(false)
  }
 
  return (
    <div ref={componentRef}>
      <h5 className="text-bold">Product Details</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the product Details section you can review and manage  product with
        their type.You can view and edit product information, you can edit product types information, you can delete Product types
        </p>
      <div className={classes.bottomBorder}>
       
      </div>
      <div className="d-flex justify-content-end mt-4">
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
          
        </div>
      </div>
      <div className="mt-3">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Product Type</th>
              <th>Product Type Description</th>
              <th>Product Type Image</th>
              <th className="onPrintDnone"></th>
            </tr>
          </thead>
          <tbody>
          {
            productlist.map((product,index) =>(
              <tr key={index}>
              <td className="p-4">{index}</td>
              <td className="p-4">Avocado</td>
              <td className="p-2">
              TopQuality
              </td>
              <td className="p-4">Image</td>
              <td className={`onPrintDnone`}>
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>editProductTypeHandler(product)}>Edit Product Type</Button>
      <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>deleteProductTypeHandler(product.id)}>Delete Product Type</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <EditProductType show={show} onClose={closeModalHandler} product={product} />
    </div>
  );
};
export default ProductList;
