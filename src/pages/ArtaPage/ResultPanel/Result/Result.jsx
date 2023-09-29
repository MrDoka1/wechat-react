import React from 'react';
import styles from "./Result.module.css"

const Result = ({text, value}) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>{text}</p>
            <div className={styles.value}>{value}</div>
        </div>
    );
};

export default Result;