import React from 'react';
import styles from "./FriendsNavItem.module.scss"
import {NavLink} from "react-router-dom";

const FriendsNavItem = ({to, text, count = null}) => {
    if (count === null) {
        return (
            <NavLink end={true} to={to} className={({ isActive}) => isActive ? `${styles.active}` : ``}>
                <div className={styles.wrapper}>
                    <span className={styles.text}>{text}</span>
                </div>
            </NavLink>
        );
    }

    return (
        <NavLink end={true} to={to} className={({ isActive}) => isActive ? `${styles.active}` : ``}>
            <div className={styles.wrapper}>
                <span className={styles.text}>{text}</span>
                <div className={styles.count}>{count}</div>
            </div>
        </NavLink>
    );
};

export default FriendsNavItem;