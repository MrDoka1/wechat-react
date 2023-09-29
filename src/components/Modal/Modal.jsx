import React from 'react';
import styles from "./Modal.module.css"

const Modal = ({active, setActive, children}) => {
    return (
        <div onClick={() => setActive(false)} className={active ? `${styles.modal} ${styles.active}` : styles.modal}>
            <div onClick={e => e.stopPropagation()} className={active ? `${styles.content} ${styles.active}` : styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Modal;