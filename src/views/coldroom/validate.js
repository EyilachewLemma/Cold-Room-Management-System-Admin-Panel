export default function validate(values){
    let errors = {}
    if(!values.name?.trim()){
        errors.name = 'cold room name is required !'
    }
    else if(values.name?.trim()?.length > 50){
        errors.name = 'cold room name must be lessthan 50 letters'
    }
    if(!values.region?.trim()){
        errors.region = 'region name where the cold room is going to be open is required !'
    }
    else if(values.region?.trim()?.length > 30){
        errors.region = 'region name must be lessthan 30 letters'
    }
    if(!values.zone?.trim()){
        errors.zone = 'zone name where the cold room is going to be open is required !'
    }
    else if(values.zone?.trim()?.length > 50){
        errors.zone = 'zone name must be lessthan 50 letters'
    }
    if(!values.woreda?.trim()){
        errors.woreda = 'woreda name where the cold room is going to be open is required !'
    }
    else if(values.woreda?.trim()?.length > 50){
        errors.woreda = 'woreda name must be lessthan 50 letters'
    }
    if(!values.kebele?.trim()){
        errors.kebele = 'kebele name where the cold room is going to be open is required !'
    }
    else if(values.kebele?.trim()?.length > 50){
        errors.kebele = 'kebele name must be lessthan 30 letters'
    }
    if(!values.price){
        errors.price = 'rent_fee in this cold room per Kg  is required !'
    }
    else if(values.price.length > 50){
        errors.price = 'rent fee must be lessthan 5 digits'
    }
    if(!values.latitude || !values.longitude){
        errors.latitude = 'latitude and longitude where the cold room is going to be open  is required!. please click on the map where you want to open the cold room to set the latitude and longitude value '
    }
   
    return errors
}