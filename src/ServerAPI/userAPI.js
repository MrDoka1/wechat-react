import {$HOST} from "./index";
export const loginAPI = async (formData) => {
    const {data} = await $HOST.post("/login", formData);
    return data;
}

export const preAuthAPI = async (formData) => {
    const {data} = await $HOST.post("/auth", formData);
    return data;
}

export const checkAuthAPI = async (code) => {
    const {data} = await $HOST.get("/auth", {params: {code: code}});
    return data;
}

export const registrationAPI = async (formData) => {
    const {data} = await $HOST.post("/registration", formData);
    return data;
}

export const checkAuthorizationAPI = async () => {
    const {data} = await $HOST.get("/check/authorization");
    return data;
}