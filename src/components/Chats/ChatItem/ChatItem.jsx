import React, {useContext} from 'react';
import styles from "./ChatItem.module.css"
import {NavLink} from "react-router-dom";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

const ChatItem = observer(({id, chat}) => {
    const {storage} = useContext(Context);

    let to = "/chats/" + id;

    let lastMessage = storage.getLastMessage(id.toString());
    lastMessage = lastMessage !== null ? lastMessage.text : "";

    if (id.toString().charAt(0) !== 'c') {
        let user = storage.getUser(chat.userId);
        let avatarText = user.firstname.charAt(0).concat(user.lastname.charAt(0));

        return (
            <NavLink className={({ isActive}) => isActive ? `${styles.active}` : ""} to={to} end>
                <div className={styles.wrapper}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar} style={{backgroundColor: user.color}}><p>{avatarText}</p></div>
                        <img className={styles.img} src={user.urlPhoto}  alt=""/>
                    </div>
                    <div className={styles.chatInfo}>
                        <div className={styles.chatName}>{user.getName()}</div>
                        <p className={styles.lastMessage}>{lastMessage}</p>
                    </div>

                </div>
            </NavLink>
        );
    }

    return (
        <NavLink className={({ isActive}) => isActive ? `${styles.active}` : ""} to={to} end>
            <div className={styles.wrapper}>
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}><p>{chat.name.charAt(0)}</p></div>
                    <img className={styles.img} src={chat.urlPhoto}  alt=""/>
                </div>
                <div className={styles.chatInfo}>
                    <div className={styles.chatName}>{chat.name}</div>
                    <p className={styles.lastMessage}>{lastMessage}</p>
                </div>

            </div>
        </NavLink>
    );
});

export default ChatItem;