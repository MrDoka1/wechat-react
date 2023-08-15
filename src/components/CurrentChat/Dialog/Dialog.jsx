import React from 'react';
import styles from "./Dialog.module.css"
import SendMessagePanel from "./SendMessagePanel/SendMessagePanel";
import Message from "./Message/Message";

const Dialog = ({chatId}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.messages}>
                <Message for="me" />
                <Message for="m" />
                <Message for="me" />
                <Message for="m" />
                <Message for="m" />
                <Message for="me" />
                <Message for="me" />
                <Message for="me" />
                <Message for="me" />

            </div>
            <div>
                <SendMessagePanel chatId={chatId} />
            </div>
        </div>
    );
};

export default Dialog;