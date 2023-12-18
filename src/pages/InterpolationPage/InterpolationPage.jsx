import React, {useMemo, useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.scss";
import InputGroupModule from "../MathPage/InputGroupModule/InputGroupModule";
import InputModule from "../MathPage/InputGroupModule/InputModule/InputModule";
import Point from "./Point";

const InterpolationPage = (props) => {
    const [list, setList] = useState([{t:0, x:0, y:0}, {t:0, x:0, y:0}]);
    const [update, setUpdate] = useState(false);
    const [iterTime, setIterTime] = useState("");
    const [interX, setInterX] = useState("");
    const [interY, setInterY] = useState("");

    console.log(list)

    useMemo(()=> {
        calc();
    }, [iterTime, list]);

    function calc() {
        let length = list.length;
        let coefficients = lagrange(list);
        console.log(coefficients)
        let answerX = 0;
        for (let i = 0; i < coefficients.length; i++) {
            answerX += coefficients[i] * Math.pow(Number(iterTime), ++i);
        }
        setInterX(answerX);
    }

    function lagrange(points) {
        // Определим степень многочлена
        const n = points.length - 1;

        // Создадим массив коэффициентов многочлена
        /*const coefficients = [];
        for (let i = 0; i <= n; i++) {
            coefficients[i] = 1;
        }*/
        const coefficients = new Array(n + 1).fill(1);

        // Пройдемся по всем точкам
        for (let i = 1; i <= n; i++) {
            // Для каждой точки определим произведение
            for (let j = 0; j < i; j++) {
                coefficients[i] *= (points[i].x - points[j].x);
            }

            // Для каждой точки определим множитель
            for (let j = i + 1; j <= n; j++) {
                coefficients[j] *= (points[j].x - points[i].x);
            }
        }

        // Вернем массив коэффициентов
        return coefficients;
    }

    function add(index) {
        let newList = list;
        newList.splice(index+1, 0, {t:0, x:0, y:0})
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

    // ** Из-за неправильного рендеринга **
    if (update) {
        setTimeout(()=> setUpdate(false), 1);
        return (
            <div className={`${styles.wrapper} ${styles.math}`}>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {list.map((v, k) => <Point key={k} index={k} value={{t:0, x:0, y:0}}/>)}
                </div>
                <InputGroupModule title="Интерполяция">
                    <InputModule subtitle="t" value={iterTime} setValue={setIterTime}></InputModule>
                    <InputModule subtitle="x" value={interX} disabled={true}></InputModule>
                    <InputModule subtitle="y" value={interY} disabled={true}></InputModule>
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
                {list.map((v, k) => <Point key={k} value={v} index={k} add={add} del={del} updateT={updateT} updateX={updateX} updateY={updateY} deletePoint={deletePoint}/>)}
            </div>
            <InputGroupModule title="Интерполяция">
                <InputModule subtitle="t" value={iterTime} setValue={setIterTime}></InputModule>
                <InputModule subtitle="x" value={interX} disabled={true}></InputModule>
                <InputModule subtitle="y" value={interY} disabled={true}></InputModule>
                <div style={{height:"10px"}}></div>
                <button className={styles.button} onClick={calc}>Обновить</button>
            </InputGroupModule>
        </div>
    );
};

export default InterpolationPage;