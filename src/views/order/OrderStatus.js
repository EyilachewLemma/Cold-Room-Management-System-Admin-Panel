import React,{useRef} from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"
import CancelButton from "../../components/CancelButton";
import ReactToPrint from "react-to-print";
import classes from './Orders.module.css'

const OrderStatus = (props) => {
  const componentRef = useRef()
    const products = [1,2,3,4,5]
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
        <Modal.Body className={classes.modalBg}>
        <div className="px-4 py-3" ref={componentRef}>
          <div className="fw-bold px-3">Order Status</div>
          <div className="fw-bold px-3 pt-3">Order id: #1232123</div>
          <div className=" fw-bold mt-3 px-3">Order Status : Completed</div>
          <div className="d-flex align-items-center px-3 pt-2">              
            <div className="me-5 onPrintDnone">
            <Form.Select aria-label="Default select example">
            <option value='0'>Change order Status</option>
            <option value="1">Completed</option>
            <option value="2">pending</option>
          </Form.Select>
            </div>
            <div className="ms-auto">
            <ReactToPrint
            trigger={()=><Button variant='none' className="exportbtn onPrintDnone py-1"><span><i className="fas fa-file-export"></i></span> Export</Button>}
            content={()=>componentRef.current}       
            documentTitle='new document'
            pageStyle='print'
            />
           </div>
          </div>
          <div className={`${classes.borderTop} mt-4 border rounded-3 bg-white`}>
          <div className="p-4">Order Status Change History</div>
          <Table responsive="md">
            <thead className=''>
              <tr>
                <th>Changed Date</th>
                <th>Changed From</th>
                <th>Changed To</th>
                <th>Changed By</th>
                
              </tr>
            </thead>
            <tbody>
            {
              products.map((product,index) =>(
                <tr className={classes.tdPadding} key={index}>
                <td className='py-3'>11-02-2022</td>
                <td className="p-2">pending</td>
                <td className="p-2">Completed</td>
                <td className="p-2">Walelign Gebiru</td>
                
              </tr>
              ))
            }
              
             
            </tbody>
          </Table>
        </div>
       <div className="onPrintDnone">
       <div className='d-flex justify-content-end mt-3'>
       <CancelButton title='Close' onClose={closeModalHandler} />
       </div>
       </div>
        </div>
        </Modal.Body>       
       
      </Modal>
    </>
  );
};
export default OrderStatus;
