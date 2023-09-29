import React from 'react';
import PreAuthPage from "./PreAuthPage";
import AuthPage from "./AuthPage";
import {useParams} from "react-router-dom";

const AuthLogic = (props) => {
    let e = useParams();
    console.log(e)

    if (e.length === 0) {
        return <PreAuthPage />
    }
    return <AuthPage code={e}/>
};

export default AuthLogic;