import React from "react";
import Modal from "react-bootstrap/Modal";
import ExportBtn from "../../components/ExportBtn";
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import CancelButton from "../../components/CancelButton";
import classes from './ProductDetail.module.css'

const ProductDetail = (props) => {
    const products = [1,2,3,4,5,6,7,8,9,10,11]
  const closeModalHandler = () => {
    props.onClose();
  };
  return (
    <>
      <Modal
        show={props.show}
        size="xl"
        onHide={closeModalHandler}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <h6 className="fw-bold px-3 pt-3">Product Stock Listing</h6>
          <div className="d-flex justify-content-between px-3 pt-2">
            <div>
              <div className="mt-3">
                <span className="fw-bold">Product</span>: Avocado
              </div>
              <div className="mt-3">
                <span className="fw-bold">Total product in stock(kg)</span>: 100
              </div>
            </div>
            <div className="me-5">
              <div className="mt-3">
                <span className="fw-bold">Cold room name</span>: Bahir Dar
              </div>
              <div className="mt-3">
                <span className="fw-bold">Date</span>: 10-31-2022
              </div>
            </div>
          </div>
          <div className="d-flex px-3 mt-4 align-items-center">
          <div className="me-3">
          <div className="ms-2 py-2">Filter By product type</div>
          <Form.Select aria-label="Default select example">
          <option value='all'>All</option>
          <option value="1">type 1</option>
          <option value="2">type 2</option>
          <option value="3">type 3</option>
        </Form.Select>
          </div>
        <div className="ms-5 mt-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Filter by Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
        </div>
           <div className="ms-auto mt-4">
           <ExportBtn />
           </div>
          </div>
          <div className={`${classes.borderTop} mt-4`}>
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
                <td className='py-3'>#232</td>
                <td className="p-2">Type 1</td>
                <td className="p-2 text-center">tefera kassie</td>
                <td className="p-2">10-31-1011</td>
                <td className="p-2 text-center">2000</td>
                <td className="p-2 text-center">1000</td>            
                <td className="p-2 text-center">1000</td>
                <td className="p-2 text-center">Tewodross Hayile</td>
              </tr>
              ))
            }
              
             
            </tbody>
          </Table>
        </div>
        <di className='d-flex justify-content-end'>
        <CancelButton title='Close' onClose={closeModalHandler} />
        </di>
        </Modal.Body>       
       
      </Modal>
    </>
  );
};
export default ProductDetail;
