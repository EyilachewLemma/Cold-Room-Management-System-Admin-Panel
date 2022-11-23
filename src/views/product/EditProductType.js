import React, { useState, useEffect, useRef } from "react";
import SaveButton from "../../components/Button";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { productDetailAction } from "../../store/slices/ProductDetailSlice";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import NotificationModal from "../../components/Modal";
import fileApiClient from "../../url/fileApiClient";
import classes from "./AddProduct.module.css";

const EditProductType = (props) => {
  const [type, setType] = useState({
    description: "",
    typeTitle: "",
    image: "",
    newImage: "",
  });
  const [errors, setErrors] = useState({
    typeTitle: "",
    description: "",
  });
  const[modalData,setModalData] = useState({show:false,status:null,title:'',message:''})
  const dispatch = useDispatch();
  const imgInput = useRef();
  const { product } = props;
  useEffect(() => {
    const productToBeEdit = {
      typeTitle: props.product.title,
      description: props.product.description,
      image: props.product.imageUrl,
    };
    console.log("product to be edited=", productToBeEdit);
    setType(productToBeEdit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  const newTypeTitleHandler = (e) => {
    setType((previousValue) => {
      return { ...previousValue, typeTitle: e.target.value };
    });
    if (e.target.value) {
      setErrors((prevErros) => {
        return { ...prevErros, typeTitle: "" };
      });
    }
  };
  const descriptionChangeHandler = (e) => {
    setType((previousValue) => {
      return { ...previousValue, description: e.target.value };
    });
    if (e.target.value) {
      setErrors((preValue) => {
        return { ...preValue, description: "" };
      });
    }
  };
  const imageInputHandler = (e) => {
    setType((previousValue) => {
      return { ...previousValue, newImage: e.target.files[0] };
    });
  };
  const handleClose = () => {
    props.onClose(false);
    setType({})
  };
  const validate = (values) => {
    const err = {};
    if (!values.typeTitle?.trim()) {
      err.typeTitle = "product type title is required";
    }
    if (!values.description.trim()) {
      err.description = "product type description is required";
    }
    return err;
  };
  const editProductTypeHandler = async () => {
    const error = validate(type);
    setErrors(error);
    if (!errors.typeTitle && !errors.description ) {
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
      formData.append(`title`, type.typeTitle);
      formData.append(`description`, type.description);
      if (type.newImage) {
        formData.append(`image`, type.newImage);
      }
      try {
        let response = await fileApiClient.put(`admin/product-types/${props.product.id}`, formData);
        if (response.status === 200) {
          dispatch(productDetailAction.editProductType(response.data));
          handleClose();
          setModalData({show:true,status:1,title:'Successful',message:'You edited a product type information successfully'})
        }
      } catch (err) {
        setModalData({show:true,status:0,title:'Faild',message:'faild to edit product type information'})
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
        
      }
    }
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
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5">
            <div className="mt-5 mb-2">Add Product Type</div>
            <div className="border rounded shadow-sm p-3">
              <Form.Group className="mb-3" controlId="ProductType">
                <Form.Label>Product Type Title</Form.Label>
                <Form.Control
                  className={errors.typeTitle ? classes.errorBorder : ""}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={newTypeTitleHandler}
                  value={type.typeTitle}
                />
                {errors.typeTitle && (
                  <span className={classes.errorText}>{errors.typeTitle}</span>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="productDescription">
                <Form.Label>Product Type Description</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  onChange={descriptionChangeHandler}
                  value={type.description}
                  className={errors.description ? classes.errorBorder : ""}
                />
                {errors.description && (
                  <span className={classes.errorText}>
                    {errors.description}
                  </span>
                )}
              </Form.Group>
              <div className="d-flex mt-3 justify-content-between">
                <Form.Group
                  className="mb-3 align-self-center"
                  controlId="productTypeImage"
                >
                  <Form.Label>product Type Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    ref={imgInput}
                    onChange={imageInputHandler}
                  />
                </Form.Group>
                <div className="mt-4 ms-4">
                  {type.newImage ? (
                    <img
                      src={URL.createObjectURL(type.newImage)}
                      alt="new_image"
                      className={classes.selectedImg}
                    />
                  ) : (
                    <img
                      src={type.image}
                      alt="product_type_image"
                      className={classes.selectedImg}
                    />
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save change"} onSave={editProductTypeHandler} />
        </Modal.Footer>
      </Modal>
      <NotificationModal modal={modalData} onClose={handleModalClose} />
    </>
  );
};

export default EditProductType;
