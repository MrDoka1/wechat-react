import React, {useContext} from 'react';
import styles from "./ChatBar.module.css"
import {Context} from "../../../index";

const ChatBar = ({chatId}) => {
    const {chats} = useContext(Context);
    let chat = chats.chats.get(chatId);
    let onlineString = "";
    let statusActive = ""
    if (chat.members !== undefined) {
        onlineString = `${chat.members} members, ${chat.online} online`;
    } else {
        if (chat.online === "online") {
            onlineString = "online";
            statusActive = styles.active;
        } else {
            onlineString = lastOnline(chat.online)
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.leftColumn}>
                <div className={styles.chatName}>{chat.name}</div>
                <div className={styles.onlineStatus + " " + statusActive}>{onlineString}</div>
            </div>
            <div>

            </div>
        </div>
    );

    function lastOnline(lastOnline) {
        let last = new Date(lastOnline);
        return `last online ${last.getHours()}:${last.getMinutes()}`
    }
};

export default ChatBar;