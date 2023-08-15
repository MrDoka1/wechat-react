import React from 'react';
import ChatItem from "./ChatItem/ChatItem";
// import styles from "./Chats.module.css"

const Chats = ({chats}) => {
    let chatsArray = [];
    chats.forEach((chat, key) => chatsArray.push(chat));

    return (
        <div >
            {chatsArray.map(chat => <ChatItem key={chat.id} chat={chat}/>)}
        </div>
    );
};

export default Chats;