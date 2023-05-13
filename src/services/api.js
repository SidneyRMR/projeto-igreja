import axios from "axios";
export const api = axios.create({
    baseURL: 'https://api-production-9bce.up.railway.app'

    // baseURL: process.env.REACT_APP_API_URL
})