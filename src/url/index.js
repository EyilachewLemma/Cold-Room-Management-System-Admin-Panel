import axios from "axios";
let apiClient = axios.create({
    // baseURL: 'http://hotroom.merahitechnologies.com:3000/',
    // baseURL:'https://rensys-coldroom.onrender.com/',
    baseURL:'http://192.168.100.127:3000/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',


    }
})

export default apiClient