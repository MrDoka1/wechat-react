import React from 'react';
import styles from "./LoadChat.module.scss"

const LoaderElement = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.donut}></div>
        </div>
    );
};

export default LoaderElement;