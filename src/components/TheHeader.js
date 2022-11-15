import {Fragment,useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import profileImage from '../assetes/eyilachew.jpg'
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useDispatch,useSelector} from 'react-redux'
import { notificationAction } from '../store/slices/NotificationSlice';
import { isLoadingAction } from '../store/slices/spinerSlice';
import apiClient from '../url/index'
import classes from './TheHeader.module.css'

const TheHeader = () =>{
  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
  const notifications = useSelector(state=>state.notification.notifications)
  const navigate = useNavigate()
 
  useEffect(()=>{
   const fetchNotification = async() =>{
    dispatch(isLoadingAction.setIsLoading(true))
      try{
        const response = await apiClient.get('admin/notification')
        if(response.status === 200){
          dispatch(notificationAction.setNotifications(response.data))
        }
      }
      catch(err){console.log('err',err)}
      finally{
        dispatch(isLoadingAction.setIsLoading(false))
      }
   }
   fetchNotification()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const logoutHandler = () =>{}
  const accountHandler = () =>{
    navigate('/account')
  } 
  const openNotification = () =>{
    setShow(true)
  }
  const handleClose = ()=>{
    setShow(false)
  }
  console.log('notification =',notifications)
  return <Fragment>
  <div className={classes.headerNav+' d-flex px-3 px-lg-5 py-2 align-items-center'}>
       <div>
        <span className={classes.yellowText+' fw-bold fs-4'}>RENSYS</span>
        <span className={classes.greenText+' fw-bold fs-4'}>ENGINEERING</span>
       </div>
       <div className='ms-auto me-3'>
       <Button className={classes.notificationBtn} onClick={openNotification}>
       <div className='text-white position-relative'><i className="fa-regular fa-bell fs-2"></i>
       <span className={classes.bage+' rounded-circle px-1 small'}>12</span>
       </div>      
    </Button>       
       </div>
      <div className='border rounded pe-2'>
      <Dropdown>
        <Dropdown.Toggle className={classes.dropDown+' d-flex align-items-center'} id="profile-dropdown">
        <div className='d-flex overflow-hidden ms-2 align-items-center'>
      <img src={profileImage} alt={'profile_photo'} className={classes.profileImg+' img-fluid rounded-circle'} />
         <div className='text-white me-2'>
           <div className='fw-bold ms-2 mt-2'>Mesenbet Dinku  </div>
           <div className='small text-start ms-3'>admin</div>
         </div>
         </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Button className={classes.profileBtn+' text-dark'} onClick={accountHandler}>My Account</Button>            
            </Dropdown.Item>
          <Dropdown.Item>
          <Button className={classes.profileBtn+' text-dark'} onClick={logoutHandler}>Logout</Button>            
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>        
       </div>
       <div>
       <Offcanvas show={show} placement='end' backdrop={false} onHide={handleClose}>
       <Offcanvas.Header closeButton>
         <Offcanvas.Title>Notifications</Offcanvas.Title>
       </Offcanvas.Header>
       <Offcanvas.Body>
         Some text as placeholder. In real life you can have the elements you
         have chosen. Like, text, images, lists, etc.
       </Offcanvas.Body>
     </Offcanvas>
       </div>
       </Fragment>
}
export default TheHeader