import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { buttonAction } from '../../store/slices/ButtonSpinerSlice';
import { useDispatch } from 'react-redux';
import apiClient from '../../url';
import classes from './Login.module.css'
const AskToForgot = () =>{
 const [email, setEmail] = useState('')
 const [error,setError] = useState('')
 const [notification,setNotification]=useState({})
 const dispatch = useDispatch()
     const changeHandler = (e) =>{
        setEmail(e.target.value)
        if(e.target.value){
            setError('')
        }
     }
     const validate = (value) =>{
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
      let err = ''
      if(!value?.trim()){
        err = 'email is required'
      }
      else if(!regexExp.test(value)){
        err = 'invalid email address'
      }
      return err
     }
    const loginHandler = async() =>{
       const err = validate(email)
        setError(err)
        if(!err){
     try{
        dispatch(buttonAction.setBtnSpiner(true))
        const response = await apiClient.post('admin/reset',email)
        if(response.status === 200){
            setNotification({status:'success',message:'We have sent you password reset link to your email,click the link to reset'})
        }
     }
     catch(err){
        setNotification({status:'fail',message:err.response.data})
     }
     finally{
        dispatch(buttonAction.setBtnSpiner(false))
     }
        }
    }
    return <div className={`${classes.wraper} p-5`}>
<Form>
<Form.Group className="mb-4" controlId="loginemail">
  <Form.Label className='fw-bold'>Email address</Form.Label>
  <Form.Control 
  type="email" 
  placeholder="name@example.com"
  name='email'
  className={error?classes.errorBorder:''}
  onChange={changeHandler}
   />
   <span className={classes.errorText}>{error}</span> 
</Form.Group>
<Button className={`${classes.btn} w-100 py-1`} variant='none' onClick={loginHandler}>Forgot password</Button>
</Form>
<div className={`${notification.status==='success'?"text-success":classes.errorText} my-2 text-center `}>{notification.message}</div>
<div className='d-flex justify-content-end mt-4'>
<Link to={'/login'}>Login</Link>
</div>
</div>
}
export default AskToForgot