import React, {useState} from 'react';
import styles from "./NewChatWindow.module.css"

const NewChatWindow = (props) => {
    const [name, setName] = useState("")

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Create chat</div>
            <input className={styles.input} type="text" placeholder="Name"/>

            <div className={styles.switch_line}>
                <input value={name} onChange={e => setName(e.target.value)} type="checkbox" className={styles.switch} id="swith"/>
                <label className={styles.label} htmlFor="swith"></label>
                Private chat
            </div>

        </div>
    );
};

export default NewChatWindow;