import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://192.168.1.101:3000/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenc')}`,


    }
})

export default apiClient