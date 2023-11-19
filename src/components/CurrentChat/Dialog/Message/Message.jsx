import React, {useContext} from 'react';
import styles from "./Message.module.css"
import {Context} from "../../../../index";
import {Link} from "react-router-dom";

const Message = ({isDialog, message}) => {
    const {authorizationStorage, storage} = useContext(Context);
    const {usersStorage} = useContext(Context);

    message = message[1]

    let iSender = message.senderId === authorizationStorage.id;
    let forWho = iSender ? styles.forThem : styles.forMe;
    let name = isDialog ? "" : (iSender ? "" : storage.getUser(message.senderId).firstname);

    let lineName = "";
    if (name !== "") {
        let user = storage.getUser(message.senderId);
        let to = "/profile/" + user.id; // -------------------------------- Поменять на ник
        lineName = <Link to={to} style={{color: user.color}}><b>{name}</b></Link>;
    }


    let date = new Date(message.time);
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = date.getHours() + ":" + minutes;

    return (
        <div className={`${styles.wrapper} ${forWho}`}>
            <svg className={styles.tail} xmlns="http://www.w3.org/2000/svg" width="10.953" height="11.281" viewBox="0 0 262 270" fill="none" stroke="#574e68">
                <path d="M261.512 0.5V269.5H10.5066C-2.9999 269.5 -2.5 253.5 10.0007 248C10.0007 248 230.993 162.214 260.476 6.5C260.853 4.51001 261.199 2.50999 261.512 0.5Z" fill="#574e68"/>
            </svg>
            <div className={`${styles.body}`}>
                <div>
                    <div>{lineName}</div>
                    <span>{message.text}</span>
                </div>
                <div className={styles.time}>{time}</div>
            </div>
        </div>
    );
};

export default Message;