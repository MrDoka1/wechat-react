import React from 'react';
import styles from "./FriendsPage.module.css"
import NavBar from "../../components/NavBar/NavBar";
import FriendsPageWindow from "./FriendsComponents/FriendsPageWindow/FriendsPageWindow";
import {observer} from "mobx-react-lite";

const FriendsPage = observer(({path}) => {
    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>
                <FriendsPageWindow path={path}/>
            </div>
        </div>
    );
});

export default FriendsPage;