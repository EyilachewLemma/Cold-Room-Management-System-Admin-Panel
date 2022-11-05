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
import ReactToPrint from "react-to-print";
import apiClient from "../../url/index";
import classes from "./ColdRoomLists.module.css";


const ColdRoomLists = () => {

  const [togleModal,setTogleModal] = useState(false)
  const [modalTitle,setModalTitle] = useState({})
  const [coldRoomData,setColdRoom] = useState({})
  const componentRef = useRef()
  const navigate = useNavigate()
  const products = [1,2,3,4,5,6,7,8,9,10,11]
  const dispatch = useDispatch()
  const coldRooms = useSelector(state =>state.coldroom)
  useEffect( ()=>{
    async function  featchColdRooms(){
      dispatch(isLoadingAction.setIsLoading(false))
    try{
     var response = await apiClient.get('admin/address')
     if(response.status === 200){
      dispatch(coldRoomAction.setColdRooms(response.data || []))
     }
    }
    catch(err){}
    finally {dispatch(isLoadingAction.setIsLoading(false))}
  }
  featchColdRooms()
  },[dispatch])

  console.log('coldrooms from',coldRooms)

  const handleCloseModal = useCallback((value) =>{
     setTogleModal(value)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[togleModal])

  const addColdRoomHandler = () =>{
    setModalTitle({title:'Add Cold Room',isEdit:false})
    setTogleModal(true)
  }
  const editColdRoomHandler = (index) =>{
    setModalTitle({title:'Edit Cold Room Information',isEdit:true})
    setTogleModal(true)
    setColdRoom(index)
    console.log('index = ',index)
  }
  const handlViewProduct = () =>{
      navigate('/cold-rooms/products')
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
            <span>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
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
            products.map((product,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-2">232</td>
              <td className="p-2">Bahir Dar</td>
              <td className="p-2">Amhara</td>
              <td className="p-2">South Gonder</td>
              <td className="p-2">Gaint</td>
              <td className="p-2">Kebele 02</td>            
              <td className="p-2 text-center">21,200</td>
              <td className="p-2 text-center"> 2 ETB</td>
              <td className="p-2">Admasu Welde</td>
              <td className="p-2 onPrintDnone">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>handlViewProduct()}>View Products</Button>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}>View Location</Button>
      <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>editColdRoomHandler(index)}>Edit Cold Room</Button>
        <Button variant="none" className={`${classes.dropdownItem} w-100 rounded-0 text-start ps-3`}>Assign Manager</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
      <AddColdRoom title={modalTitle} isOpen={togleModal} closeModal={handleCloseModal} data={coldRoomData} />
    </Fragment>
  );
};
export default ColdRoomLists;
