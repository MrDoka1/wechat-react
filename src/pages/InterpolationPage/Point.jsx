import React, {useState} from 'react';
import InputGroupModule from "../MathPage/InputGroupModule/InputGroupModule";
import InputModule from "../MathPage/InputGroupModule/InputModule/InputModule";
import {crossSVG} from "../../SVGs";

const Point = ({index, value, updateX, updateY, updateT, add, del, deletePoint}) => {
    const [t, setT] = useState(value.t);
    const [x, setX] = useState(value.x);
    const [y, setY] = useState(value.y);

    function upT(value) {
        setT(value);
        updateT(index, Number(value));
    }
    function upX(value) {
        setX(value);
        updateX(index, Number(value));
    }
    function upY(value) {
        setY(value);
        updateY(index, Number(value));
    }

    let delPoint = deletePoint ? <button onClick={()=>del(index)} style={{position:"absolute", right:"40px", top:"10px", backgroundColor: "#5d5d5d", borderRadius: "50%", padding:0, height:"22px", width:"22px"}} >{crossSVG(21, "#f00")}</button> : "";

    return (
        <InputGroupModule title={`Точка ${index + 1}`}>
            {delPoint}
            <button onClick={()=>add(index)} style={{position:"absolute", right:"10px", top:"10px", transform:"rotate(45deg)", backgroundColor: "#5d5d5d", borderRadius: "50%", padding:0, height:"22px", width:"22px"}} >{crossSVG(21, "#57ff6d")}</button>
            <InputModule subtitle="t" value={t} setValue={upT}/>
            <InputModule subtitle="x" value={x} setValue={upX}/>
            <InputModule subtitle="y" value={y} setValue={upY}/>
        </InputGroupModule>
    );
};

export default Point;