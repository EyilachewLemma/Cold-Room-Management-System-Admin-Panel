
import { Fragment,useRef,useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import {useNavigate,useParams} from 'react-router-dom'
import ReactToPrint from "react-to-print";
import { useDispatch,useSelector } from "react-redux";
import { coldRoomProductAction } from "../../store/slices/ColdroomProductSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import apiClient from "../../url/index";
import classes from "../../views/product/Products.module.css";


const ColdRoomProducts = () => {
    const navigate = useNavigate()
    const componentRef = useRef()
    const {crId} = useParams()
    const dispatch =useDispatch()
    const products = useSelector(state=>state.coldroomProduct.products)
    const searchBy =useRef()
  const featchColdRoomProducts = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
    try{
     var response = await apiClient.get(`admin/coldroom-products/${crId}?search=${searchBy.current.value}`)
     if(response.status === 200){
      dispatch(coldRoomProductAction.setProducts(response.data || []))
     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))}
  }
  useEffect(()=>{
    featchColdRoomProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const viewProductDetail = (productId,amount) =>{
    navigate(`/cold-rooms/${crId}/product/${productId}/prduct-detail/${amount}`)
  }
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchColdRoomProducts()
    }
  }
  const searchHandler = () =>{
    featchColdRoomProducts()
  }
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>  
      <h6 className="fw-bold">Product Listing in cold room</h6>
        <div className="mt-3"><span className="fw-bold">Cold Room</span>: {products[0]?.coldRoom?.name}</div>
        <div className="mt-3"><span className="fw-bold">Date</span>: null</div>
      <div className={`${classes.bottomBorder} mt-3`}></div>
      <div className="d-flex justify-content-between mt-4">
        <InputGroup className="mb-3 w-50 border rounded onPrintDnone">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={searchBy}
            onKeyUp={enterKeyHandler}
          />
        </InputGroup>
          <div>
          <ReactToPrint
          trigger={()=><Button variant='none' className="exportbtn py-1 onPrintDnone"><span><i className="fas fa-file-export"></i></span> Export</Button>}
          content={()=>componentRef.current}       
          documentTitle='new document'
          pageStyle='print'
          />
        </div>
      </div>
      {products.length && (
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Amount(kg)</th>
              <th className="sr-only">action</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr key={product.productId}>
              <td className="p-4">{index+1}</td>
              <td className="p-4">{product.product?.name}</td>
              <td className="p-2">
                <img src={product.product.imageUrl} alt="product_image" className={`${classes.img} img-fluid`} />
              </td>
              <td className="p-4">{product.totalProduct}</td>
              <td className="p-4 onPrintDnone">
             <Button className={classes.borderedBtn} variant="none" onClick={()=>viewProductDetail(product.productId,product.totalProduct)}>View Detail</Button>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      )}
      {
        !products.length && (
          <div className="text-center mt-5">
          Empty data
          </div>
        )
      }
      </div>
    </Fragment>
  );
};
export default ColdRoomProducts
