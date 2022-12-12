import axios from "axios";
let fileApiClient = axios.create({
    baseURL: 'https://coldroomapinew.rensysengineering.com/',
    headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('tokenc')}`,

    }
})

export default fileApiClient