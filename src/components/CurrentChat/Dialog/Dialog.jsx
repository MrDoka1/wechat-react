import React, {useContext} from 'react';
import styles from "./Dialog.module.css"
import SendMessagePanel from "./SendMessagePanel/SendMessagePanel";
import Message from "./Message/Message";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Dialog = observer(({chatId}) => {
    const {storage} = useContext(Context);

    let messages = storage.getMessages(chatId.toString());
    let isDialog = storage.getChat(chatId).isDialog;
    messages = [...messages.entries()].sort()
    let messagesArray = [...messages]

    return (
        <div className={styles.wrapper}>
                <div className={styles.messages}>
                    {messagesArray.map((message, key) => <Message key={key} isDialog={isDialog} message={message}/>)}
                </div>
            <div>
                <SendMessagePanel chatId={chatId} />
            </div>
        </div>
    );
});

export default Dialog;