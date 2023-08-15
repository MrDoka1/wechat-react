import React, {useContext, useState} from 'react';
import styles from "../AuthPage/AuthPage.module.css"
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {loginAPI} from "../../ServerAPI/userAPI";
import {Link} from "react-router-dom";

const LoginPage = observer(({path}) => {
    let styleBodyError = "";
    let styleLoginError = "";
    let stylePasswordError = "";
    const {authorizationStorage} = useContext(Context);

    const [errorBody, setErrorBody] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function clickSendButton(e) {
        e.preventDefault();
        let check = true;
        /*if (login.includes(" ") || login.length < 8) {
            setErrorLogin(true);
            check = false;
        }
        if (password.includes(" ") || password.length < 8) {
            setErrorPassword(true);
            check = false;
        }*/
        if (check) {
            let formData = new FormData()
            formData.append("username", login);
            formData.append("password", password)
            try {
                loginAPI(formData).then(data => {
                    console.log(data);
                    if (data === "OK") {
                        authorizationStorage.updateAuthorization();
                        window.location.pathname = path;
                    } else if (data === "Authentication failure") {
                        setErrorBody(true)
                    } else {
                        alert("Unknown server error");
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    if (errorBody) {
        styleBodyError = styles.error;
    }
    if (errorLogin) {
        styleLoginError = styles.error;
    }
    if (errorPassword) {
        stylePasswordError = styles.error;
    }
    return (
        <div className={styles.wrapper}>

            <div className={styles.auth__container}>
                <form className={`${styles.auth__body} ${styleBodyError}`}>
                    <h1 className={styles.auth__title}>Вход</h1>
                    <div className={styles.auth__form}>
                        <input type="text" value={login} onChange={event => {
                            setLogin(event.target.value);
                            setErrorBody(false);
                            setErrorLogin(false);
                        }} name="username" className={`${styles.auth__input} ${styleLoginError}`} placeholder="Телефон или email"/><br/>
                        <input type="password" value={password} onChange={event => {
                            setPassword(event.target.value);
                            setErrorBody(false);
                            setErrorPassword(false);
                        }} name="password" className={`${styles.auth__input} ${stylePasswordError}`} placeholder="Пароль"/><br/>
                        <button type="submit" onClick={event => clickSendButton(event)} className={styles.auth__btn}>Войти
                        </button><br/>
                        <Link className={styles.link} to="/auth">Зарегистрироваться</Link>
                    </div>
                </form>
            </div>

        </div>
    );
});

export default LoginPage;