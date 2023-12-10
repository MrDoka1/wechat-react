import React from 'react';
import styles from "./Avatar.module.scss"
import {Link} from "react-router-dom";

const Avatar = ({user}) => {
    let avatarText = user.firstname.charAt(0).concat(" ", user.lastname.charAt(0));

    return (
        <div className={styles.wrapper}>
            <Link to={"/profile/" + user.id} className={styles.avatar} style={{backgroundColor: user.color}}><p>{avatarText}</p></Link>
            <img className={styles.img} src={user.urlPhoto}  alt=""/>
        </div>
    );
};

export default Avatar;