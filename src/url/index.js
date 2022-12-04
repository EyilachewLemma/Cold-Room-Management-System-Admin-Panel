import axios from "axios";
let apiClient = axios.create({
    baseURL: 'http://coldroomapinew.merahitechnologies.com/',
    // baseURL:'https://rensys-coldroom.onrender.com/',
    // baseURL:'http://192.168.0.9:3000/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',

    }
})

export default apiClient