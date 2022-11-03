import React,{useState,useCallback,useEffect } from 'react'
import SaveButton from '../../components/Button';
import CancelButton from '../../components/CancelButton';
import Modal from 'react-bootstrap/Modal';
import Form  from 'react-bootstrap/Form';
import MapBox from './MapBox'; 
import { useSelector } from 'react-redux';
import apiClient from '../../url';
import validate from './validate';
import { useDispatch } from "react-redux";
import { coldRoomAction } from "../../store/slices/coldroomSlice";
import { buttonSpinerAction } from '../../store/slices/ButtonSpinerSlice';
import classes from './AddColdRoom.module.css'
const  AddColdRoom = (props) => { 
  const [coldroomData,setColdroomData] = useState({name:'',region:'',zone:'',woreda:'',kebele:'',price:'',latitude:'',longitude:''}) 
  const [errors,setErrors] = useState({})
  const dispatch = useDispatch()
  const coldRooms = useSelector(state =>state.coldroom)
  const {data} = props
  useEffect(()=>{
    setColdroomData({...props.data,latitude:props.data?.latitude || '',longitude:props.data?.longitude || ''})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])
   const changeHandler = (e) =>{
    const {name,value} = e.target
    setColdroomData(previousStates =>{      
      return {...previousStates,[name]:value}
    })
    setErrors(previousErrors =>{
      return {...previousErrors,[name]:''}
    })
   }
   const {latitude,longitude} = coldroomData
   const getCoordinates = useCallback((cords)=>{
    setColdroomData(previousStates =>{
      return {...previousStates,latitude:cords.lat,longitude:cords.lng}
    })
    setErrors(previousErrors =>{
      return {...previousErrors,latitude:''}
    })
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[latitude,longitude])

   const createColdRoom = async () =>{
    console.log('data sent to server =',coldroomData)
    const errorValues = setErrors(validate(coldroomData))
    if(!errorValues){
    dispatch(buttonSpinerAction.setButtonSpiner(true))
    try{
    let response = await apiClient.post('admin/coldRooms',coldroomData)
    if(response.status === 200){
      console.log('create Cold room response =',response)
      const previousData = [...coldRooms,response.data]
      dispatch(coldRoomAction.addColdRoom(previousData))
      console.log('cold room is created successfullu')
    }
  }
    catch(err){
      console.log('err',err)
    }
    finally {
      dispatch(buttonSpinerAction.setButtonSpiner(false))
    }
  }
   }
   const editColdRoom = () =>{

   }
  const handleClose = () =>{
    props.closeModal(false)
    setErrors({})
  }
  return <>
      <Modal
        size={'lg'}
        show={props.isOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form className='px-5'>
      <Form.Group className="mb-3" controlId="coldroomName">
        <Form.Label>Cold Room Name</Form.Label>
        <Form.Control type="text" name="name" value={coldroomData.name} onChange={changeHandler} className={errors.name?classes.errorBorder:''} /> 
         <span className={classes.errorText}>{errors.name}</span>    
      </Form.Group>
      <Form.Group className="mb-3" controlId="coldroomRegion">
        <Form.Label>Region</Form.Label>
        <Form.Control type="text" name="region" value={coldroomData.region}  onChange={changeHandler} className={errors.region?classes.errorBorder:''} /> 
        <span className={classes.errorText}>{errors.region}</span>    
      </Form.Group>
      <Form.Group className="mb-3" controlId="coldroomZone">
      <Form.Label>Zone</Form.Label>
      <Form.Control text="text" name="zone" value={coldroomData.zone}  onChange={changeHandler} className={errors.zone?classes.errorBorder:''} />  
      <span className={classes.errorText}>{errors.zone}</span>   
    </Form.Group>
    <Form.Group className="mb-3" controlId="coldroomWoreda">
    <Form.Label>Woreda</Form.Label>
    <Form.Control text="text" name="woreda" value={coldroomData.woreda}  onChange={changeHandler} className={errors.woreda?classes.errorBorder:''} /> 
    <span className={classes.errorText}>{errors.woreda}</span>    
  </Form.Group>
  <Form.Group className="mb-3" controlId="coldroomKebele">
  <Form.Label>Kebele</Form.Label>
  <Form.Control text="text" name="kebele" value={coldroomData.kebele} onChange={changeHandler} className={errors.kebele?classes.errorBorder:''} /> 
  <span className={classes.errorText}>{errors.kebele}</span>    
</Form.Group>
<Form.Group className="mb-3" controlId="coldroomFee">
<Form.Label>Rent fee per KG</Form.Label>
<Form.Control text="number" name="price" value={coldroomData.price} onChange={changeHandler} className={errors.price?classes.errorBorder:''} />  
<span className={classes.errorText}>{errors.price}</span>   
</Form.Group>

<div className='my-3'>Choose location of cold room on map</div>
{
  coldroomData.latitude  && (
  <div>
  <div>Latitude: {coldroomData.latitude}</div>
  <div>Longitude: {coldroomData.longitude}</div>
  </div>
  )
}
<div>
<MapBox onMapClick={getCoordinates} />
<div className={`${errors.latitude?classes.errorText:''} my-3`}>{errors.latitude}</div>
</div>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          {props.title.isEdit?(<SaveButton title={"Save Edited Cold Room"} onSave={editColdRoom} />):(<SaveButton title={"Save Cold Room"} onSave={createColdRoom} />)
          }
          
        </Modal.Footer>
      </Modal>
    </>
}

export default React.memo(AddColdRoom) ;