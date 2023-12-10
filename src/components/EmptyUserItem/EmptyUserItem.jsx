import React from 'react';
import styles from "./EmptyUserItem.module.scss"
import Avatar from "../Avatar/Avatar";
import {Link} from "react-router-dom";

const EmptyUserItem = ({user, classNames, children, onclick = ()=>{}, disableNameLink=false}) => {
    if (disableNameLink) {
        return (
            <div className={[styles.wrapper, classNames].join(" ")} onClick={onclick}>
                <Avatar user={user} />
                <div className={styles.name}>{user.getName()}</div>
                <div>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className={[styles.wrapper, classNames].join(" ")} onClick={onclick}>
            <Avatar user={user} />
            <Link to={"/profile/" + user.id} className={styles.name}>{user.getName()}</Link>
            <div>
                {children}
            </div>
        </div>
    );
};

export default EmptyUserItem;