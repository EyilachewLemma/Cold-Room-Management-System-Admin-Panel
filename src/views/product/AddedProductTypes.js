import Button from "react-bootstrap/Button";
import classes from "./AddProduct.module.css";
const AddedProductTypes = (props) =>{
    const removeProductItem = (index) =>{
         props.onRemoveItem(index)
    }
     return <div>
     {
        props.prductTypes.map((type, index) =>  (
            <div className="mt-4 px-3 d-flex justify-content-between border-top p-2 align-items-center" key={index}>
              <span>{index + 1}</span>
              <div className="mb-2">{type.typeTitle}</div>
              <img src={URL.createObjectURL(type.image)} alt="selected_image" className={`${classes.selectedImg} img-fluid`} />
              <Button onClick={event=>removeProductItem(index)} variant="none" className={`${classes.yellowColor} border`}>Remove Type</Button>
            </div>
        )
        )
}
     </div>
}
export default AddedProductTypes