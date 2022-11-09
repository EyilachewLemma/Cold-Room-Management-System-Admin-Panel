import {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
// import Spinner from "react-bootstrap/Spinner";
// import { useSelector,useDispatch } from "react-redux";
// import { Link } from 'react-router-dom';
// import {buttonAction} from '../../store/slices/ButtonSpinerSlice'
// import { userAction } from '../../store/slices/UserSlice';
import myProf from '../../assetes/eyilachew.jpg'
// import apiClient from '../../url/index';
import classes from './Account.module.css'


const Account = () =>{
    const [image,setImage] = useState('')
    let imgInput=null
        
        const fileChangeHandler=(e)=>{
            setImage(e.target.files[0])
        }
       
        
      
     return <div className={`${classes.wraper} pb-5`}>
    <div className='d-flex justify-content-center fs-3 fw-bold mb-5 px-5 pt-5'>
        {!image && <div className='position-relative'>
        <img src={myProf} alt="my profile" className={`${classes.profileImg} img-fluid rounded-circle`} />
        <div className={`${classes.cameraIcon} fs-3`}>
        <span onClick={()=>imgInput.click()}><i className="fa-solid fa-camera"></i></span>
        <Form.Control
        type="file"
        className='d-none'
        ref={el=>imgInput=el}
        onChange={fileChangeHandler}
    />
        </div>
        </div>
     }
        {image &&  <div className='position-relative'>
        <img src={URL.createObjectURL(image)} alt="my profile" className={`${classes.profileImg} img-fluid rounded-circle`} />
        <div className={`${classes.cameraIcon} fs-3`}>
        <span onClick={()=>imgInput.click()}><i className="fa-solid fa-camera"></i></span>
        <Form.Control
        type="file"
        className='d-none'
        ref={el=>imgInput=el}
        onChange={fileChangeHandler}
    />
        </div>
        
        </div> 

        }
        
    </div>
    { image && <div className='text-center'>
        <Button variant='none' className={`${classes.btn} py-1`}>Save Profile picture</Button>
        </div>}
      <div className='d-flex border-bottom px-3'>
       <span>First Name</span>
       <span>Abera</span>
       <span className='ms-auto'><i className="fa-solid fa-pen-to-square"></i></span>
      </div>
</div>
}
export default Account