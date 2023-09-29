import React from 'react';
import styles from "./PageNotFound.module.css"
import i from "./404.png"
import {Link} from "react-router-dom";

const PageNotFound = (props) => {
    return (
        <div className={styles.wrapper}>
            <Link to="/profile/0">
                <img src={i} alt=""/>
                <span className={styles.text}>Page Not Found</span>
            </Link>

        </div>
    );
};

export default PageNotFound;