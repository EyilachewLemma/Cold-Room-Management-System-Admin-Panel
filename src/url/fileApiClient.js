import axios from "axios";
let fileApiClient = axios.create({
    baseURL: 'http://192.168.0.9:5000/',
    headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('tokenu')}`,


    }
})

export default fileApiClient