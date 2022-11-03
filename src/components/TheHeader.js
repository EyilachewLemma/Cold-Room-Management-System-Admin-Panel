import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import profileImage from '../assetes/eyilachew.jpg'
import classes from './TheHeader.module.css'

const TheHeader = () =>{
  return <div className={classes.headerNav+' d-flex px-3 px-lg-5 py-2 align-items-center'}>
       <div>
        <span className={classes.yellowText+' fw-bold fs-4'}>RENSYS</span>
        <span className={classes.greenText+' fw-bold fs-4'}>ENGINEERING</span>
       </div>
       <div className='ms-auto me-3'>
       <Button className={classes.notificationBtn}>
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
            <Button className={classes.profileBtn+' text-dark'}>My Account</Button>            
            </Dropdown.Item>
          <Dropdown.Item>
          <Button className={classes.profileBtn+' text-dark'}>Logout</Button>            
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
        
       </div>
}
export default TheHeader