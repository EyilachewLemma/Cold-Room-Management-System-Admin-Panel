import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://192.168.1.93:3000/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',


    }
})

export default apiClient