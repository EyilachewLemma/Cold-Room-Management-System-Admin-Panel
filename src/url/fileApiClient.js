import axios from "axios";
let fileApiClient = axios.create({
    baseURL: 'http://192.168.1.93:3000/',
    headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('tokenc')}`,

    }
})

export default fileApiClient