import React, {useMemo, useState} from 'react';
import styles from "./AuthPage.module.css";
import {checkAuthAPI, registrationAPI} from "../../ServerAPI/userAPI";
import {Link, useParams} from "react-router-dom";

const AuthPage = (props) => {
    const {code} = useParams();
    const [password, setPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthdate, setBirthdate] = useState("");

    const [errorPassword, setErrorPassword] = useState("");
    const [errorCopyPassword, setErrorCopyPassword] = useState("");
    const [errorFirstname, setErrorFirstname] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [errorBirthdate, setErrorBirthdate] = useState("");

    useMemo(() => {
        try {
            checkAuthAPI(code).then(data => {
                console.log(data)
                if (!data) {
                    window.location = "/auth"
                }
            });
        } catch (e) {
            console.log(e);
        }
    }, [code]);

    function clickSendButton(e) {
        e.preventDefault();
        let check = true;
        if (password.length < 8) {
            setErrorPassword(styles.error);
            check = false;
        }
        if (copyPassword !== password) {
            setErrorCopyPassword(styles.error);
            check = false;
        }
        if (firstname.includes(" ") || firstname.length < 2 || firstname.replace(/[0-9]/g, "") !== firstname) {
            setErrorFirstname(styles.error);
            check = false;
        }
        if (lastname.includes(" ") || lastname.length < 2 || lastname.replace(/[0-9]/g, "") !== lastname) {
            setErrorLastname(styles.error);
            check = false;
        }
        if (new Date(birthdate) > new Date() || birthdate === "") {
            setErrorBirthdate(styles.error);
            check = false;
        }
        if (check) {
            let formData = new FormData();
            formData.append("login", atob(code));
            formData.append("password", password);
            formData.append("copyPassword", copyPassword);
            formData.append("firstname", firstname);
            formData.append("lastname", lastname);
            formData.append("birthdate", birthdate);
            try {
                registrationAPI(formData).then(data => {
                    if (data) {
                        window.location = "/login";
                    } else {
                        alert("Server error")
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.auth__container}>
                <div className={styles.auth__body}>
                    <h1 className={styles.auth__title}>Регистрация</h1>
                    <form className={styles.auth__form}>
                        <input type="text" className={styles.auth__input} name="email" placeholder="Телефон или email" value={atob(code)} disabled/><br/>
                        <input type="password" value={password} onChange={event => {
                            setPassword(event.target.value);
                            setErrorPassword("");
                        }} className={`${styles.auth__input} ${errorPassword}`} name="password" placeholder="Пароль"/><br/>
                        <input type="password" value={copyPassword} onChange={event => {
                            setCopyPassword(event.target.value);
                            setErrorCopyPassword("");
                        }} className={`${styles.auth__input} ${errorCopyPassword}`} name="copyPassword" placeholder="Повторите пароль"/><br/>
                        <input type="text" value={firstname} onChange={event => {
                            setFirstname(event.target.value);
                            setErrorFirstname("");
                        }} className={`${styles.auth__input} ${errorFirstname}`} name="firstname" placeholder="Имя"/><br/>
                        <input type="text" value={lastname} onChange={event => {
                            setLastname(event.target.value);
                            setErrorFirstname("");
                        }} className={`${styles.auth__input} ${errorLastname}`} name="lastname" placeholder="Фамилия"/><br/>
                        <input type="date" value={birthdate} onChange={event => {
                            setBirthdate(event.target.value);
                            setErrorBirthdate("");
                        }} className={`${styles.auth__input} ${errorBirthdate}`} name="birthdate" data-placeholder="Дата рождения" required aria-required="true"/><br/>
                        <button className={styles.auth__btn} onClick={event => clickSendButton(event)}>Зарегистрироваться</button><br/>
                    <div className={styles.auth__agreements}>Нажимая «Продолжить», вы принимаете <Link to="#">пользовательское соглашение</Link> и <Link to="#">политику конфиденциальности</Link></div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default AuthPage;