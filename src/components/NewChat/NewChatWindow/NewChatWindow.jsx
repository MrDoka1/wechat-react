import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./NewChatWindow.module.scss";
import Search from "../../Search/Search";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import AddUserNewChatItem from "./AddUserNewChatItem/AddUserNewChatItem";

const NewChatWindow = observer(({setNewChatWindow}) => {
    const {authorizationStorage, storage} = useContext(Context);
    const [name, setName] = useState("");
    const [isPrivateChat, setIsPrivateChat] = useState(false);
    const [search, setSearch] = useState("");
    const [selectUsers, setSelectUsers] = useState(new Set()); // Без useState не работает
    const [update, setUpdate] = useState(false);
    const [errorName, setErrorName] = useState(false);
    let errorNameStyle = errorName ? styles.error : "";
    let user = storage.getUser(authorizationStorage.id);
    let list = storage.getUsers(user.friendsIds);

    useEffect(()=>{
        storage.updateMyFriends(user);
        let ids = user.friendsIds;
        storage.getAndUpdateUsers(ids);
        list = storage.getUsers(ids);
    }, []);

    function updateSelectedUsers(id) {
        if (selectUsers.has(id)) {
            selectUsers.delete(id)
        } else {
            selectUsers.add(id)
        }
        setUpdate(!update)
        console.log(selectUsers)
    }

    // Сброс
    function reset() {
        setNewChatWindow(false);
        setName("");
        setIsPrivateChat(false);
        setSelectUsers(new Set());
    }

    function createChat() {
        if (name.replaceAll(" ", "") !== "") {
            storage.createChat(name, isPrivateChat, selectUsers, reset);
        } else {
            setErrorName(true);
        }
    }

    const searchUsers = useMemo(() => {
        if (search.replaceAll(" ", "") === "") {
            return list
        }
        let newList = [];
        list.forEach(user => {
            if (user.getName().toLowerCase().includes(search.toLowerCase())) {
                newList.push(user);
            }
        });
        return newList;
    },[list, search]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Create chat</div>
            <input value={name} onChange={event => {
                setName(event.target.value);
                setErrorName(false);
            }}
                   className={[styles.input, errorNameStyle].join(" ")} type="text" placeholder="Name"/>

            <div className={styles.switch_line}>
                <input value={isPrivateChat} onChange={e => setIsPrivateChat(!isPrivateChat)} type="checkbox" className={styles.switch} id="swith"/>
                <label className={styles.label} htmlFor="swith"></label>
                Private chat
            </div>
            <span className={styles.selected}>Selected users: {selectUsers.size}</span>
            <Search className={styles.search} search={search} setSearch={setSearch}/>
            <div className={styles.users}>
                {searchUsers.map(user => <AddUserNewChatItem user={user} selectUsers={selectUsers} updateSelectedUsers={updateSelectedUsers} />)}
            </div>
            <button onClick={createChat} className={styles.buttonCreate}>Create chat</button>
        </div>
    );
});

export default NewChatWindow;