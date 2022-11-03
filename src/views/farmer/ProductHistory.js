import { Fragment,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import ExportBtn from "../../components/ExportBtn";
import Button from 'react-bootstrap/Button';
import apiClient from "../../url/index";
import { useNavigate } from "react-router-dom";
import classes from "./Farmers.module.css";


const ProductHistory = () => {

  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const coldRooms = useSelector(state =>state.coldroom)
  const navigate = useNavigate()
  useEffect( ()=>{
    async function  featchOrder(){
      // dispatch(isLoadingAction.setIsLoading(true))
    try{
     var response = await apiClient.get('api/cold_rooms')
     if(response.status === 200){
      dispatch(coldRoomAction.setColdRooms(response.data || []))
     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))}
  }
  featchOrder()
  },[dispatch])

  console.log('coldrooms from',coldRooms)
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div className="fw-bold">Farmers Product History</div>
    <div className="d-flex align-items-center">
    <div>
      <div className="mt-3">
        <span className="fw-bold">Farmer</span>: Demeke Gelaw
      </div>
      <div className="mt-3">
        <span className="fw-bold">Total Product Instock</span>: 2000Kg
      </div>
    </div>
    <div className="ms-5 ps-5"><span className="fw-bold">Date</span>: 10-02-2022</div>  
   
  </div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex justify-content-between mt-3 p-2`}>
        <InputGroup className="w-50 border rounded">
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
        <div className="ms-3">
        <Form.Select aria-label="Default select example">
        <option value='all'>All</option>
        <option value="1">Type 1</option>
        <option value="2">Type 2</option>
        <option value="3">Type 3</option>
      </Form.Select>
        </div>
      <div className="ms-3 me-3">
      <Form.Group controlId="search-by-date">
      <Form.Control type="date" />
    </Form.Group>
      </div>
        <div>
          <ExportBtn />
        </div>
      </div>
      
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Product-ID</th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Cold Room</th>
              <th>Added Date(GC)</th>
              <th>Sold Stock(Kg)</th>
              <th>Current Stock(Kg)</th>
              <th>Price Per Kg(ETB)</th>
            </tr>
          </thead>
          <tbody>
          {
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">32</td>
              <td className="p-3">Tomato</td>
              <td className="p-3">Type 1</td>
              <td className="p-3">Dahir Dar</td>
              <td className="p-3">10-02-2022</td>
              <td className="p-3 text-center">100</td>
              <td className="p-3 text-center">1500</td>
            <td className="p-3 text-center">30</td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};
export default ProductHistory;
