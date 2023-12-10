import {$HOST} from "./index";

export const sendMessageAPI = async (chat, textMessage) => {
    let formData = new FormData();
    formData.append("chat", chat);
    formData.append("text", textMessage);
    const {data} = await $HOST.post("/message", formData);
    return data;
}