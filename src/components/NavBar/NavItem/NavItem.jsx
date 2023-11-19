import React from 'react';
import styles from "./NavItem.module.scss"
import {NavLink} from "react-router-dom";

const NavItem = ({end, to, svg, text}) => {
    return (
        <NavLink end={end} className={({ isActive}) => isActive ? `${styles.active}` : ""} to={to}>
            <div className={styles.wrapper}>
                {svg}
                <span className={styles.text}>{text}</span>
            </div>
        </NavLink>
    );
};

export default NavItem;