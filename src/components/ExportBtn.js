import Button from 'react-bootstrap/Button';
import classes from './ExportBtn.module.css'
const ExportBtn = () =>{
    return <Button variant='none' className={`${classes.btn} py-1`}><span><i className="fas fa-file-export"></i></span> Export</Button>
}
export default ExportBtn