import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table"
import CancelButton from "../../components/CancelButton";
import SaveButton from "../../components/Button";
import { useSelector,useDispatch } from "react-redux";
import {coldRoomAction} from '../../store/slices/coldroomSlice'
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import apiClient from "../../url/index";
import classes from './AssignManager.module.css'
const AssignManager =(props) =>{
    const employees = useSelector(state=>state.employee.employees)
    const dispatch = useDispatch()
    let empId=null

 const selectEmployeeHandler =(e)=>{
    empId = e.target.value
    console.log('selected employee empId=',empId)

 }
 const assignAsManagerHandler = async()=>{
       dispatch(buttonAction.setBtnSpiner(true))
    try{
        var response = await apiClient.post(`admin/coldRooms/assign-manager/${props.coldroom.id}?employeeId=${empId}`)

        if(response.status === 200){
            const coldRoomManager ={
              index:props.coldroom.index,
              employee:{
                fName:response.data.fName,
                lName:response.data.lName
              }

            }
            console.log('assined persone',coldRoomManager)
         dispatch(coldRoomAction.assignManager(coldRoomManager))
         handleClose()
        }
       }
       catch(err){
        console.log('error to assign')
       }
       finally {dispatch(buttonAction.setBtnSpiner(false))
       
      }
     }
 
    const handleClose =()=>{
        props.onClose()
    }
    return <>
    <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign manager for cold room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
               <Form.Check 
            type="radio"
            value={employee.id}
            id={employee.id}
            onChange={selectEmployeeHandler}
          />
               </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />          
            <SaveButton title={"Assign as Manager"} onSave={assignAsManagerHandler} />
          
        </Modal.Footer>
      </Modal>
    </>
}
export default AssignManager