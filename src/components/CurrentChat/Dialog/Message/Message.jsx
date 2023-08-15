import React from 'react';
import styles from "./Message.module.css"

const Message = (props) => {
    let forWho;
    if (props.for === "me") {
        forWho = styles.forMe;
    } else {
        forWho = styles.forThem;
    }

    let mess = "The correct way to do this in modern browsers is to use Flexbox. See this answer for details. See below for\n" +
        "some \n older \n ways \n that work in older browsers."

    return (
        <div className={`${styles.wrapper} ${forWho}`}>
            {mess}
        </div>
    );
};

export default Message;