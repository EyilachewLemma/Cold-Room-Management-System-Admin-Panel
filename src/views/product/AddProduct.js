import React, { useState } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddProductType from "./AddProductType";
import AddedProductTypes from "./AddedProductTypes";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/slices/productSlice";
import buttonSpinerAction from '../../store/slices/ButtonSpinerSlice'
import apiClient from "../../url/index";
import classes from './AddProduct.module.css'

const AddProduct = (props) => {
  const [productTypes, setProductTypes] = useState([]);
  const [productTitle,setProductTitle] = useState('')
  const [prImage,setprImage] = useState('')
  const [errors,setErrors] = useState({prTitle:'',prImage:''})
  const dispatch = useDispatch()


  const titleChangeHandler = (e) =>{
    setProductTitle(e.target.value)
    if(e.target.value){
      setErrors(preValue=>{
        return {...preValue,prTitle:''}
      })
    }
  }
 const PrImageInputHandler = (e) =>{
           setprImage(e.target.files[0])
           if(e.target.files[0]){
            setErrors(preValue=>{
              return {...preValue,prImage:''}
            })
          }
 }
 
  const validate = (values) =>{
let errors = {}
if(!values.prTitle.trim()){
  errors.prTitle = 'product title is required'
}
if(values.prTitle.trim().length > 30){
  errors.prTitle = 'product title must be lessthan 30 letters'
}
if(!values.prImage){
  errors.prImage = 'product image is required'
}
setErrors(errors)
 return errors
  }
  const addProductTypeHandler = (item) => {
    setProductTypes((previousTypes) => [...previousTypes, item]);
  };
  console.log("added productTypes =", productTypes);
  const removeProductItem = (index) => {
    const remainingType = [...productTypes]
    remainingType.splice(index, 1)
    setProductTypes(remainingType);
    console.log('remainig type=',remainingType)
    console.log('index=',index)
  };
  const handleClose = () => {
    props.closeModal(false);
  };
  const addProductHandler = async () => {
   const error = validate({prTitle:productTitle,prImage:prImage})
    if(!error){
      dispatch(buttonSpinerAction.setButtonSpiner(true)) 
      let formData = new FormData()
      console.log('add product is clicked')
      try{
        let response = await apiClient.post('admin/coldRooms',formData)
        if(response.status === 200){
          console.log('create Cold room response =',response)
          dispatch(productAction.addProduct(response))
          console.log('cold room is created successfullu')
        }
      }
        catch(err){
          console.log('err',err)
        }
        finally {
          dispatch(buttonSpinerAction.setButtonSpiner(false))
        }
    }
   
  };
  
 
  return (
    <>
      <Modal
        size={"lg"}
        show={props.isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5">
            <Form.Group className="mb-3" controlId="productTitle">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
               type="text"
               placeholder="Ex. Avocado"
               onChange={titleChangeHandler}
               value={productTitle}
               className={errors.prTitle?classes.errorBorder:''}
                />
                {errors.prTitle && (<span className={classes.errorText}>{errors.prTitle}</span>)} 
            </Form.Group>
           <div className="d-flex align-items-center">
           <Form.Group className="mb-3 align-self-center flex-fill" controlId="productImage">
           <Form.Label>Apload product Image</Form.Label>
           <Form.Control
            type="file" accept="image/*"
             onChange={PrImageInputHandler}
             className={errors.prImage?classes.errorBorder:''} />
             
           {errors.prImage && (<span className={classes.errorText}>{errors.prImage}</span>)}    
         </Form.Group>  
          {prImage && (
            <div className="ms-5">
            <img src={URL.createObjectURL(prImage)} alt="selected_product_image" className={`${classes.selectedImg} img-fluid`} />
            </div> 
          )
          }
           </div>
          
            <div className="mt-5 mb-2">Add Product Type</div>
            <AddProductType onAddItem={addProductTypeHandler} />
          </Form>
        </Modal.Body>
        <AddedProductTypes prductTypes={productTypes} onRemoveItem={removeProductItem} />
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save Product"} onSave={addProductHandler} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(AddProduct);
