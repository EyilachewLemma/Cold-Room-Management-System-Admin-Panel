const ValidatEmployee = (values) =>{
    const errors = {}
    if(!values.first_name?.trim()){
        errors.first_name = 'first name is required'
    }
    if(values.first_name?.trim().length > 25){
        errors.first_name = 'first name must be lessthan or equal to 25 letters'
    }
    if(!values.last_name?.trim()){
        errors.last_name = 'last name is required'
    }
    if(values.last_name?.trim().length > 25){
        errors.last_name = 'last name must be lessthan or equal to 25 letters'
    }
    if(!values.phone_number?.trim()){
        errors.phone_number = 'phone number is required'
    }
    if(!values.phone_number.match(/^\d{10}$/g)){
              errors.phone_number = 'invalid phone number'
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