import React from "react";
import SaveButton from "./Button";
import CancelButton from "./CancelButton";
import Modal from "react-bootstrap/Modal";


const ConfirmModal = (props) => {
 const yesHandler = ()=>{
    props.onDelete()
 }
  const handleClose = () => {
    props.onClose(false);
  };
  return (
    <>
      <Modal
        size={"sm"}
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="fs-5">{props.message}</div>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"No"} onClose={handleClose} />
          <SaveButton title={"Yes"} onSave={yesHandler} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmModal
