import React, {useState} from 'react';
import styles from "./Matrix.module.scss"

const Matrix = (props) => {
    const [inp11, setInp11] = useState("");
    const [inp12, setInp12] = useState("");
    const [inp13, setInp13] = useState("");

    const [inp21, setInp21] = useState("");
    const [inp22, setInp22] = useState("");
    const [inp23, setInp23] = useState("");

    const [inp31, setInp31] = useState("");
    const [inp32, setInp32] = useState("");
    const [inp33, setInp33] = useState("");

    function onChange(e, func) {
        func(e.target.value);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <input className={styles.inp} value={inp11} onChange={e => onChange(e, setInp11)} type="text"/>
                <input className={styles.inp} value={inp12} onChange={e => onChange(e, setInp12)} type="text"/>
                <input className={styles.inp} value={inp13} onChange={e => onChange(e, setInp13)} type="text"/>
            </div>
            <div className={styles.row}>
                <input className={styles.inp} value={inp21} onChange={e => onChange(e, setInp21)} type="text"/>
                <input className={styles.inp} value={inp22} onChange={e => onChange(e, setInp22)} type="text"/>
                <input className={styles.inp} value={inp23} onChange={e => onChange(e, setInp23)} type="text"/>
            </div>
            <div className={styles.row}>
                <input className={styles.inp} value={inp31} onChange={e => onChange(e, setInp31)} type="text"/>
                <input className={styles.inp} value={inp32} onChange={e => onChange(e, setInp32)} type="text"/>
                <input className={styles.inp} value={inp33} onChange={e => onChange(e, setInp33)} type="text"/>
            </div>
        </div>
    );
};

export default Matrix;