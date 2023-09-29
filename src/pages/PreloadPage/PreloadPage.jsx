import React from 'react';
import styles from "./PreloadPage.module.css"

const PreloadPage = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>Connecting to server
                <span className={styles.dots}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
        </div>
    //<div className={styles.dot}></div>
    );
};

export default PreloadPage;