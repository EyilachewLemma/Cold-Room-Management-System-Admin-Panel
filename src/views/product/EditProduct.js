import React, { useState,useEffect } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/slices/productSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import fileApiClient from "../../url/fileApiClient";
import classes from "./AddProduct.module.css";

const EditProduct = (props) => {
  const [product, setproduct] = useState({title:'',image:null,newImage:null});
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const {name} = props.product
   useEffect(()=>{
    setproduct({
      title:props.product.name,
      image:props.product.imageUrl,
      newImage:''
    })
    console.log('passed product=',props.product)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[name])
  const titleChangeHandler = (e) => {
    setproduct(previousValues=>{
      return {...previousValues,title:e.target.value}
    });
    if (e.target.value) {
      setError('')
    }
  };
  const PrImageInputHandler = (e) => {
    setproduct(prevValues=>{
      return {...prevValues,newImage:e.target.files[0]}
    })
    
  };

  const validate = (title) => {
    let err = '' 
    if (!title?.trim()) {
      err = "product title is required";
    }
    return err;
  };
  const handleClose = () => {
    props.onClose();
  };
  const editProductHandler = async () => {
    let errorValue = validate(product.title);
    setError(errorValue)
    if (!errorValue) {
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
      formData.append('name',product.title)
      if(product.newImage){
        formData.append('image',product.newImage)   
      }       
      try {
        let response = await fileApiClient.put(`admin/products/${props.product.id}`, formData);
        if (response.status === 200) {
          const editedProduct = {
            id:response.data.id,
            name:response.data.name,
            imageUrl:response.data.imageUrl,
            totalProduct:response.data.totalProduct
          }
          dispatch(productAction.editProduct(editedProduct));
          handleClose()
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
       
      }
  };
}

  return (
    <>
      <Modal
        size='lg'
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
            <Form.Group className="mb-3" controlId="product">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex. Avocado"
                onChange={titleChangeHandler}
                value={product.title}
                className={error?classes.errorBorder : ""}
              />
              {error && (
                <span className={classes.errorText}>{error}</span>
              )}
            </Form.Group>
            <div className="d-flex align-items-center">
              <Form.Group
                className="mb-3 align-self-center flex-fill"
                controlId="productImage"
              >
                <Form.Label>Apload product type Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={PrImageInputHandler}
                />
              </Form.Group>              
                <div className="ms-5">
                 {product.newImage && (
                  <img src={URL.createObjectURL(product.newImage)} alt="selected_product_image"
                   className={`${classes.selectedImg} img-fluid`}/>
                 )
                  
                 }
                   {
                    !product.newImage &&(
                      <img src={product.image} alt="selected_product_image" className={`${classes.selectedImg} img-fluid`}/>
                    )
                } 
                </div>
              
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save Change"} onSave={editProductHandler} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(EditProduct)
