import React, {useState} from 'react';
import styles from "./ArtaPage.module.css"
import GroupCoordinates from "./GroupCoordinates/GroupCoordinates";
import ResultPanel from "./ResultPanel/ResultPanel";
import Graphic from "./Graphic/Graphic";

const ArtaPage = (props) => {
    const [firingPositionX, firingPositionXSet] = useState("");
    const [firingPositionY, firingPositionYSet] = useState("");

    const [observationPostX, observationPostXSet] = useState("");
    const [observationPostY, observationPostYSet] = useState("");

    const [targetP, targetPSet] = useState("");
    const [targetU, targetUSet] = useState("");


    let fPX = Number(firingPositionX);
    let fPY = Number(firingPositionY);
    let oPX = Number(observationPostX);
    let oPY = Number(observationPostY);
    let tP = Number(targetP);
    let tU = Number(targetU);

    // Отн. наблюдателя
    let x = tP * Math.cos(tU / 180 * Math.PI);
    let y = tP * Math.sin(tU / 180 * Math.PI);

    console.log(x, y)

    // Отн. артилерии
    x = oPX - fPX + x;
    y = oPY - fPY + y;

    console.log(x, y)

    let one = y===0 ? 1 : y/Math.abs(y);

    let valueP = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    let valueU = valueP !== 0 ? Math.acos(x / valueP) * one : 0;

    let data = [10, 5, 4, 7, 1, 1]

    return (
        <div className={styles.wrapper}>
            <GroupCoordinates text="Огневая позиция" cord1="x" cord2="y" cord1Value={firingPositionX} cord1Set={firingPositionXSet} cord2Value={firingPositionY} cord2Set={firingPositionYSet} />
            <GroupCoordinates text="Наблюдатель" cord1="x" cord2="y" cord1Value={observationPostX} cord1Set={observationPostXSet} cord2Value={observationPostY} cord2Set={observationPostYSet} />
            <GroupCoordinates text="Цель" cord1="p" cord2="u" cord1Value={targetP} cord1Set={targetPSet} cord2Value={targetU} cord2Set={targetUSet} />

            <ResultPanel valueP={valueP} valueU={valueU} />
            <Graphic data={data} fPX={fPX} fPY={fPY} oPX={oPX} oPY={oPY} tX={x} tY={y}/>
        </div>
    );
};

export default ArtaPage;