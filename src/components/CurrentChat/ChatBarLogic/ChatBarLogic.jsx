import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import styles from "../ChatBar/ChatBar.module.css";
import {Link} from "react-router-dom";
import ChatBar from "../ChatBar/ChatBar";
import {observer} from "mobx-react-lite";

const ChatBarLogic = observer(({chatId}) => {
    const {storage} = useContext(Context);
    const [activeModal, setActiveModal] = useState(false);

    let chat = storage.chats.get(chatId);

    let onlineString;
    let statusActive = "";
    let name;

    if (!storage.isDialog(chatId)) {
        onlineString = `${chat.members} members, ${chat.online} online`;
        name = <button onClick={() => setActiveModal(true)} className={styles.chatName}>{chat.name}</button>
    } else {
        let user = storage.getUser(chat.userId);
        name = <Link to={"/profile/" + chat.userId} className={styles.chatName}>{user.getName()}</Link>
        if (user.lastOnline === "online") {
            onlineString = "online";
            statusActive = styles.active;
        } else {
            onlineString = lastOnline(user.lastOnline);
        }
    }

    function lastOnline(lastOnline) {
        let last = new Date(lastOnline);
        let hours = last.getHours() < 10 ? "0" + last.getHours() : last.getHours();
        let minutes = last.getMinutes() < 10 ? "0" + last.getMinutes() : last.getMinutes();
        return `last online ${hours}:${minutes}`;
    }


    return <ChatBar chatId={chatId} name={name} onlineString={onlineString} statusActive={statusActive} activeModal={activeModal} setActiveModal={setActiveModal} />;
});

export default ChatBarLogic;