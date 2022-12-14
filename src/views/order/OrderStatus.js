import React,{useRef} from "react";
import Modal from "react-bootstrap/Modal";
// import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button"
import ReactToPrint from "react-to-print";
import classes from './Orders.module.css'

const OrderStatus = (props) => {
  const componentRef = useRef()
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
      <Modal.Header closeButton className={classes.modalBg}>
          <Modal.Title >Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.modalBg}>
        <div className="px-4 pb-3" ref={componentRef}>
          <div className="fw-bold px-3">Order id: {props.order.orderCode}</div>
          <div className=" fw-bold mt-3 px-3">Order Status : {props.order.orderStatus}</div>
          <div className="d-flex align-items-center px-3 pt-2">              
            {
          //     <div className="me-5 onPrintDnone">
          //   <Form.Select aria-label="Default select example">
          //   <option value='0'>Change order Status</option>
          //   <option value="1">Completed</option>
          //   <option value="2">pending</option>
          // </Form.Select>
          //   </div>
          }
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
          {props.order.orderLogs?.length > 0 &&(
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
              props.order.orderLogs?.map((order) =>(
                <tr className={classes.tdPadding} key={order.id}>
                <td className='py-3'>{order.updatedAt.slice(0,10)}</td>
                <td className="p-2">{order.changedFrom}</td>
                <td className="p-2">{order.changedTo}</td>
                <td className="p-2">{order.changedBy}</td>
                
              </tr>
              ))
            }
              
             
            </tbody>
          </Table>
          )}
          {props.order.orderLogs?.length === 0 &&(
            <div className="mt-5 text-center">No order histry found</div>
          )}
        </div>
       
        </div>
        </Modal.Body>       
       
      </Modal>
    </>
  );
};
export default OrderStatus;
