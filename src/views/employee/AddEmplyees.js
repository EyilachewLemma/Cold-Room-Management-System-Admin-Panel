import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SaveButton from '../../components/Button';
import CancelButton from '../../components/CancelButton';
import ValidatEmployee from './validation';
import classes from './Employees.module.css'


const AddEmployees = (props) => {
    const [employee,setEmployee] = useState({first_name:'',last_name:'',phone_number:'',email:''})
    const [errors,setErrors] = useState({first_name:'',last_name:'',phone_number:'',email:''})

    const changeHandler = (e) =>{
       const {name,value} = e.target
       setEmployee(previousValues=>{
        return {...previousValues,[name]:value}
       })
       if(e.target.value){
        setErrors(prevErrors=>{
            return {...prevErrors,[name]:''}
        })
       }
    }
    const saveHandler = () =>{
        setErrors(ValidatEmployee(employee))
        console.log('employee save is clicked')
    }
  const handleClose = () => {
    props.onClose()
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className='px-3'>
        <Form.Group className="mb-3" controlId="fName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
          type="text"
          name="first_name"
          onChange={changeHandler}
          value={employee.first_name}
          className={errors.first_name?classes.errorBorder:''}
           />
           <span className={classes.errorText}>{errors.first_name}</span> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="lname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
           type="text"
           name="last_name"
          onChange={changeHandler}
          value={employee.last_name}
          className={errors.last_name?classes.errorBorder:''}
            />
            <span className={classes.errorText}>{errors.last_name}</span> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNo">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
         type="number"
         name="phone_number"
          onChange={changeHandler}
          value={employee.phone_number}
          className={errors.phone_number?classes.errorBorder:''}
          />
          <span className={classes.errorText}>{errors.phone_number}</span> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailAddress">
      <Form.Label>Email Address</Form.Label>
      <Form.Control
       type="email"
       name="email"
       onChange={changeHandler}
       value={employee.email}
       className={errors.email?classes.errorBorder:''}
        />
        <span className={classes.errorText}>{errors.email}</span> 
    </Form.Group>
    <Form.Group className="mb-3" controlId="role">
    <Form.Label>Role</Form.Label>
    <Form.Control type="text" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="statuss">
  <Form.Label>Status</Form.Label>
  <Form.Control type="text" />
</Form.Group>
      </Form>
  
        </Modal.Body>
        <Modal.Footer>
        <CancelButton title="Close" onClose={handleClose} />
        <SaveButton title="Save" onSave={saveHandler}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

 export default AddEmployees 