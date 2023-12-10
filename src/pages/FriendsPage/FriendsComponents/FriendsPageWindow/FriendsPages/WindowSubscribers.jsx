import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./WindowSubscribers.module.css";
import {Context} from "../../../../../index";
import Search from "../../../../../components/Search/Search";
import EmptyUserItem from "../../../../../components/EmptyUserItem/EmptyUserItem";
import {observer} from "mobx-react-lite";

const WindowSubscribers = observer((props) => {
    const {authorizationStorage, storage} = useContext(Context);
    const [search, setSearch] = useState("");

    let user = storage.getUser(authorizationStorage.id);
    let list = storage.getUsers(user.subscribersIds);

    useEffect(()=> {
        storage.updateMySubscribers(user);
        let ids = user.subscribersIds;
        storage.getAndUpdateUsers(ids);
        list = storage.getUsers(ids);
    },[])

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
            <Search search={search} setSearch={setSearch}/>
            <div className={styles.users}>
                {searchUsers.map(user => <EmptyUserItem user={user} />)}
            </div>
        </div>
    );
});

export default WindowSubscribers;