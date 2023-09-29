import React from 'react';
import styles from "./Coordinate.module.css"

const Coordinate = ({text, value, set}) => {
    return (
        <div className={styles.wrapper}>
            <p>{text}</p>
            <input type="number" className={styles.inp} value={value} onChange={event => set(event.target.value)}/>
        </div>
    );
};

export default Coordinate;