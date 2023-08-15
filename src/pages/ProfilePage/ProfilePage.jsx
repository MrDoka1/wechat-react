import React from 'react';
import styles from "./ProfilePage.module.css"
import NavBar from "../../components/NavBar/NavBar";

const ProfilePage = (props) => {
    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>

            </div>
        </div>
    );
};

export default ProfilePage;