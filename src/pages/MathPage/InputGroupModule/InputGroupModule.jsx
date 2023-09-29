import React from 'react';
import styles from "../../ArtaPage/GroupCoordinates/GroupCoordinates.module.css"

const InputGroupModule = ({children, title}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            {children}
        </div>
    );
};

export default InputGroupModule;