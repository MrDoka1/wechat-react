import React from 'react';
import styles from "./ChatBar.module.css";
import Modal from "../../Modal/Modal";
import ChatUserLogic from "../../ChatUsersInModal/ChatUserLogic";
import {observer} from "mobx-react-lite";

const ChatBar = observer(({chatId, name, onlineString, statusActive, activeModal, setActiveModal}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftColumn}>
                {name}
                <div className={styles.onlineStatus + " " + statusActive}>{onlineString}</div>
            </div>
            <div>

            </div>
            <Modal active={activeModal} setActive={setActiveModal}><ChatUserLogic setActiveModal={setActiveModal} activeModal={activeModal} chatId={chatId}/></Modal>
        </div>
    );
});

export default ChatBar;