import React, {useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.scss";
import InputGroupModule from "../MathPage/InputGroupModule/InputGroupModule";
import InputModule from "../MathPage/InputGroupModule/InputModule/InputModule";
import Matrix from "./Matrix";

const IterationPage = (props) => {

    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");

    function calc() {

    }

    return (
        <div className={`${styles.wrapper}`}>
            <InputGroupModule title="Решение СЛАУ"/>
            <InputGroupModule >
                <Matrix/>
            </InputGroupModule>

            <InputGroupModule title="Answer">
                <InputModule value={answer1} setValue={setAnswer1}></InputModule>
                <InputModule value={answer2} setValue={setAnswer2}></InputModule>
                <InputModule value={answer3} setValue={setAnswer3}></InputModule>
            </InputGroupModule>

            <InputGroupModule title="Результат">
                <InputModule subtitle="x" value={answer1} setValue={setAnswer1}></InputModule>
                <InputModule subtitle="y" value={answer2} setValue={setAnswer2}></InputModule>
                <InputModule subtitle="z" value={answer3} setValue={setAnswer3}></InputModule>
                <div style={{height:"10px"}}></div>
                <button className={styles.button} onClick={calc}>Обновить</button>
            </InputGroupModule>
        </div>)
};

export default IterationPage;