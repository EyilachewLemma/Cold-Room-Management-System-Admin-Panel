import Button from 'react-bootstrap/Button';
import classes from './CancelButton.module.css'

const CancelButton = (props) =>{
    const actionHandler = () =>{
props.onClose()
    }
 return <Button onClick={actionHandler} variant="none" className={classes.btn}>{props.title}</Button>
}
export default CancelButton