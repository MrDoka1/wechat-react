import React, {useEffect, useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.css"
import InputGroupModule from "./InputGroupModule/InputGroupModule";
import InputModule from "./InputGroupModule/InputModule/InputModule";
import moduleStyles from "./InputGroupModule/InputModule/InputModule.module.css";
import Result from "../ArtaPage/ResultPanel/Result/Result";

const MathPage = (props) => {
    const [inputX, setInputX] = useState("");
    const [inaccuracy, setInaccuracy] = useState("");
    const [functionX, setFunctionX] = useState("sin");
    const [summa, setSumma] = useState(0);

    useEffect(() => {
        let x = Number(inputX);
        let ina = Number(inaccuracy);

        let sum;
        let i;
        let factorial;
        let degree;
        let flag = -1;

        if (functionX === "sin") {
            sum = x;
            factorial = x;
            i = 3;
            degree = 6;
        } else {
            sum = 1;
            factorial = 1;
            i = 2;
            degree = 2;
        }
        while (x > 2*Math.PI) {
            x -= 2*Math.PI;
        }
        console.log(sum, x)
        while (i < 20) {
            console.log(sum, flag * degree / factorial)
            sum += flag * degree / factorial;
            i += 2;
            degree *= x * x;
            factorial *= (i+1) * (i+2);
            flag *= -1;
        }
        setSumma(sum);
    }, [inputX, inaccuracy, functionX])


    let select = (
        <select name="function" value={functionX} onChange={e => setFunctionX(e.target.value)} className={moduleStyles.select}>
            <option value="sin">sin(x)</option>
            <option value="cos">cos(x)</option>
        </select>
    )

    return (
        <div className={`${styles.wrapper} ${styles.math}`}>
            <InputGroupModule title="Функция">
                <InputModule type="select" select={select} />
                <InputModule value={inputX} setValue={setInputX} subtitle="x" />
                <InputModule value={inaccuracy} setValue={setInaccuracy} subtitle="b" />
            </InputGroupModule>
            <InputGroupModule title="Результат">
                <Result text={functionX + "(x)"} value={summa}/>
            </InputGroupModule>
        </div>
    );
};

export default MathPage;