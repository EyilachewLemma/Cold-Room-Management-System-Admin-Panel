import React, {useState,useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import classes from './AddProduct.module.css'
const AddProductItem = (props) =>{
    const[type,setType] = useState({description:'',typeTitle:'',image:''})
    const[errors,setErrors] = useState({image:'',typeTitle:''})
    const imgInput = useRef()
  console.log('add product type component')
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
   const validateType = (value) =>{
        const errors={}
       if(!value.typeTitle?.trim()){
        errors.typeTitle = 'product type title is required'
       }
       if(value.typeTitle?.trim().length > 30){
        errors.typeTitle = 'the maximum length of  product type title must be 30 letters'
       }
       if(!value.description?.trim()){
        errors.description = 'product type description is required'
       }
       if(!value.image){
        errors.image = 'product type image is required'
       }
       setErrors(errors)
       return errors
   }
   const addTypeHandler = () =>{
   const errorValue = validateType(type)
  const errorArr = Object.keys(errorValue)
  if(!errorArr?.length){
    props.onAddItem(type)
    setType({image:'',typeTitle:''})
    imgInput.current.value = ''
  }
      
   
   }
    return  <div className='border rounded shadow-sm p-3'>
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
    <Button
       variant="none" id="addProductType"
        className={`${classes.yellowColor} border  fs-5 align-self-center`}
        onClick={addTypeHandler}>
      <i className="fa-solid fa-plus"></i> Add type
      </Button>
      </div>
    </div> 
}
export default AddProductItem