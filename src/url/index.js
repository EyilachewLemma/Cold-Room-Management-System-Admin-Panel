import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://192.168.0.9:3000/',
    // baseURL: 'https://coldroom-api.merahitechnologies.com/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('tokenc')}`,


    }
})

export default apiClient