import React from 'react';
import styles from "./Chats.module.scss"
import ChatItem from "./ChatItem/ChatItem";
import {observer} from "mobx-react-lite";

const Chats = observer(({chats}) => {
    let chatsArray = [];
    let idArray = [];

    chats.forEach((chat, key) => {
        chatsArray.push(chat);
        idArray.push(key)
    });

    return (
        <div className={styles.users}>
            {chatsArray.map((chat, key) => <ChatItem key={key} id={idArray[key]} chat={chat}/>)}
        </div>
    );
});

export default Chats;