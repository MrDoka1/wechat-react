import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import ChatsStorage from "./storage/ChatsStorage";
import AuthorizationStorage from "./storage/AuthorizationStorage";
import {UserStorage} from "./storage/UserStorage";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <BrowserRouter>
        <Context.Provider value={
            {
                chatsStorage: new ChatsStorage(),
                authorizationStorage: new AuthorizationStorage(),
                usersStorage: new UserStorage(),
            }
        }>
            <App />
        </Context.Provider>

    </BrowserRouter>
);
