import React, {useContext, useEffect, useState} from 'react';
import styles from "./CurrentChat.module.css"
import ChatBar from "./ChatBar/ChatBar";
import Dialog from "./Dialog/Dialog";
import LoadChat from "./LoadChat/LoadChat";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ChatBarLogic from "./ChatBarLogic/ChatBarLogic";

const CurrentChat = observer(({chatId}) => {
    const {chatsStorage} = useContext(Context);

    const [load, setLoad] = useState(true);

    useEffect(() => {
        chatsStorage.loadMessages(chatId, setLoad)
    }, [chatsStorage, chatId])

    if (load) {
        return (
            <div className={styles.wrapper}>
                <ChatBarLogic chatId={chatId} />
                <LoadChat />
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <ChatBarLogic chatId={chatId} />
            <Dialog chatId={chatId} />
        </div>
    );
});

export default CurrentChat;