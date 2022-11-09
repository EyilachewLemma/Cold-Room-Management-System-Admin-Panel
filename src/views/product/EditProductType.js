import React, { useState,useEffect,useRef } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { productDetailAction } from "../../store/slices/ProductDetailSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import fileApiClient from "../../url/fileApiClient";
import classes from "./AddProduct.module.css";

const EditProductType = (props) => {
  const[type,setType] = useState({description:'',typeTitle:'',image:''})
  const[errors,setErrors] = useState({image:'',typeTitle:''})
  const dispatch = useDispatch();
  const imgInput = useRef()
 useEffect(()=>{
  setType(props.product)
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])
 const newTypeTitleHandler = (e)=> {
  setType(previousValue =>{
      return  {...previousValue,typeTitle:e.target.value}
  })   
  setErrors(prevErros=>{
    return {...prevErros,typeTitle:''}
  })
}
const descriptionChangeHandler = (e) =>{
  setType(previousValue =>{
    return  {...previousValue,description:e.target.value}
})
  if(e.target.value){
    setErrors(preValue=>{
      return {...preValue,description:''}
    })
  }
}
const imageInputHandler = (e) =>{
  setType(previousValue =>{
      return  {...previousValue,image:e.target.files[0]}
  })
  setErrors(prevErros=>{
    return {...prevErros,image:''}
  })

 } 
  const handleClose = () => {
    props.onClose(false);
  };
  const editProductHandler = async () => {
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
        formData.append(`title`,type.typeTitle)
        formData.append(`description`,type.description)
        formData.append(`image`,type.image)     
      console.log('formdata=',formData.getAll('image[]'))
      try {
        let response = await fileApiClient.post("admin/products", formData);
        if (response.status === 200) {
          console.log("create Cold room response =", response);
          dispatch(productDetailAction.editProductType({id:'',type:response.data}));
          console.log("product is added successfullu");
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
  };

  return (
    <>
      <Modal
        size={"lg"}
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5">
            <div className="mt-5 mb-2">Add Product Type</div>
            <div className='border rounded shadow-sm p-3'>
            <Form.Group className="mb-3" controlId='ProductType'>
            <Form.Label>Product Type Title</Form.Label>
              <Form.Control
                className={errors.typeTitle?classes.errorBorder:''}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={newTypeTitleHandler}
                value={type.typeTitle}
              />
              {errors.typeTitle && (<span className={classes.errorText}>{errors.typeTitle}</span> )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Type Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={descriptionChangeHandler}
                value={type.description}
                className={errors.description?classes.errorBorder:''}
              />
              {errors.description && (<span className={classes.errorText}>{errors.description}</span>)} 
            </Form.Group>
              <div className='d-flex mt-3 justify-content-between'> 
              <Form.Group className="mb-3" controlId="productTypeImage">
              <Form.Label>Apload product Type Image</Form.Label>
              <Form.Control
               type="file" accept="image/*"
               ref={imgInput}
                onChange={imageInputHandler}
                className={errors.image?classes.errorBorder:''} />
                
              {errors.image && (<span className={classes.errorText}>{errors.image}</span>)}    
            </Form.Group>              
              </div>
            </div> 
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save change"} onSave={editProductHandler} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductType
