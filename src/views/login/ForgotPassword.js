import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SaveButton from '../../components/Button';
import CancelButton from '../../components/CancelButton';
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import {userAction} from '../../store/slices/UserSlice'
import { useDispatch,useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import classes from './Login.module.css'
import apiClient from '../../url';

 const ChangePassword = (props) => {
    const [values,setValues] =useState({newPassword:'',confirmPassword:''})
    const [errors,setErrors] = useState({newPassword:'',confirmPassword:''})
    const [notification,setNotification] = useState('')
    const user = useSelector(state=>state.user.data)
    // eslint-disable-next-line no-unused-vars
    const [query,setQuery] = useSearchParams()
    const dispatch = useDispatch()
    const changeHandler = (e) =>{
        const {name,value} =e.target
        setValues(prevValues=>{
            return {...prevValues,[name]:value}
        })
        if(e.target.value){
            setErrors(preErr=>{
                return {...preErr,[name]:''}
            })
        }
    }
    const validate = (data) =>{
        const err = {}
    if(!data.newPassword?.trim()){
        err.newPassword = 'please enter new password'
    }    
 else if(data.newPassword.trim().length < 6){
    err.newPassword = 'new password must be greaterthan or equal to 6 characters'
}
else if(data.newPassword.trim().length >10){
    err.newPassword = 'new password must be lessthan or equal to 10 characters'
}
if(!data.confirmPassword){
    err.confirmPassword = 'please confirm new password'
}
else if(data.confirmPassword !== data.newPassword){
    err.confirmPassword = 'your password is not match'
}
return err
}
const fetchUserData = async() =>{
  try{
   const response = await apiClient.get('admin/auth/my-account')
   if(response.status === 200){
      dispatch(userAction.setUser(response.data))
   }
  }
  catch(err){}
 }
const saveUserData = (data) =>{
   apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
     localStorage.setItem("tokenc", data.token);
     dispatch(userAction.setToken(data.token))
     dispatch(userAction.setIsAuthenticated(true))
}
    const saveHandler = async() =>{
       const err = setErrors(validate(values))
        if(!err?.newPassword && !err?.confirmPassword){
            try{
                dispatch(buttonAction.setBtnSpiner(true));
                const response = await apiClient.put(`admin/auth/change-password/${user.id}`,{newPassword:values.newPassword,email:query.get('email')})
                if(response.status === 200){
                  saveUserData(response.data)                    
                  fetchUserData()
                }
            }
            catch(err){
                setNotification(err.response.data)
            }   
            finally{
                dispatch(buttonAction.setBtnSpiner(false));
            }
        }
    }
    const closeHandler = () =>{
        props.onClose()
        setErrors({})
        setValues({oldPassword:'',newPassword:'',confirmPassword:''})
        setNotification('')
    }
  return (
    <Modal
      show={props.show}
      onHide={() => closeHandler(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="editNameModal">
          Password Satting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form className='px-3'>
      <Form.Group className="mb-3" controlId="oldPassword">
        <Form.Label>Old Password</Form.Label>
        <Form.Control 
        type="password"
        name="oldPassword"
        onChange={changeHandler}
        value={values.oldPassword}
        className={errors.oldPassword?classes.errorBorder:''}
         />
         <span className={classes.errorText}>{errors.oldPassword}</span> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="newPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
         type="password"
         name="newPassword"
        onChange={changeHandler}
        value={values.newPassword}
        className={errors.newPassword?classes.errorBorder:''}
          />
          <span className={classes.errorText}>{errors.newPassword}</span> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
         type="password"
         name="confirmPassword"
        onChange={changeHandler}
        value={values.confirmPassword}
        className={errors.confirmPassword?classes.errorBorder:''}
          />
          <span className={classes.errorText}>{errors.confirmPassword}</span> 
      </Form.Group>
      </Form>
        <div className={`${classes.errorText} my-2 text-center`}>{notification}</div>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton title="Cancel" onClose={closeHandler} />
        <SaveButton title="Save Chance" onSave={saveHandler} />
      </Modal.Footer>
    </Modal>
  );
}
 
export default ChangePassword