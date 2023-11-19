import React, {useEffect, useMemo, useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.scss";
import InputGroupModule from "../MathPage/InputGroupModule/InputGroupModule";
import InputModule from "../MathPage/InputGroupModule/InputModule/InputModule";
import Result from "../ArtaPage/ResultPanel/Result/Result";
import Point from "./Point";
import GroupCoordinates from "../ArtaPage/GroupCoordinates/GroupCoordinates";

const ExtrapolationPage = (props) => {
    const [list, setList] = useState([{t:0, x:0, y:0, z:0}, {t:0, x:0, y:0, z:0}]);
    const [update, setUpdate] = useState(false);
    const [extraTime, setExtraTime] = useState("");
    const [extraX, setExtraX] = useState("");
    const [extraY, setExtraY] = useState("");
    const [extraZ, setExtraZ] = useState("");

    /*let l = [0,1,3]
    l.splice(2, 0, 2)
    console.log(l)*/

    console.log(list)

    useMemo(()=> {
        calc();
    }, [extraTime, list]);

    function calc() {
        let length = list.length;
        console.log("mmm", length === 2)
        if (length === 2) {
            console.log(Number(extraTime))
            setExtraX(list[0].x + (Number(extraTime)-list[0].t)/(list[1].t - list[0].t) * (list[1].x - list[0].x))
        }
        // x(t)
        //Y(1)+ (x-x(1)/x(2)-x(1)) * (Y(2) – Y(1))
    }

    function add(index) {
        let newList = list;
        newList.splice(index+1, 0, {t:0, x:0, y:0, z:0})
        setList(newList);
        setUpdate(!update);
        list.map(value => console.log(value))
    }

    function del(index) {
        console.log(index, list[index])
        let newList = list;
        newList.splice(index, 1);
        setList(newList);
        setUpdate(!update);
    }

    function updateT(index, value) {
        let newList = list;
        newList[index].t = value;
        setList(newList);
    }
    function updateX(index, value) {
        let newList = list;
        newList[index].x = value;
        setList(newList);
    }
    function updateY(index, value) {
        let newList = list;
        newList[index].y = value;
        setList(newList);
    }
    function updateZ(index, value) {
        let newList = list;
        newList[index].z = value;
        setList(newList);
    }

    // ** Из-за неправильного рендеринга **
    if (update) {
        setTimeout(()=> setUpdate(false), 1);
        return (
            <div className={`${styles.wrapper} ${styles.math}`}>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {list.map((v, k) => <Point value={{t:0, x:0, y:0, z:0}}/>)}
                </div>
                <InputGroupModule title="Экстраполяция">
                    <InputModule subtitle="t" value={extraTime} setValue={setExtraTime}></InputModule>
                    <InputModule subtitle="x" value={extraX} disabled={true}></InputModule>
                    <InputModule subtitle="y" value={extraY} disabled={true}></InputModule>
                    <InputModule subtitle="z" value={extraZ} disabled={true}></InputModule>
                    <div style={{height:"10px"}}></div>
                    <button className={styles.button} onClick={calc}>Обновить</button>
                </InputGroupModule>
        </div>)
    }
    // ** --- **

    const deletePoint = list.length !== 2;


    return (
        <div className={`${styles.wrapper} ${styles.math}`}>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {list.map((v, k) => <Point key={k} value={v} index={k} add={add} del={del} updateT={updateT} updateX={updateX} updateY={updateY} updateZ={updateZ} deletePoint={deletePoint}/>)}
            </div>
            <InputGroupModule title="Экстраполяция">
                <InputModule subtitle="t" value={extraTime} setValue={setExtraTime}></InputModule>
                <InputModule subtitle="x" value={extraX} disabled={true}></InputModule>
                <InputModule subtitle="y" value={extraY} disabled={true}></InputModule>
                <InputModule subtitle="z" value={extraZ} disabled={true}></InputModule>
                <div style={{height:"10px"}}></div>
                <button className={styles.button} onClick={calc}>Обновить</button>
            </InputGroupModule>
        </div>
    );
};

export default ExtrapolationPage;