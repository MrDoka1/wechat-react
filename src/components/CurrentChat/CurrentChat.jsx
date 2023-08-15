import React from 'react';
import styles from "./CurrentChat.module.css"
import ChatBar from "./ChatBar/ChatBar";
import Dialog from "./Dialog/Dialog";

const CurrentChat = ({chatId}) => {
    return (
        <div className={styles.wrapper}>
            <ChatBar chatId={chatId} />
            <Dialog chatId={chatId} />
        </div>
    );
};

export default CurrentChat;