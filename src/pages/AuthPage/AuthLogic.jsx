import React from 'react';
import PreAuthPage from "./PreAuthPage";
import AuthPage from "./AuthPage";

const AuthLogic = (props) => {
    let param = window.location.search.substring(3);

    if (param.length === 0) {
        return <PreAuthPage />
    }
    return <AuthPage code={param}/>
};

export default AuthLogic;