import React, { useState } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { productDetailAction } from "../../store/slices/ProductDetailSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import fileApiClient from "../../url/fileApiClient";
import classes from "./AddProduct.module.css";

const AddType = (props) => {
  const[type,setType] = useState({title:'',description:'',image:''})
  const[errors,setErrors] = useState({title:'',description:'',image:''})
  const dispatch = useDispatch();


 const newTypeTitleHandler = (e)=> {
  setType(previousValue =>{
      return  {...previousValue,title:e.target.value}
  })   
  if(e.target.value){
    setErrors(prevErros=>{
      return {...prevErros,title:''}
    })
  }
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
 const validate =(values) =>{
  const err = {}
  if(!values.title.trim()){
      err.title = 'product type title is required'
  }
  if(!values.description){
      err.description = 'product type description is required'
  }
  if(!values){
      err.image = 'product type image is required'
  }
return err
}
  const addTypeHandler = async () => {
   const error = validate(type)
   setErrors(error)
   if(!error){
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
        formData.append(`title`,type.typeTitle)
        formData.append(`description`,type.description)
        if(type.newImage){
          formData.append(`image`,type.newImage) 
        }    
      try {
        let response = await fileApiClient.post("admin/products", formData);
        if (response.status === 200) {
          dispatch(productDetailAction.editProductType({id:'',type:response.data}));
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
        handleClose()
        
      }
    }
  };
  const handleClose = () => {
    props.onClose(false);
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
                className={errors.title?classes.errorBorder:''}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={newTypeTitleHandler}
                value={type.title}
              />
              {errors.title && (<span className={classes.errorText}>{errors.title}</span> )}
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
              <Form.Group className="mb-3 align-self-center" controlId="productTypeImage">
              <Form.Label>product Type Image</Form.Label>
              <Form.Control
               type="file" accept="image/*"
                onChange={imageInputHandler}
                className={errors.image?classes.errorBorder:''} />
                
              {errors.image && (<span className={classes.errorText}>{errors.image}</span>)}    
            </Form.Group> 
            <div className="mt-4 ms-4">
            { type.image?<img src ={URL.createObjectURL(type.image)} alt='new_image' className={classes.selectedImg} />:''
            }
            </div>
            
                       
              </div>
            </div> 
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save change"} onSave={addTypeHandler} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddType
