import React from 'react';
import styles from "./ChatItem.module.css"
import {NavLink} from "react-router-dom";

const ChatItem = ({chat}) => {
    return (
        <NavLink className={({ isActive}) => isActive ? `${styles.active}` : ""} to={"/chats/" + chat.id} end>
            <div className={styles.wrapper}>
                <img className={styles.img} src={chat.img}  alt=""/>
                <div className={styles.chatInfo}>
                    <div className={styles.chatName}>{chat.name}</div>
                    <p className={styles.lastMessage}>Last message jhdjfhskdjhncsdj</p>
                </div>

            </div>
        </NavLink>
    );
};

export default ChatItem;