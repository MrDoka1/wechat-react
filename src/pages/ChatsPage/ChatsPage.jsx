import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./ChatsPage.module.css";
import Chats from "../../components/Chats/Chats";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import Search from "../../components/Search/Search";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import {useMediaQuery} from "react-responsive";
import NewChat from "../../components/NewChat/NewChat";
import {observer} from "mobx-react-lite";
import LoadChat from "../../components/CurrentChat/LoadChat/LoadChat";

let firstLoad = true;
const ChatsPage = observer((props) => {
    const {chatsStorage} = useContext(Context);
    const isSingleViewing = useMediaQuery({ query: `(max-width: 1000px)` });
    let {id} = useParams();

    const [search, setSearch] = useState("");
    let [check, setCheck] = useState();

    if (firstLoad) {
        [check, setCheck] = useState(false);
    } else {
        [check, setCheck] = useState(true);
    }
    

    useEffect(() => {
        if (firstLoad) {
            firstLoad = false;
            chatsStorage.updateChats(setCheck);
        }
    }, [chatsStorage, setCheck]);

    const searchChats = useMemo(() => {
        if (search === "") {
            return chatsStorage.chats;
        } else {
            let searchChats = new Map();
            console.log(chatsStorage.chats)
            chatsStorage.chats.forEach((chat, key) => {
                if (key.toString().charAt(0) !== 'c') {
                    if (chatsStorage.getUser(chat.userId).getName().toLowerCase().includes(search.toLowerCase())) {
                        searchChats.set(key, chat);
                    }
                } else if (chat.name.toLowerCase().includes(search.toLowerCase())) {
                    searchChats.set(key, chat);
                }
            })
            return searchChats;
        }
    }, [chatsStorage, search]);

    if (!check) {
        return <LoadChat />
    }

    // ***** Проверка на наличие чата *****
    let currentChat = "";
    if (id !== undefined && id.charAt(0) !== "c") {
        id = Number(id);
    }
    console.log(chatsStorage.chats.has(id))
    if (id !== undefined && chatsStorage.chats.has(id)) {
        currentChat = <CurrentChat chatId={id}/>;
        if (isSingleViewing) {
            return (
                <div className="page">
                    <NavBar />
                    <div className={styles.wrapper}>
                        {currentChat}
                    </div>
                </div>
            );
        }
    } else {
        if (isSingleViewing) {
            return (
                <div className="page">
                    <NavBar />
                    <div className={styles.wrapper}>
                        <div>
                            <div className={styles.topBar}>
                                <Search search={search} setSearch={setSearch} />
                                <NewChat />
                            </div>
                            <Chats chats={searchChats} />
                        </div>
                    </div>
                </div>
            );
        }
    }


    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>
                <div>
                    <div className={styles.topBar}>
                        <Search search={search} setSearch={setSearch} />
                        <NewChat />
                    </div>
                    <Chats chats={searchChats} />
                </div>
                {currentChat}
            </div>
        </div>
    );
});

export default ChatsPage;