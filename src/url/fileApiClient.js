import axios from "axios";
let fileApiClient = axios.create({
    // baseURL: 'http://coldroomapinew.merahitechnologies.com/',
    // baseURL:'http://192.168.0.9:3000/',
    // baseURL:'https://rensys-coldroom.onrender.com/',
    headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('tokenc')}`,

    }
})

export default fileApiClient