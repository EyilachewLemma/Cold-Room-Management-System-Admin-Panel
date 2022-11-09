import React, { useState } from "react";
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
  const [productTitle, setProductTitle] = useState("");
  const [prImage, setprImage] = useState("");
  const [errors, setErrors] = useState({ prTitle: "", prImage: "" });
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
    if (values.prTitle.trim().length > 30) {
      errorsValue.prTitle = "product title must be lessthan 30 letters";
    }
    if (!values.prImage) {
      errorsValue.prImage = "product image is required";
    }
    setErrors(errorsValue);
    return errorsValue;
  };
  const handleClose = () => {
    props.onClose(false);
  };
  const addProductHandler = async () => {
    let errorValue = validate({ prTitle: productTitle, prImage: prImage });
    console.log('before validation=',errorValue)
    if (!errorValue?.prTitle && !errorValue?.prImage  ) {
      dispatch(buttonAction.setBtnSpiner(true));
      let formData = new FormData();
      formData.append('name',productTitle)
      formData.append('product_image',prImage)     
      try {
        let response = await fileApiClient.post("admin/products", formData);
        if (response.status === 200) {
          console.log("create Cold room response =", response);
          dispatch(productAction.addProduct(response));
          console.log("product is added successfullu");
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

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          <SaveButton title={"Save Product"} onSave={addProductHandler} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(EditProduct)
