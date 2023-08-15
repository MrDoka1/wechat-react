import axios from "axios";

export const $HOST = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true,
})

export const $AUTH_HOST = axios.create({
    baseURL: "http://localhost:8081"
})

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${}`
// }