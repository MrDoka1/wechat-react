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

export const getUserAPI = async (id) => {
    const {data} = await $HOST.get("/user", {params: {id: id}});
    return data;
}

export const getUsersAPI = async (ids) => {
    ids = ids.toString();
    const {data} = await $HOST.get("/users", {params: {ids: ids}});
    return data;
}

export const getUsersOnlineAPI = async (ids) => {
    ids = ids.toString();
    const {data} = await $HOST.get("/users/online", {params: {ids: ids}});
    return data;
}

export const getProfileAPI = async (id) => {
    const {data} = await $HOST.get("/profile", {params: {id: id}});
    return data;
}

export const friendAPI = async (action, id) => {
    let formData = new FormData();
    formData.append("action", action);
    formData.append("id", id);
    const {data} = await $HOST.post("/friend", formData);
    return data;
}

export const getMyFriendsListAPI = async () => {
    const {data} = await $HOST.get("/friends");
    return data;
}

export const getMySubscribersListAPI = async () => {
    const {data} = await $HOST.get("/friends/subscribers");
    return data;
}

export const getSearchUsersAPI = async () => {
    const {data} = await $HOST.get("/friends/search");
    return data;
}

export const getLogoutAPI = async () => {
    const {data} = await $HOST.get("/logout");
    return data;
}

