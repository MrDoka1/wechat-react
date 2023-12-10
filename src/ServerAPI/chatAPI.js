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

export const getChatUsersAPI = async (chatId) => {
    const {data} = await $HOST.get("/chat/users", {params: {chatId: chatId}});
    return data;
}

export const createChatAPI = async (name, isPrivate, users) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("isPrivate", isPrivate);
    formData.append("ids", Array.from(users).toString());
    formData.append("url", "");
    const {data} = await $HOST.post("/chat", formData);
    return data;
}