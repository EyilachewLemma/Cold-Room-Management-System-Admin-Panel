import { useState,useCallback,useRef,useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ReactToPrint from "react-to-print";
import { useSelector,useDispatch } from "react-redux";
import {productAction} from '../../store/slices/productSlice'
import { isLoadingAction } from "../../store/slices/spinerSlice";
import apiClient from "../../url/index";
import { useNavigate } from "react-router-dom";
import classes from "./Products.module.css";

const ProductList = () => {
  const [togleModal,setTogleModal] = useState(false)
  const [show,setShow] = useState(false)
  const componentRef = useRef()
  const searchBy = useRef()
 const products = useSelector(state=>state.product.products)
  const dispatch = useDispatch()
 const navigate = useNavigate()


  const featchProducts = async ()=>{
    dispatch(isLoadingAction.setIsLoading(false))
  try{
   var response = await apiClient.get(`admin/products?search=${searchBy.current.value}`)
   if(response.status === 200){
    console.log('products=..',response.data)
    dispatch(productAction.setProducts(response.data))
   
   }
  }
  catch(err){
    console.log(err)
  }
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
   useEffect(()=>{   
  featchProducts()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
   const handelAddProduct = () =>{
    setTogleModal(true)
    
   }
  const closeAddandEditModalHandler = useCallback(() =>{
     setTogleModal(false)
  },[])
 
  const ViewDetailHandler = (prId) =>{
    navigate(`/products/${prId}/detail`)
  }
  const editProduct = (id) =>{
    setShow(true)
  }
  const closeEditModal = ()=>{
    setShow(false)
  }
  const deleteProductHandler = async (id) =>{
    try{
      var response = await apiClient.delete(`admin/products/${id}`)
      if(response.status === 200){
       dispatch(productAction.deleteProduct(id))
      }
     }
     catch(err){
       console.log(err)
     }
     finally {dispatch(isLoadingAction.setIsLoading(false))}
   }
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchProducts()
    }
  }
  const searchHandler = () =>{
    featchProducts()
  }
  return (
    <div ref={componentRef}>
      <h5 className="text-bold">Product List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the products section you can review and manage all products with
        their detail.You can view and edit many information such as product
        title, product description, product stock, product SKU, product price
        and product Status. You can also add new product and delete product
      </p>
      <div className={classes.bottomBorder}>
       
      </div>
      <div className="d-flex justify-content-between mt-4">
        <InputGroup className="mb-3 w-50 border rounded onPrintDnone">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search by product name"
            aria-label="productName"
            aria-describedby="basic-addon1"
            ref={searchBy}
            onKeyUp={enterKeyHandler}
          />
        </InputGroup>
        <div className="ms-auto me-5 onPrintDnone">
        <Button className={classes.btn} onClick={handelAddProduct}>Add Product</Button>
        </div>
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
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
              <th>NO</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Amount(KG)</th>
              <th className="onPrintDnone"></th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr key={product.id}>
              <td className="p-4">{index +1}</td>
              <td className="p-4">{product.name}</td>
              <td className="p-2">
                <img src={product.imgeUrl} alt="Avocado_image" className={`${classes.img} img-fluid`} />
              </td>
              <td className="p-4">{product.totalProduct}</td>
              <td className={`onPrintDnone`}>
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>ViewDetailHandler(product.id)}>Products Detail</Button>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>editProduct(product.id)}>Edit Product</Button>
      <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>deleteProductHandler(product.id)}>Delete Product</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <AddProduct show={togleModal} onClose={closeAddandEditModalHandler} title='Add Product'></AddProduct>
      <EditProduct show={show} onClose={closeEditModal} />
    </div>
  );
};
export default ProductList;