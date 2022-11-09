import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import classes from './Login.module.css'
const ForgotPassword = () =>{
 const [cridentials, setCridentials] = useState({email:'',password:''})
 const [errors,setErrors] = useState({email:'',password:''})
     const changeHandler = (e) =>{
        const {name,value} = e.target
        setCridentials(prevValues=>{
            return {...prevValues,[name]:value}
        })
     }
     const validate = (values) =>{
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      const errorValues ={}
      if(!values.email){
        errorValues.email = 'email is required'
      }
      if(!regexExp.test(values.email)){
        errorValues.email = 'invalid email address'
      }
      if(!values.password){
        errorValues.password ='password is required'
      }
      if(values.length > 15){
        errorValues.password = 'password must not be greater than 15 characters'
      }
      return errorValues
     }
    const loginHandler =() =>{
        setErrors(validate(cridentials))
    }
    return <div className={`${classes.wraper} p-5`}>
<Form>
<Form.Group className="mb-4" controlId="loginemail">
  <Form.Label className='fw-bold'>Email address</Form.Label>
  <Form.Control 
  type="email" 
  placeholder="name@example.com"
  name='email'
  className={errors.email?classes.errorBorder:''}
  onChange={changeHandler}
   />
   <span className={classes.errorText}>{errors.email}</span> 
</Form.Group>
<Form.Group className="mb-4" controlId="password">
  <Form.Label className='fw-bold'>Password</Form.Label>
  <Form.Control 
  type="password"
  name='password'
  className={errors.password?classes.errorBorder:''}
  onChange={changeHandler}
   />
   <span className={classes.errorText}>{errors.password}</span> 
</Form.Group>
<Button className={`${classes.btn} w-100`} variant='none' onClick={loginHandler}>Login</Button>
</Form>
<div className='d-flex justify-content-end mt-4'>
<Link to={'/login'}>Login</Link>
</div>
</div>
}
export default ForgotPassword