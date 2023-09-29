import React from 'react';
import styles from "./InputModule.module.css"

const InputModule = ({value, setValue, type = "number", title, subtitle, select}) => {
    if (type === "select") {
        return (
            <div className={styles.wrapper}>
                <div className={styles.subtitle}>{subtitle}</div>
                {select}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.subtitle}>{subtitle}</div>
            <input value={value} onChange={e => setValue(e.target.value)} className={styles.inp} type={type} />
        </div>
    );
};

export default InputModule;