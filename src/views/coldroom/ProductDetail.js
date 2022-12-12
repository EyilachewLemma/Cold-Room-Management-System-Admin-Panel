import React,{useRef,useEffect,useState} from "react";
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import ReactToPrint from "react-to-print";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { crProAction } from "../../store/slices/ColdRoomProductDetailSlice";
import Pagination from 'react-bootstrap/Pagination';
import apiClient from "../../url/index";
import classes from './ProductDetail.module.css'

const ProductDetail = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const componentRef = useRef()
  const searchBy =useRef()
    const {crId,proId,amount} = useParams()
    const dispatch = useDispatch()
    const products = useSelector(state=>state.crProDetail.products)
    const navigate = useNavigate()



    const featchColdRoomProductDetails = async() =>{
      dispatch(isLoadingAction.setIsLoading(true))
      try{
       var response = await apiClient.get(`admin/coldroom-products/product/${proId}?coldRoomId=${crId}&search=${searchBy.current.value}&date=${''}&page=${currentPage}`)
       if(response.status === 200){
        dispatch(crProAction.setProducts(response.data))
       }
      }
      catch(err){}
      finally {dispatch(isLoadingAction.setIsLoading(false))}
    }
    useEffect(()=>{
      featchColdRoomProductDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPage])
    const searchByByHandler = async () =>{
      dispatch(isLoadingAction.setIsLoading(true))
      try{
       var response = await apiClient.get(`admin/coldroom-products/product/${proId}?coldRoomId=${crId}&search=${searchBy.current.value}&date=${''}`)
       if(response.status === 200){
        dispatch(crProAction.setProducts(response.data))
       }
      }
      catch(err){}
      finally {dispatch(isLoadingAction.setIsLoading(false))}
      setCurrentPage(1)
    }
    const filterByDateHandler = async(e) =>{
      dispatch(isLoadingAction.setIsLoading(true))
      try{
       const response = await apiClient.get(`admin/coldroom-products/product/${proId}?coldRoomId=${crId}&search=${searchBy.current.value}&date=${e.target.value}&page=${1}`)
       if(response.status === 200){
        dispatch(crProAction.setProducts(response.data))
       }
      }
      catch(err){}
      finally {dispatch(isLoadingAction.setIsLoading(false))}
      setCurrentPage(1)
    }
    const setPage = (nomber) =>{
      setCurrentPage(nomber)
    }
    const setNextPage = () =>{
      setCurrentPage(prevValue=>prevValue+1)
    }
    const setPrevPage = ()=>{
      setCurrentPage(prevValue=>prevValue - 1)
    }
    const enterKeyHandler = (event) =>{
      if(event.key === 'Enter' || !event.target.value){
        searchByByHandler()
      }
    }
    const searchHandler = () =>{
      searchByByHandler()
    }
  return (
    <>
      
        <div ref={componentRef}>
        <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
          <h6 className="fw-bold px-3 pt-3">Product Stock Listing</h6>
            {
              products.data_name?.length?(
                <div className="d-flex justify-content-between px-3 pt-2">
                <div>
              <div className="mt-3">
                <span className="fw-bold">Product</span>: {products?.data_name[0]?.product?.name}
              </div>
              <div className="mt-3">
                <span className="fw-bold">Current Amount in stock(kg)</span>: {amount}
              </div>
            </div>
              <div className="mt-3 me-5">
                <span className="fw-bold">Cold room name</span>: {products?.data_name[0]?.coldRoom?.name}
              </div>
            </div>
              ):""
            }
         
          <div className="d-flex px-3 mt-4">
          <div className="w-50 me-3 onPrintDnone">
          <InputGroup className="mb-3 w-100 border rounded onPrintDnone">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="farmer name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={searchBy}
            onKeyUp={enterKeyHandler}
          />
        </InputGroup>
          </div>
        <div className="ms-auto me-4 onPrintDnone">
        <Form.Group controlId="filterbydate">
        <Form.Control
         type="date"
         onChange={filterByDateHandler}
         />
      </Form.Group>
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
              products.data_name?.map((product,index) =>(
                <tr className={classes.tdPadding} key={index}>
                <td className='py-3'>{product.warehousePosition}</td>
                <td className="p-2">{product.productType?.title}</td>
                <td className="p-2 text-center">{product.farmer.fName+' '+product.farmer.lName}</td>
                <td className="p-2">{product.createdAt.slice(0,10)}</td>
                <td className="p-2 text-center">{product.oldQuantity}</td>
                <td className="p-2 text-center">{product.soldQuantity}</td>            
                <td className="p-2 text-center">{product.currentQuantity}</td>
                <td className="p-2 text-center">{product.addedBy}</td>
              </tr>
              ))
            }
              
             
            </tbody>
          </Table>
          <div className="d-flex justify-content-end mt-5">
          <Pagination>
          <Pagination.Prev onClick={setPrevPage} disabled={currentPage === 1} active={currentPage> 1}/>
          <Pagination.Item onClick={()=>setPage(1)} >{1}</Pagination.Item>
          <Pagination.Item disabled>{currentPage+'/'+products.totalPages}</Pagination.Item>
          <Pagination.Item onClick={()=>setPage(products.totalPages)}>{products.totalPages}</Pagination.Item>
          <Pagination.Next onClick={setNextPage} disabled={products.totalPages === currentPage} active={currentPage<products.totalPages}/>
        </Pagination>
          </div>
        </div>
        </div>       
       
    </>
  );
};
export default ProductDetail;
