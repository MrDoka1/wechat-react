import React, {useContext} from 'react';
import {Context} from "../../index";
import ChatUsers from "./ChatUsers";
import {observer} from "mobx-react-lite";

const ChatUserLogic = observer(({setActiveModal, activeModal, chatId}) => {
    const {storage} = useContext(Context);

    let users = [];
    let chatUsers;

    if (activeModal) {
        chatUsers = storage.getChat(chatId).chatUsers;
        if (chatUsers.size === 0) {
            storage.getNewChatUsers(chatId);
            chatUsers = storage.getChat(chatId).chatUsers;
        }
        chatUsers.forEach((chatUser, key) => users.push(storage.getUser(chatUser.id)));
    }

    //users = users.concat(users).concat(users).concat(users).concat(users)

    return (
        <ChatUsers setActiveModal={setActiveModal} chatId={chatId} chatUsers={chatUsers} users={users} />
    );
});

export default ChatUserLogic;