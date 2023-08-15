import React, {useContext, useMemo, useState} from 'react';
import styles from "./ChatsPage.module.css";
import Chats from "../../components/Chats/Chats";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import Search from "../../components/Search/Search";
import {Context} from "../../index";
import {useLocation} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const ChatsPage = (props) => {

    const {chats} = useContext(Context);
    let location = useLocation();
    let pathId = location.pathname.substring(7);
    let currentChat = "";
    if (pathId !== "" && chats.chats.has(Number(pathId))) {
        let currentId = Number(pathId);
        currentChat = <CurrentChat chatId={currentId}/>;
    }



    const [search, setSearch] = useState("");

    const searchChats = useMemo(() => {
        if (search === "") {
            return chats.chats;
        } else {
            let searchChats = new Map();
            chats.chats.forEach((chat, key) => {
                if (chat.name.toLowerCase().includes(search.toLowerCase())) {
                    searchChats.set(key, chat);
                }
            })
            return searchChats;
        }}, [chats, search]);


    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>
                <div>
                    <Search search={search} setSearch={setSearch} />
                    <Chats chats={searchChats} />
                </div>
                {currentChat}
            </div>
        </div>
    );
};

export default ChatsPage;