const ValidatEmployee = (values) =>{
    const errors = {}
    if(!values.fName?.trim()){
        errors.fName = 'first name is required'
    }
    if(values.fName?.trim().length > 25){
        errors.fName = 'first name must be lessthan or equal to 25 letters'
    }
    if(!values.lName?.trim()){
        errors.lName = 'last name is required'
    }
    if(values.lName?.trim().length > 25){
        errors.lName = 'last name must be lessthan or equal to 25 letters'
    }
    if(!values.phoneNumber?.trim()){
        errors.phoneNumber = 'phone number is required'
    }
    if(!values.phoneNumber.match(/^\d{10}$/g)){
              errors.phoneNumber = 'invalid phone number'
    }
    if(!values.email?.trim()){
        errors.email = 'email is required'
    }
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    
    if(!regexExp.test(values.email)){
              errors.email = 'invalid email address'
    }
    
    return errors
}
export default ValidatEmployee