import React, {useContext, useState} from 'react';
import styles from "./ChatUsers.module.css"
import Search from "../Search/Search";
import {Context} from "../../index";
import ChatUserItem from "./ChatUserItem/ChatUserItem";
import {observer} from "mobx-react-lite";
import LoaderElement from "../CurrentChat/LoadChat/LoaderElement";

const ChatUsers = observer(({setActiveModal, chatId, users, chatUsers}) => {
    const {storage, authorizationStorage} = useContext(Context);
    const [search, setSearch] = useState("");
    let chat = storage.getChat(chatId);

    if (users.length === 0) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.chatName}>{chat.name}</div>
                <p className={styles.subtitle}>{chat.members} members</p>
                <Search className={styles.search} search={search} setSearch={setSearch} />
                <LoaderElement />

            </div>
        );
    }
    // Поиск по search
    let searchUsers = [];
    let myRole, myId;
    let check = true;
    users.forEach((user) => {
        if (user.getName().toLowerCase().includes(search.toLowerCase())) {
            searchUsers.push(user);
        }
        if (check) {
            let tempId = user.id;
            if (tempId === authorizationStorage.id) {
                check = false;
                myId = tempId;
                myRole = chatUsers.get(tempId).role;
            }
        }
    })


    return (
        <div className={styles.wrapper}>
            <div className={styles.chatName}>{chat.name}</div>
            <p className={styles.subtitle}>{chat.members} members</p>
            <Search className={styles.search} search={search} setSearch={setSearch} />
            <div className={styles.users} >
                {searchUsers.map((user, key) => <ChatUserItem myId={myId} myRole={myRole} key={key} user={user} chatUser={chatUsers.get(user.id)} />)}
            </div>
        </div>
    );
});

export default ChatUsers;