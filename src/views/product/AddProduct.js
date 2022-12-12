import React, { useState } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddProductType from "./AddProductType";
import AddedProductTypes from "./AddedProductTypes";
import NotificationModal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { productAction } from "../../store/slices/productSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import fileApiClient from "../../url/fileApiClient";
import classes from "./AddProduct.module.css";

const AddProduct = (props) => {
  const [productTypes, setProductTypes] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [prImage, setprImage] = useState("");
  const [errors, setErrors] = useState({ prTitle: "", prImage: "",prType:"" });
  const[modalData,setModalData] = useState({show:false,status:null,title:'',message:''})
  const dispatch = useDispatch();  
  const titleChangeHandler = (e) => {
    setProductTitle(e.target.value);
    if (e.target.value) {
      setErrors((preValue) => {
        return { ...preValue, prTitle: "" };
      });
    }
  };
  const PrImageInputHandler = (e) => {
    setprImage(e.target.files[0]);
    if (e.target.files[0]) {
      setErrors((preValue) => {
        return { ...preValue, prImage: "" };
      });
    }
  };

  const validate = (values) => {
    let errorsValue = {};
    if (!values.prTitle.trim()) {
      errorsValue.prTitle = "product title is required";
    }
    else if (values.prTitle.trim().length > 30) {
      errorsValue.prTitle = "product title must be lessthan 30 letters";
    }
    if (!values.prImage) {
      errorsValue.prImage = "product image is required";
    }
    if(productTypes?.length < 1){
      errorsValue.prType = 'every product must have at least one product type'
    }
    setErrors(errorsValue);
    return errorsValue;
  };
  const addProductTypeHandler = (item) => {
    setProductTypes((previousTypes) => [...previousTypes, item]);
    setErrors((preValue) => {
      return { ...preValue, prType: "" };
    });
  };
  const removeProductItem = (index) => {
    const remainingType = [...productTypes];
    remainingType.splice(index, 1);
    setProductTypes(remainingType);
  };
  const handleClose = () => {
    props.onClose(false);
    dispatch(buttonAction.setBtnSpiner(false));
  };
  const handleModalClose =() =>{
    setModalData({})
    
  }
  const addProductHandler = async () => {
    let errorValue = validate({ prTitle: productTitle, prImage: prImage });
    if (Object.values(errorValue)?.length === 0) {
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
      formData.append('name',productTitle)
      formData.append('product_image',prImage)
      productTypes.forEach((type,index)=>{
        formData.append(`title${index}`,type.typeTitle)
        formData.append(`description${index}`,type.description)
        formData.append(`image${index}`,type.image)
      })
      formData.append('size',productTypes.length)     
      try {
        let response = await fileApiClient.post("admin/products", formData);
        if (response.status === 200) {
          const newProduct ={
            id:response.data.newProduct.id,
            name:response.data.newProduct.name,
            imageUrl:response.data.newProduct.imageUrl,
            totalProduct:0
          }
          dispatch(productAction.addProduct(newProduct));
          handleClose()
          setModalData({show:true,status:1,title:'Successful',message:'You added a product successfully'})
        }
      } catch (err) {
        setModalData({show:true,status:0,title:'Faild',message:'faild to add product'})
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
  };
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
          <Modal.Title>{props.title}</Modal.Title>
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
                className={errors.prTitle ? classes.errorBorder : ""}
              />
              {errors.prTitle && (
                <span className={classes.errorText}>{errors.prTitle}</span>
              )}
            </Form.Group>
            <div className="d-flex align-items-center">
              <Form.Group
                className="mb-3 align-self-center flex-fill"
                controlId="productImage"
              >
                <Form.Label>Apload product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={PrImageInputHandler}
                  className={errors.prImage ? classes.errorBorder : ""}
                />

                {errors.prImage && (
                  <span className={classes.errorText}>{errors.prImage}</span>
                )}
              </Form.Group>
              {prImage && (
                <div className="ms-5">
                  <img
                    src={URL.createObjectURL(prImage)}
                    alt="selected_product_image"
                    className={`${classes.selectedImg} img-fluid`}
                  />
                </div>
              )}
            </div>
              <div className={`${classes.errorText} text-center my-3`}>{errors.prType}</div>
            <div className="mt-5 mb-2">Add Product Type</div>
            <AddProductType onAddItem={addProductTypeHandler} />
          </Form>
        </Modal.Body>
        <AddedProductTypes
          prductTypes={productTypes}
          onRemoveItem={removeProductItem}
        />
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save Product"} onSave={addProductHandler} />
        </Modal.Footer>
      </Modal>
      <NotificationModal modal={modalData} onClose={handleModalClose} />
    </>
  );
};

export default React.memo(AddProduct)
