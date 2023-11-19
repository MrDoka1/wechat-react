import React from 'react';
import styles from "./Modal.module.css"
import {crossSVG} from "../../SVGs";

const Modal = ({active, setActive, children}) => {
    return (
        <div onClick={() => setActive(false)} className={active ? `${styles.modal} ${styles.active}` : styles.modal}>
            <div onClick={e => e.stopPropagation()} className={active ? `${styles.content} ${styles.active}` : styles.content}>
                <button className={styles.closeButton} onClick={()=>setActive(false)}>{crossSVG(25, "#fff")}</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;