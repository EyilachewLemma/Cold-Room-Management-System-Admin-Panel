import { useState,useCallback,useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Avocado from '../../assetes/avocado.jpg'
import Button from 'react-bootstrap/Button';
import AddProduct from "./AddProduct";
import ProductDetail from "./ProductDetail";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
import classes from "./Products.module.css";


const Products = () => {
  const [togleModal,setTogleModal] = useState(false)
  const [show,setShow] = useState(false)
  const [modalTitle,setModalTitle] = useState('')
  const [product,setProduct] = useState([])
  const [isPrinting,setIsPrinting] = useState(false)
  const componentRef = useRef()
  useSelector(state=>state.product.products)
  const products = [1,2,3,4,5,6,7,8,9,10,11]
  console.log('isPrinting=',isPrinting)

   const handelAddProduct = () =>{
    setModalTitle('Add Product')
    setTogleModal(true)
    
   }
  const closeAddandEditModalHandler = useCallback(() =>{
     setTogleModal(false)
  },[])
  const closeDetailModalHandler = useCallback(() =>{
    setShow(false)
 },[])
  const ViewDetailHandler = (selectedProduct) =>{
    setShow(true)
    setProduct(selectedProduct)
  }
  const deleteProductHandler = () =>{}
  const editProductHandler = () =>{
    setModalTitle('Edit Product')
    setTogleModal(true)
    
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
            <span>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <div className="ms-auto me-5 onPrintDnone">
        <Button className={classes.btn} onClick={handelAddProduct}>Add Product</Button>
        </div>
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        onBeforeGetContent={()=>setIsPrinting(true)}
        content={()=>componentRef.current}       
        onAfterPrint={()=>setIsPrinting(false)}
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
              <th className={isPrinting?'d-none':''}></th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr key={index}>
              <td className="p-4">1</td>
              <td className="p-4">Avocado</td>
              <td className="p-2">
                <img src={Avocado} alt="Avocado_image" className={`${classes.img} img-fluid`} />
              </td>
              <td className="p-4">1234</td>
              <td className={`onPrintDnone`}>
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>ViewDetailHandler({})}>Products Detail</Button>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={editProductHandler}>Edit Product</Button>
      <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={deleteProductHandler}>Delete Product</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <AddProduct show={togleModal} onClose={closeAddandEditModalHandler} title={modalTitle} product={product}></AddProduct>
      <ProductDetail show={show} onClose={closeDetailModalHandler} />
    </div>
  );
};
export default Products;
