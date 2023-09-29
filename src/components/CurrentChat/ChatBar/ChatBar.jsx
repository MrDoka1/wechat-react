import React from 'react';
import styles from "./ChatBar.module.css";
import Modal from "../../Modal/Modal";

const ChatBar = ({name, onlineString, statusActive, activeModal, setActiveModal}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftColumn}>
                {name}
                <div className={styles.onlineStatus + " " + statusActive}>{onlineString}</div>
            </div>
            <div>

            </div>
            <Modal active={activeModal} setActive={setActiveModal}></Modal>
        </div>
    );
};

export default ChatBar;