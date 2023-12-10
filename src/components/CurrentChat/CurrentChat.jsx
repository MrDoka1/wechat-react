import React, {useContext, useEffect, useState} from 'react';
import styles from "./CurrentChat.module.css"
import Dialog from "./Dialog/Dialog";
import LoaderElement from "./LoadChat/LoaderElement";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ChatBarLogic from "./ChatBarLogic/ChatBarLogic";

const CurrentChat = observer(({chatId}) => {
    const {storage} = useContext(Context);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        storage.loadMessages(chatId, setLoad);
    }, [storage, chatId]);

    if (load) {
        return (
            <div className={styles.wrapper}>
                <ChatBarLogic chatId={chatId} />
                <LoaderElement />
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