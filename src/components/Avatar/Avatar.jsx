import React from 'react';
import styles from "./Avatar.module.scss"

const Avatar = ({user}) => {
    let avatarText = user.firstname.charAt(0).concat(" ", user.lastname.charAt(0));

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar} style={{backgroundColor: user.color}}><p>{avatarText}</p></div>
            <img className={styles.img} src={user.urlPhoto}  alt=""/>
        </div>
    );
};

export default Avatar;