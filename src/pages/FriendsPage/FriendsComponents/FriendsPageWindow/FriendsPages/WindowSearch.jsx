import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./WindowSearch.module.scss"
import {Context} from "../../../../../index";
import Search from "../../../../../components/Search/Search";
import EmptyUserItem from "../../../../../components/EmptyUserItem/EmptyUserItem";
import {observer} from "mobx-react-lite";

const WindowSearch = observer((props) => {
    const {storage} = useContext(Context);
    const [search, setSearch] = useState("");
    let list = storage.getSearchUsers();

    useEffect(()=>{
        storage.updateSearchUsers();
    }, [storage])

    //list = list.concat(list).concat(list).concat(list)

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

export default WindowSearch;