import React from 'react';
import styles from "./NavItem.module.css"
import {NavLink} from "react-router-dom";

const NavItem = (props) => {
    return (
        <NavLink className={({ isActive}) => isActive ? `${styles.active}` : ""} to={props.to}>
            <div className={styles.wrapper}>
                {props.svg}
                <span className={styles.text}>{props.text}</span>
            </div>
        </NavLink>
    );
};

export default NavItem;