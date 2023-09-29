import React from 'react';
import styles from "./GroupCoordinates.module.css"
import Coordinate from "./Coordinate/Coordinate";

const GroupCoordinates = ({text, cord1, cord2, cord1Value, cord1Set, cord2Value, cord2Set}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{text}</div>
            <Coordinate text={cord1} value={cord1Value} set={cord1Set}/>
            <Coordinate text={cord2} value={cord2Value} set={cord2Set}/>

        </div>
    );
};

export default GroupCoordinates;