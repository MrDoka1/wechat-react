import React, {useContext, useState} from 'react';
import styles from "./Profile.module.scss"
import NavBar from "../../../../components/NavBar/NavBar";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import {friendsSVG, notAvatarSVG} from "../../../../SVGs";
import {Link} from "react-router-dom";


const Profile = observer(({id}) => {
    const {authorizationStorage, storage} = useContext(Context);

    let user = storage.getUser(id);
    let name = user.getName();
    const [avatar, setAvatar] = useState(<img loading="lazy" src={"https://phonoteka.org/uploads/posts/2023-03/1680008889_phonoteka-org-p-neobichnie-derevya-art-vkontakte-85.jpg"} alt="" onError={() => setAvatar(notAvatarSVG(200))}/>);

    let actionBar = "";
    let online, onlineClasses, friendButton, friendAction;
    if (authorizationStorage.id !== id) {
        online = user.getLastOnlineString();
        onlineClasses = online === "online" ? [styles.onlineStatus, styles.active] : [styles.onlineStatus];
        switch (user.friend) {
            case "FRIENDS":
                friendAction = () => storage.removeFriend(id);
                friendButton = "Удалить из друзей";
                break;
            case "NO_FRIENDS":
                friendAction = () => storage.addFriend(id);
                friendButton = "Добавить в друзья";
                break;
            case "I_SUBSCRIBER":
                friendAction = () => storage.removeFriend(id);
                friendButton = "Отменить заявку";
                break;
            case "HE_SUBSCRIBER":
                friendAction = () => console.log("answer");
                friendButton = "Ответить на заявку";
                break;
            default:
        }

        actionBar = (
            <div className={styles.actionBar}>
                <button onClick={friendAction}>{friendsSVG(12, "#fff")}{friendButton}</button>
                <Link to={"/chats/"+id}>Написать сообщение</Link>
            </div>
        )
    } else {
        online = "online";
        onlineClasses = [styles.onlineStatus, styles.active];
    }

    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>
                <div className={[styles.avatar, styles.block].join(" ")}>
                    {avatar}
                </div>
                <div className={[styles.block, styles.blockInfo].join(" ")}>
                    <div><p className={styles.infoPrefix}>День рождения:</p><p>{user.getBirthDateString()}</p></div>
                    <div className={styles.line}></div>
                    <div><p className={styles.infoPrefix}>Возраст:</p><p>{user.getAge()}</p></div>
                    <div className={styles.line}></div>
                    <div><p className={styles.infoPrefix}>Друзей:</p><p>{user.getQtyFriends()}</p></div>
                    {/*<div className={styles.line}></div>
                    <div><p className={styles.infoPrefix}>Статус:</p><p></p></div>*/}
                    {actionBar}
                </div>
                <div className={[styles.name, styles.block].join(" ")}>
                    <div>{name}</div>
                    <div className={onlineClasses.join(" ")}>{online}</div>
                </div>
            </div>
        </div>
    );
});

export default Profile;