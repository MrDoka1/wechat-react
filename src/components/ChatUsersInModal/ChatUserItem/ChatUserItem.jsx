import React from 'react';
import styles from "./ChatUserItem.module.css"
import Avatar from "../../Avatar/Avatar";
import {Link} from "react-router-dom";
import {crossSVG} from "../../../SVGs";

const ChatUserItem = ({myId, myRole, user, chatUser}) => {
    let role = chatUser.role;
    role = role === "PARTICIPANT" ? "" : role.toLowerCase();
    if (myId === user.id) {

    }

    return (
        <div className={styles.wrapper}>
            <Avatar user={user} />
            <div>
                <Link to={"/profile/" + user.id} className={styles.name}>{user.getName()}</Link>
                <div className={styles.role} content={role}>{role}</div>
            </div>
            <div className={styles.actions}>
                {crossSVG(25, "#f00")}
            </div>

        </div>
    );
};

export default ChatUserItem;