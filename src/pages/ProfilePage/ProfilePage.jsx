import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import Profile from "./ProfileComponents/Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";

const ProfilePage = observer((props) => {
    const {authorizationStorage, usersStorage} = useContext(Context);
    let {id} = useParams();
    if (id === "0") {
        window.location.pathname = "/profile/" + authorizationStorage.id;
    }
    id = Number(id);


    if (usersStorage.hasUser(id)) {
        if (usersStorage.getUser(id) === null) {
            // возврат неизвестного аользователя
            return <PageNotFound />;
        }
    } else {
        usersStorage.searchUsers(id);
        // возврат грузящейся страницы
        return ("12121212")
    }


    return <Profile id={id} />
});

export default ProfilePage;