import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./ChatsPage.module.scss";
import Chats from "../../components/Chats/Chats";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
import Search from "../../components/Search/Search";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import {useMediaQuery} from "react-responsive";
import NewChat from "../../components/NewChat/NewChat";
import {observer} from "mobx-react-lite";
import LoaderElement from "../../components/CurrentChat/LoadChat/LoaderElement";

let firstLoad = true;
const ChatsPage = observer((props) => {
    const {storage} = useContext(Context);
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
            storage.updateChats(setCheck);
        }
    }, [storage, setCheck]);

    const searchChats = useMemo(() => {
        if (search === "") {
            return storage.chats;
        } else {
            let searchChats = new Map();
            console.log(storage.chats)
            storage.chats.forEach((chat, key) => {
                if (key.toString().charAt(0) !== 'c') {
                    if (storage.getUser(chat.userId).getName().toLowerCase().includes(search.toLowerCase())) {
                        searchChats.set(key, chat);
                    }
                } else if (chat.name.toLowerCase().includes(search.toLowerCase())) {
                    searchChats.set(key, chat);
                }
            })
            return searchChats;
        }
    }, [storage, search]);

    if (!check) {
        return (
            <div className="page">
                <NavBar />
                <div className={styles.wrapper}>
                    <div>
                        <div className={styles.topBar}>
                            <Search className={styles.search} search={search} setSearch={setSearch} />
                            <NewChat />
                        </div>
                        <LoaderElement />
                    </div>
                </div>
            </div>
        );
    }

    // ***** Проверка на наличие чата *****
    let currentChat = "";
    if (id !== undefined && id.charAt(0) !== "c") {
        id = Number(id);
        // Если диалога нет, то создадим локально
        if (!storage.hasChat(id)) {
            storage.addLocalDialog(id);
        }
    }


    if (id !== undefined && storage.hasChat(id)) {
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
                                <Search className={styles.search} search={search} setSearch={setSearch} />
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
                        <Search className={styles.search} search={search} setSearch={setSearch} />
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