import { Fragment,useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { employeeAction } from "../../store/slices/EmployeeSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import ReactToPrint from "react-to-print";
import Button from 'react-bootstrap/Button';
import AddEmployees from "./AddEmplyees";
import apiClient from "../../url/index";
import classes from "./Employees.module.css";


const Employees = () => {
const [show,setShow] = useState(false)
const [modalTitle,setModalTitle] = useState('Add Employee')
const [employee,setEmployee] = useState({})
  const dispatch = useDispatch()
  const employees = useSelector(state =>state.employee.employees)
  const componentRef = useRef()
  const searchBy = useRef()

   const  featchEmployees = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/employees?search=${searchBy.current.value}`)
   if(response.status === 200){
    dispatch(employeeAction.setEmployees(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  const addEmployeeHandler = () =>{
    setModalTitle('Add Employee')
    setShow(true)
  }
   const editEmployeeHandler = (empl) =>{
    setModalTitle('Edit Employee')
    setEmployee(empl)
    setShow(true)
   }
   const deleteEmployeeHandler = () =>{}
   const closeModalHandler = () =>{
    setShow(false)
   }
  console.log('employees from',employees)
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchEmployees()
      console.log('event value',event.target.value)
    }
  }
  const searchHandler = () =>{
    featchEmployees()
    console.log('search value',searchBy.current.value)
  }
    const filterByStatusHandler =(e)=>{
      console.log('option=', e.target.value)
    }
  return (
    <Fragment>
    <div ref={componentRef}>
    <div className="fw-bold">Employees List</div>
      <div className={`${classes.bottomBorder} mt-5`}></div>
        <div className={`${classes.grayBg} d-flex align-items-center mt-3 p-2`}>
        <InputGroup className="w-50 border rounded onPrintDnone">
          <InputGroup.Text id="searchbyfarmerName" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search employees by name"
            aria-label="search employees by name"
            aria-describedby="searchbyproductName"
            onKeyUp={enterKeyHandler}
            ref={searchBy}
          />
        </InputGroup>
        <div className="ms-auto me-3 onPrintDnone">
        <Form.Select aria-label="Default select example" onChange={filterByStatusHandler}>
        <option value='all'>All</option>
        <option value="1">Active Employees</option>
        <option value="2">Inactive Employees</option>
      </Form.Select>
        </div>
        <Button className={`${classes.btn} onPrintDnone`} variant="none" onClick={addEmployeeHandler}>Add Employee</Button>
        <div className="ms-3">
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn onPrintDnone py-1"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
        </div>
      </div>
      
      <div className="mt-4">
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Cold Room</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            employees.map((employee,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-3">{index+1}</td>
              <td className="p-3">{employee.fName+' '+employee.lName}</td>
              <td className="p-3">{employee.phoneNumber}</td>
              <td className="p-3">{employee.email}</td>
              <td className="p-3">{employee.role}</td>
              <td className="p-3">{employee.coldRoom?.name}</td>
              <td className="p-3">Active</td>
               <td className="onPrintDnone">
               <Dropdown>
               <Dropdown.Toggle variant="none" id="dropdown-basic">
               <i className="fas fa-ellipsis-v"></i>
               </Dropdown.Toggle>
         
               <Dropdown.Menu className={classes.dropdownBg}>
               <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>editEmployeeHandler(employee)}>Edit Employee</Button>
               <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>deleteEmployeeHandler(index)}>Delete Employee</Button>
                 </Dropdown.Menu>
             </Dropdown>
               </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      </div>
      <AddEmployees show={show} title={modalTitle} onClose={closeModalHandler} employee={employee} />
    </Fragment>
  );
};
export default Employees;
