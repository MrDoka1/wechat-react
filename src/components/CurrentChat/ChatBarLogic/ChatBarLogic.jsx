import React, {useContext, useState} from 'react';
import {Context} from "../../../index";
import styles from "../ChatBar/ChatBar.module.css";
import {Link} from "react-router-dom";
import ChatBar from "../ChatBar/ChatBar";

const ChatBarLogic = ({chatId}) => {
    const {chatsStorage} = useContext(Context);
    const [activeModal, setActiveModal] = useState(false);

    let chat = chatsStorage.chats.get(chatId);

    let onlineString;
    let statusActive = "";
    let name;

    if (!chatsStorage.isDialog(chatId)) {
        onlineString = `${chat.members} members, ${chat.online} online`;
        name = <button onClick={() => setActiveModal(true)} className={styles.chatName}>{chat.name}</button>
    } else {
        let user = chatsStorage.getUser(chat.userId);
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
        return `last online ${last.getHours()}:${last.getMinutes()}`
    }


    return <ChatBar name={name} onlineString={onlineString} statusActive={statusActive} activeModal={activeModal} setActiveModal={setActiveModal} />;
};

export default ChatBarLogic;