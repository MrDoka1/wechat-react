import React, {useContext} from 'react';
import styles from "./Dialog.module.css"
import SendMessagePanel from "./SendMessagePanel/SendMessagePanel";
import Message from "./Message/Message";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Dialog = observer(({chatId}) => {
    const {chatsStorage} = useContext(Context);

    let messages = chatsStorage.getMessages(chatId.toString());
    let isDialod = chatsStorage.getChat(chatId).isDialog;
    messages = [...messages.entries()].sort()
    let messagesArray = [...messages]

    return (
        <div className={styles.wrapper}>
                <div className={styles.messages}>
                    {messagesArray.map((message, key) => <Message key={key} isDialog={isDialod} message={message}/>)}
                </div>
            <div>
                <SendMessagePanel chatId={chatId} />
            </div>
        </div>
    );
});

export default Dialog;