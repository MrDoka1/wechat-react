import React from 'react';
import styles from "./ResultPanel.module.css"
import Result from "./Result/Result";

const ResultPanel = ({valueP, valueU}) => {

    let grad = valueU / Math.PI * 180;

    let secondArt = Math.abs(parseInt((grad / 6 - parseInt(grad / 6)) * 100));
    secondArt = secondArt < 10 ? "0" + secondArt : secondArt;

    let firstArt = parseInt(grad / 6);
    console.log(parseInt(grad / 6))
    firstArt = Math.abs(firstArt) < 10 ? "0" + firstArt : firstArt;

    let art = firstArt + "-" + secondArt;

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Результат</div>
            <Result text="P" value={valueP}/>
            <Result text="U рад" value={valueU}/>
            <Result text="U град" value={grad}/>
            <Result text="U арт" value={art}/>

        </div>
    );
};

export default ResultPanel;