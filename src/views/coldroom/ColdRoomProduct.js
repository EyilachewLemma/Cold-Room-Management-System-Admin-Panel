
import { Fragment,useState,useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Avocado from '../../assetes/avocado.jpg'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import ProductDetail from "./ProductDetail";
import ReactToPrint from "react-to-print";
import classes from "../../views/product/Products.module.css";


const ColdRoomProducts = () => {
  const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const componentRef = useRef()
  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const openModalHandler = () =>{
    setShow(true)
  }
  const closeModalHandler = () =>{
    setShow(false)
  }
  return (
    <Fragment>
    <Button onClick={()=>navigate(-1)} variant='none' className={`${classes.boxShadow} fs-3 fw-bold`}><i className="fas fa-arrow-left"></i></Button> 
    <div ref={componentRef}>  
      <h6 className="fw-bold">Product Listing in cold room</h6>
        <div className="mt-3"><span className="fw-bold">Cold Room</span>: Bahir Dar</div>
        <div className="mt-3"><span className="fw-bold">Date</span>: 10-31-2022</div>
      <div className={`${classes.bottomBorder} mt-3`}></div>
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
              <th>Amount(kg)</th>
              <th>Product post sale price(ETB)</th>
              <th>Product rent fee(kg)</th>
              <th className="sr-only">action</th>
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
              <td className="p-4 text-center">500</td>
              <td className="p-4 text-center">3 ETB</td>
              <td className="p-4 onPrintDnone">
             <Button className={classes.borderedBtn} variant="none" onClick={openModalHandler}>View Detail</Button>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <ProductDetail show={show} onClose={closeModalHandler} />
      </div>
    </Fragment>
  );
};
export default ColdRoomProducts
