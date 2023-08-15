import React, {useState} from 'react';
import styles from "./AuthPage.module.css"
import {Link} from "react-router-dom";
import {preAuthAPI} from "../../ServerAPI/userAPI";

const PreAuthPage = (props) => {
    let styleLoginError = "";
    const [errorLogin, setErrorLogin] = useState(false);
    const [login, setLogin] = useState("");
    const clickSendButton = (e) => {
        e.preventDefault();
        if (login.includes(" ") || login.length < 8) {
            setErrorLogin(true);
        } else {
            let formData = new FormData();
            formData.append("login", login);
            try {
                preAuthAPI(formData).then(data => {
                    if (data.success === "true") {
                        let code = data.code;
                        window.location = "/auth?e=" + code;
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    if (errorLogin) {
        styleLoginError = styles.error;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.auth__container}>
                <div className={styles.auth__body}>
                    <h1 className={styles.auth__title}>Регистрация</h1>
                    <form className={styles.auth__form}>
                        <input type="text" value={login} onChange={event => {
                            setLogin(event.target.value);
                            setErrorLogin(false);
                        }} name="login" className={`${styles.auth__input} ${styleLoginError}`} placeholder="Телефон или email"/><br/>
                        <button className={styles.auth__btn} onClick={event => clickSendButton(event)}>Продолжить</button><br/>
                        <Link className={styles.link} to="/login">Войти</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PreAuthPage;