import React, {useContext} from 'react';
import styles from "./SettingPage.module.scss"
import NavBar from "../../components/NavBar/NavBar";
import {getLogoutAPI} from "../../ServerAPI/userAPI";
import {redirect, useNavigate} from "react-router-dom";
import {Context} from "../../index";

const SettingPage = (props) => {
    const {authorizationStorage, storage} = useContext(Context);
    const navigate = useNavigate();

    const logout = () => {
        console.log("logout");
        getLogoutAPI().then(()=> {
            authorizationStorage.setFalseAuthorization();
            navigate('/login')
        });
    }

    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div></div>
                    <button onClick={()=>logout()} className={styles.logout}>Выйти</button>
                </div>

            </div>
        </div>
    );
};

export default SettingPage;