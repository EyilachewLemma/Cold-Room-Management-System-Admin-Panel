import { Fragment,useState,useCallback,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { isLoadingAction } from "../../store/slices/spinerSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import AddColdRoom from "./AddColdRoom";
import AssignManager from './AssignManager'
import ReactToPrint from "react-to-print";
import apiClient from "../../url/index";
import classes from "./ColdRoomLists.module.css";


const ColdRoomLists = () => {

  const [togleModal,setTogleModal] = useState(false)
  const [modalTitle,setModalTitle] = useState({})
  const [coldRoomData,setColdRoom] = useState({})
  const [assignModal,setAssignModal] = useState(false)
  const [selectedColdRoom,setSelectedColdRoom]=useState({id:null,index:null})
  const componentRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const coldRooms = useSelector(state =>state.coldroom.coldRooms)
  const searchBy = useRef()
  

  const featchColdRooms = async() => {
    dispatch(isLoadingAction.setIsLoading(true))
  try{
   var response = await apiClient.get(`admin/coldRooms?search=${searchBy.current.value}`)
   if(response.status === 200){
    dispatch(coldRoomAction.setColdRooms(response.data || []))
   }
  }
  catch(err){}
  finally {dispatch(isLoadingAction.setIsLoading(false))}
}
  useEffect( ()=>{   
  featchColdRooms()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const handleCloseModal = useCallback((value) =>{
     setTogleModal(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[togleModal])

  const addColdRoomHandler = () =>{
    setModalTitle({title:'Add Cold Room',isEdit:false})
    setTogleModal(true)
  }
  const editColdRoomHandler = (coldRoom) =>{
    setModalTitle({title:'Edit Cold Room Information',isEdit:true})
    setTogleModal(true)
    setColdRoom(coldRoom)
  }
  const handlViewProduct = (crId) =>{
      navigate(`/cold-rooms/${crId}/products`)
  }
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchColdRooms()
    }
  }
  const searchHandler = () =>{
    featchColdRooms()
  }
  const openAssignManagerHandle = (id,index) =>{
    setSelectedColdRoom({id,index})
    setAssignModal(true)
  }
  const closeAssignModal = () =>{
    setAssignModal(false)
  }
  return (
    <Fragment>
      <h5 className="text-bold">Cold Room List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the cold room section you can review and manage all cold rooms with
        their detail.You can view and edit many information such as cold room
        name, region, zone,woreda,kebele and rent fee. You can also add new cold room 
      </p>
      <div className="d-flex justify-content-between mt-5">
        <InputGroup className="mb-3 w-50 border rounded">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search by cold room name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={searchBy}
            onKeyUp={enterKeyHandler}
          />
        </InputGroup>
        <div className="ms-auto me-5">
        <Button className={`${classes.btn} py-1`} onClick={addColdRoomHandler}>Add Cold Room</Button>
        </div>
        <div>
        <ReactToPrint
        trigger={()=><Button variant='none' className="exportbtn py-1"><span><i className="fas fa-file-export"></i></span> Export</Button>}
        content={()=>componentRef.current}       
        documentTitle='new document'
        pageStyle='print'
        />
        </div>
      </div>
      <div className={classes.bottomBorder}></div>
     {
      coldRooms.length > 0 &&(
       <div className="mt-4" ref={componentRef}>
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Region</th>
              <th>Zone</th>
              <th>Wereda</th>
              <th>Kebele</th>
              <th>Product stock(Kg)</th>
              <th>Rent fee pre KG</th>
              <th>Manager</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
          {
            coldRooms?.map((coldRoom,index) =>(
              <tr className={classes.row} key={coldRoom.id}>
              <td className="p-2">{index+1}</td>
              <td className="p-2">{coldRoom.name}</td>
              <td className="p-2">{coldRoom.address.region}</td>
              <td className="p-2">{coldRoom.address.zone}</td>
              <td className="p-2">{coldRoom.address.woreda}</td>
              <td className="p-2">{coldRoom.address.kebele}</td>            
              <td className="p-2 text-center">{coldRoom.stockProduct?coldRoom.stockProduct:0}</td>
              <td className="p-2 text-center">{coldRoom.rent?.price}</td>
              <td className="p-2">{coldRoom.employee?coldRoom.employee?.fName+' '+coldRoom.employee?.lName:"UnAssined"}</td>
              <td className="p-2 onPrintDnone">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>handlViewProduct(coldRoom.id)}>View Products</Button>
      <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>editColdRoomHandler(coldRoom)}>Edit Cold Room</Button>
        <Button variant="none" className={`${classes.dropdownItem} w-100 rounded-0 text-start ps-3`} onClick={()=>openAssignManagerHandle(coldRoom.id,index)}>Assign Manager</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
     )}
     {
      !coldRooms.length && (
        <div className="mt-5 text-center">
        No data found
        </div>)
     }
      <AddColdRoom title={modalTitle} isOpen={togleModal} closeModal={handleCloseModal} data={coldRoomData} />
      <AssignManager show={assignModal} onClose={closeAssignModal} coldroom={selectedColdRoom} />
    </Fragment>
  );
};
export default ColdRoomLists;
