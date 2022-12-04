import React,{useRef} from "react";
import Modal from "react-bootstrap/Modal";
// import Form from 'react-bootstrap/Form';
import Table from "react-bootstrap/Table";
import ReactToPrint from "react-to-print";
import Button from "react-bootstrap/Button";
import classes from './Orders.module.css'

const PaymentStatus = (props) => {
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
      <Modal.Title >Payment Status</Modal.Title>
    </Modal.Header>
        <Modal.Body className={classes.modalBg}>
        <div className="px-4 py-3" ref={componentRef}>
          <div className="fw-bold px-3 pt-3">Order id: {props.order.orderCode}</div>
          <div className=" fw-bold mt-3 px-3">Payment Status : {props.order.paymentStatus}</div>
          <div className="d-flex align-items-center px-3 pt-2">              
            {
          //     <div className="me-5 onPrintDnone">
          //   <Form.Select aria-label="Default select example">
          //   <option value='0'>Change Payment Status</option>
          //   <option value="1">Unpaid</option>
          //   <option value="2">Partially Paid</option>
          //   <option value="2">Fully Paid</option>
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
          <div className="p-4">Payment Status Change History</div>
          {props.order.orderPaymentLogs?.length > 0 &&(
          <Table responsive="md">
            <thead className=''>
              <tr>
              <th>NO</th>
                <th>Paid Date</th>
                <th>Paid Amount</th>
                <th>Payment Added Body</th>
                
              </tr>
            </thead>
            <tbody>
            {
              props.order.orderPaymentLogs?.map((log,index) =>(
                <tr className={classes.tdPadding} key={log.id}>
                <td className="p-2">{index+1}</td>
                <td className='py-3'>{log.updatedAt.slice(0,10)}</td>
                <td className="p-2">{log.paidAmount}</td>
                <td className="p-2">{log.changedBy}</td>
                
              </tr>
              ))
            }
              
             
            </tbody>
          </Table>
          )}
          {
            props.order.orderPaymentLogs?.length === 0 &&(
              <div className="mt-5 text-center">No payment Status history found</div>
            )
          }
        </div>
        <div className="onPrintDnone">
        </div>
        </div>
        </Modal.Body>       
       
      </Modal>
    </>
  );
};
export default PaymentStatus;
