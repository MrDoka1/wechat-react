import React, {useContext, useState} from 'react';
import styles from "./NewChatWindow.module.scss"
import Search from "../../Search/Search";
import {Context} from "../../../index";

const NewChatWindow = (props) => {
    const {authorizationStorage, storage} = useContext(Context);
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const user = storage.getUser(authorizationStorage.id);

    // Только когда подгрузились данные о пользователе
    if (user !== undefined) {
        const list = user.friendsIds;
        console.log(storage)
        let listUsers;
        storage.getAndUpdateUsers(list).then(data => listUsers = data);
        console.log(listUsers)
    }



    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Create chat</div>
            <input className={styles.input} type="text" placeholder="Name"/>

            <div className={styles.switch_line}>
                <input value={name} onChange={e => setName(e.target.value)} type="checkbox" className={styles.switch} id="swith"/>
                <label className={styles.label} htmlFor="swith"></label>
                Private chat
            </div>

            <Search className={styles.search} search={search} setSearch={setSearch}/>
            <div>

            </div>
        </div>
    );
};

export default NewChatWindow;