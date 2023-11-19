import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import Profile from "./ProfileComponents/Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import LoadProfile from "./ProfileComponents/Profile/LoadProfile";

const ProfilePage = observer((props) => {
    const {authorizationStorage, storage} = useContext(Context);
    let {id} = useParams();
    if (id === "0") {
        window.location.pathname = "/profile/" + authorizationStorage.id;
    }
    id = Number(id);


    if (storage.hasUser(id)) {
        if (storage.getUser(id) === null) {
            // возврат неизвестного аользователя
            return <PageNotFound />;
        }
    } else {
        storage.searchUsers(id);
        // возврат грузящейся страницы
        return <LoadProfile />
    }


    return <Profile id={id} />
});

export default ProfilePage;