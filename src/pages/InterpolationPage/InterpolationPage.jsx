import React, {useMemo, useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.scss";
import InputGroupModule from "../MathPage/InputGroupModule/InputGroupModule";
import InputModule from "../MathPage/InputGroupModule/InputModule/InputModule";
import Point from "./Point";

const InterpolationPage = (props) => {
    const [list, setList] = useState([{t:0, x:0, y:0}, {t:0, x:0, y:0}]);
    const [update, setUpdate] = useState(false);
    const [extraTime, setExtraTime] = useState("");
    const [interX, setInterX] = useState("");
    const [interY, setInterY] = useState("");

    /*let l = [0,1,3]
    l.splice(2, 0, 2)
    console.log(l)*/

    console.log(list)

    useMemo(()=> {
        calc();
    }, [extraTime, list]);

    function calc() {
        let length = list.length;

// Функция для создания многочлена первой степени
        function createLagrangePolynomial(x, xi, fi) {
            var x_diff = x - xi;
            return function(x) {
                return fi / (x_diff * (xi - x)).toFixed(2);
            };
        }

// Массив данных для интерполяции
        var data = [
            {x: 1, y: 4},
            {x: 2, y: -1},
            {x: 3, y: 5}
        ];

// Создаем многочлен Лагранжа
        var lagrangePolynomial = data.map(function(point) {
            return createLagrangePolynomial(point.x, point.x, point.y);
        });

        console.log("Многочлен Лагранжа:", lagrangePolynomial);
        console.log("Многочлен Лагранжа 1:", createLagrangePolynomial(data[0].x, data[0].x, data[0].y));
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
                    <InputModule subtitle="t" value={extraTime} setValue={setExtraTime}></InputModule>
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
                <InputModule subtitle="t" value={extraTime} setValue={setExtraTime}></InputModule>
                <InputModule subtitle="x" value={interX} disabled={true}></InputModule>
                <InputModule subtitle="y" value={interY} disabled={true}></InputModule>
                <div style={{height:"10px"}}></div>
                <button className={styles.button} onClick={calc}>Обновить</button>
            </InputGroupModule>
        </div>
    );
};

export default InterpolationPage;