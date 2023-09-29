import {$HOST} from "./index";

export const getDialogAPI = async (id) => {
    const {data} = await $HOST.get("/dialog", {params: {id: id}});
    return data;
}

export const getChatsAPI = async () => {
    const {data} = await $HOST.get("/chats");
    return data;
}

export const getLastMessagesAPI = async (ids) => {
    const {data} = await $HOST.get("/messages/last", {params: {ids: ids}});
    return data;
}

export const getMessagesAPI = async (id, messageId) => {
    const {data} = await $HOST.get("/messages", {params: {id: id, messageId: messageId}});
    return data;
}