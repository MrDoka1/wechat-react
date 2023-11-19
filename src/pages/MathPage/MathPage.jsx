import React, {useEffect, useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.scss";
import InputGroupModule from "./InputGroupModule/InputGroupModule";
import InputModule from "./InputGroupModule/InputModule/InputModule";
import moduleStyles from "./InputGroupModule/InputModule/InputModule.module.css";
import Result from "../ArtaPage/ResultPanel/Result/Result";

const MathPage = (props) => {
    const [inputX, setInputX] = useState("");
    const [inputXGrad, setInputXGrad] = useState("");
    const [inaccuracy, setInaccuracy] = useState("");
    const [functionX, setFunctionX] = useState("sin");
    const [summa, setSumma] = useState(0);

    function setInputXF(value) {
        setInputX(value);
        if (value === "") {
            setInputXGrad(0);
        } else {
            setInputXGrad(Math.round(Number(inputX)/Math.PI*180));
        }
    }
    function setInputXGradF(value) {
        setInputXGrad(value);
        setInputX((Number(value)/180*Math.PI).toFixed(5));
    }

    useEffect(() => {
        let x = Number(inputX);
        let ina = Math.abs(Number(inaccuracy));

        if (ina === 0) {
            ina = 0.0000000001;
        }

        if (x < 0) {
            if (x < -100) {
                x -= 2*Math.PI * Math.floor(x / (2*Math.PI))
            } else {
                while (x < -2 * Math.PI) {
                    x += 2 * Math.PI;
                }
            }
        } else {
            if (x > 100) {
                x -= 2*Math.PI * Math.floor(x / (2*Math.PI))
            } else {
                while (x > 2*Math.PI) {
                    x -= 2*Math.PI;
                }
            }
        }
        console.log(x)

        let sum = 0;
        let znak = 1;
        let i, sumX, check;

        if (functionX === "sin") {
            console.log("sin: ", Math.sin(Number(inputX)))
            if (x < 0) {
                x = -x;
                znak = -1;
            }
            i = 1;
            sumX = x;
            check = x < 0 ? -x : x;

            /*while (check > ina) {
                sum += sumX;
                sumX = sumX * (-1) * (x*x) / ((2*i+1) * (2*i))
                i++;
                check = sumX < 0 ? -sumX : sumX;
            }*/
        } else {
            console.log("cos: ", Math.cos(x))
            i = 0;
            sumX = 1;
            check = 1;
        }

        while (check > ina) {
            if (sumX === Infinity || sumX === -Infinity) {
                break;
            }
            sum += sumX;
            sumX = sumX * (-1) * (x*x) / ((i+1) * (i+2));
            i+=2;
            check = sumX < 0 ? -sumX : sumX;
        }

        console.log("i: ", i)
        sum*=znak;

        let stepen = 0;
        while (ina < 1 && ina > 0) {
            stepen++;
            ina *= 10;
        }
        sum = sum.toFixed(stepen);

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
            </InputGroupModule>
            <InputGroupModule title="x">
                <InputModule value={inputX} setValue={setInputXF} subtitle="радианы" />
                <InputModule value={inputXGrad} setValue={setInputXGradF} subtitle="градусы" />
            </InputGroupModule>
            <InputGroupModule title="Погрешность">
                <InputModule value={inaccuracy} setValue={setInaccuracy} subtitle="b" />
            </InputGroupModule>
            <InputGroupModule title="Результат">
                <Result text={functionX + "(x)"} value={summa}/>
            </InputGroupModule>
        </div>
    );
};

export default MathPage;