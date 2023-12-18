import axios from "axios";
import {BACKEND_SERVER_HOST} from "../../config";

export const $HOST = axios.create({
    baseURL: BACKEND_SERVER_HOST,
    //baseURL: "http://localhost:8081",
    //baseURL: "http://192.168.1.69:8081",
    //baseURL: "http://192.168.169.227:8081",
    //baseURL: "http://192.168.33.209:8081",
    //baseURL: "http://192.168.0.103:8081", // общага
    //baseURL: "http://192.168.169.244:8081",
    withCredentials: true,
})

/*export const $AUTH_HOST = axios.create({
    baseURL: "http://localhost:8081"
})*/

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${}`
// }