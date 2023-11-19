import React, {useContext} from 'react';
import styles from "./FriendsNavigation.module.scss"
import FriendsNavItem from "./FriendsNavItem";
import {Context} from "../../../../../index";

const FriendsNavigation = (props) => {
    const {authorizationStorage, storage} = useContext(Context);

    if (!storage.hasUser(authorizationStorage.id)) {
        return (
            <div className={styles.wrapper}>
                <FriendsNavItem to="/friends" text="Друзья" />
                <FriendsNavItem to="/friends/subscribers" text="Подписчики" />
                <FriendsNavItem to="/friends/search" text="Поиск друзей" />
            </div>
        );
    }

    const user = storage.getUser(authorizationStorage.id);

    return (
        <div className={styles.wrapper}>
            <FriendsNavItem to="/friends" text="Друзья" count={user.getQtyFriends()} />
            <FriendsNavItem to="/friends/subscribers" text="Подписчики" count={user.getQtySubscribers()} />
            <FriendsNavItem to="/friends/search" text="Поиск друзей" />

        </div>
    );
};

export default FriendsNavigation;