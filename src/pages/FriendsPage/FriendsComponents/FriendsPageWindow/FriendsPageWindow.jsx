import React, {useContext} from 'react';
import styles from "./FriendsPageWindow.module.css"
import FriendsNavigation from "./FriendsNavigation/FriendsNavigation";
import {Context} from "../../../../index";
import LoaderElement from "../../../../components/CurrentChat/LoadChat/LoaderElement";
import {observer} from "mobx-react-lite";
import WindowSubscribers from "./FriendsPages/WindowSubscribers";
import WindowFriends from "./FriendsPages/WindowFriends";
import WindowSearch from "./FriendsPages/WindowSearch";

const FriendsPageWindow = observer(({path}) => {
    const {authorizationStorage, storage} = useContext(Context);

    if (!storage.hasUser(authorizationStorage.id)) {
        return (
            <div className={styles.wrapper}>
                <FriendsNavigation/>
                <LoaderElement />
            </div>
        );
    }

    switch (path) {
        case "subscribers":
            return (
                <div className={styles.wrapper}>
                    <FriendsNavigation/>
                    <WindowSubscribers />
                </div>
            );
        case "search":
            return (
                <div className={styles.wrapper}>
                    <FriendsNavigation/>
                    <WindowSearch/>
                </div>
            );
        default: // "friends"
            return (
                <div className={styles.wrapper}>
                    <FriendsNavigation/>
                    <WindowFriends />
                </div>
            );
    }
    /*return (
        <div className={styles.wrapper}>
            <FriendsNavigation/>
            <Routes>
                <Route path="/friends" element={<WindowFriends />}/>
                <Route path="/friends/subscribers" element={<WindowSubscribers />}/>
            </Routes>
        </div>
    );*/
});

export default FriendsPageWindow;