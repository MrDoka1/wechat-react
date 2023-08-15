import React, {useState} from 'react';
import styles from "./SendMessagePanel.module.css"

let svgButton = (<svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.11933 4.38421C6.32524 2.98547 3.22434 5.63695 4.17515 8.61184L5.26247 12.0138L4.18106 15.3845C3.22719 18.3576 6.32366 21.0124 9.11924 19.6182L18.0461 15.1663C20.6491 13.8682 20.6519 10.1575 18.0509 8.85543L9.11933 4.38421Z" fill="#fff"/>
</svg>)

let shiftTime = false;
let currentId = 0;
let draftMessages = new Map();

const SendMessagePanel = ({chatId}) => {
    const [value, setValue] = useState("");
    if (currentId !== chatId) {
        if (draftMessages.get(chatId) !== undefined) {
            setValue(draftMessages.get(chatId));
        } else {
            setValue("");
        }
    } else {
        draftMessages.set(chatId, value);
    }
    currentId = chatId;

    function onKeyDown(event) {
        if (event.keyCode === 13){
            if (!shiftTime) {
                sendMessage();
            }
        } else if (event.keyCode === 16) {
            shiftTime = true;
        }
    }
    function onKeyUp(event) {
        if (event.keyCode === 16) {
            shiftTime = false;
        }
    }
    let rows = value.split("\n").length;
    rows = rows > 10 ? 10 : rows;

    return (
        <div className={styles.wrapper}>
            <div className={styles.textarea}>
                <textarea rows={rows} className={styles.input} value={value} placeholder="Send message..." onChange={event => {
                    setValue(event.target.value);
                }} onKeyDown={event => onKeyDown(event)} onKeyUp={event => onKeyUp(event)}/>
            </div>
            <button className={styles.button} onClick={sendMessage}>{svgButton}</button>
        </div>
    );

    function sendMessage() {
        let message = value;
        while (message[0] === "\n" || message[0] === " ") {
            message = message.substring(1);
        }
        while (message[message.length-1] === "\n" || message[message.length-1] === " ") {
            message = message.substring(0, message.length-1);
        }
        if (message !== "") {
            console.log(message);
        }
        setTimeout(() => setValue(""), 1)
    }
};

export default SendMessagePanel;