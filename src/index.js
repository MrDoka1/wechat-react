import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Storage from "./storage/Storage";
import AuthorizationStorage from "./storage/AuthorizationStorage";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <BrowserRouter>
        <Context.Provider value={
            {
                storage: new Storage(),
                authorizationStorage: new AuthorizationStorage(),
            }
        }>
            <App />
        </Context.Provider>

    </BrowserRouter>
);
