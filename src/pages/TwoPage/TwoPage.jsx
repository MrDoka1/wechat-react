import React, {useState} from 'react';
import styles from "../ArtaPage/ArtaPage.module.scss";
import InputGroupModule from "../MathPage/InputGroupModule/InputGroupModule";
import InputModule from "../MathPage/InputGroupModule/InputModule/InputModule";
import Result from "../ArtaPage/ResultPanel/Result/Result";

const TwoPage = (props) => {
    const [input, setInput] = useState();
    let value = Number(input)
    let result;
    result = Math.pow(2, 1/Math.pow(2, value));
    result = - Math.log2(Math.log2(result));

    return (
        <div className={`${styles.wrapper} ${styles.math}`}>
            <InputGroupModule title="Число">
                <InputModule value={input} setValue={setInput} subtitle="" />
            </InputGroupModule>
            <InputGroupModule title="Результат">
                <Result text="Двоечки" value={result}/>
            </InputGroupModule>
        </div>
    );
};

export default TwoPage;