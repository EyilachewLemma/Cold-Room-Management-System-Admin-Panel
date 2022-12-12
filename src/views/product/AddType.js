import React, { useState } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { productDetailAction } from "../../store/slices/ProductDetailSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import { useParams } from "react-router-dom";
import NotificationModal from "../../components/Modal";
import fileApiClient from "../../url/fileApiClient";
import classes from "./AddProduct.module.css";

const AddType = (props) => {
  const[type,setType] = useState({title:'',description:'',image:''})
  const[errors,setErrors] = useState({title:'',description:'',image:''})
  const[modalData,setModalData] = useState({show:false,status:null,title:'',message:''})
  const dispatch = useDispatch();
  const {prId} = useParams()

console.log('prId==',prId)
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
  if(!values.image){
      err.image = 'product type image is required'
  }
return err
}
  const addTypeHandler = async () => {
   const error = validate(type)
   setErrors(error)
   if(Object.values(error)?.length === 0){
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
       formData.append('id',prId)
        formData.append(`title`,type.title)
        formData.append(`description`,type.description)
          formData.append(`image`,type.image) 
          
      try {
        let response = await fileApiClient.post(`admin/product-types`, formData);
        if (response.status === 200) {
          dispatch(productDetailAction.addProductType(response.data));
          handleClose()
          setModalData({show:true,status:1,title:'Successful',message:'You added a product type successfully'})
        }
      } catch (err) {
        setModalData({show:true,status:0,title:'Faild',message:'faild to add product type'})
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
        
        
      }
    } 
  };
  const handleClose = () => {
    props.onClose(false);
    setType({})
  };
  const handleModalClose =() =>{
    setModalData({})
  }
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
          <Modal.Title>Add Product Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5">
            <div className='border rounded shadow-sm p-3'>
            <Form.Group className="mb-3" controlId='ProductType'>
            <Form.Label>Product Type Title</Form.Label>
              <Form.Control
                className={errors.title?classes.errorBorder:''}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={newTypeTitleHandler}
                value={type.title || ''}
              />
              {errors.title && (<span className={classes.errorText}>{errors.title}</span> )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Product Type Description</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={descriptionChangeHandler}
                value={type.description || ''}
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
      <NotificationModal modal={modalData} onClose={handleModalClose} />
    </>
  );
};

export default AddType
