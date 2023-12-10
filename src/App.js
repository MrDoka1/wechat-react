import {Route, Routes} from "react-router-dom";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import "./fonts.css";
import "./styleReset.scss"
import LoginPage from "./pages/LoginPage/LoginPage";
import React, {useContext} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import PreloadPage from "./pages/PreloadPage/PreloadPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PreAuthPage from "./pages/AuthPage/PreAuthPage";
import ArtaPage from "./pages/ArtaPage/ArtaPage";
import MathPage from "./pages/MathPage/MathPage";
import TwoPage from "./pages/TwoPage/TwoPage";
import ExtrapolationPage from "./pages/ExtrapolationPage/ExtrapolationPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import IterationPage from "./pages/IterationPage/IterationPage";
import InterpolationPage from "./pages/InterpolationPage/InterpolationPage";
import Socket from "./components/Socket/Socket";

const App = observer((props) => {
    const {authorizationStorage} = useContext(Context);
    const {storage} = useContext(Context);

    if (authorizationStorage.authorization == null) {
        return (
            <div>
                <Routes>
                    <Route path="/arta" element={<ArtaPage />}/>
                    <Route path="/math" element={<MathPage />}/>
                    <Route path="/two" element={<TwoPage />}/>
                    <Route path="/extra" element={<ExtrapolationPage />}/>
                    <Route path="/iter" element={<IterationPage />}/>
                    <Route path="/inter" element={<InterpolationPage />}/>
                    <Route path="*" element={<PreloadPage />} />
                </Routes>
            </div>
        )
    } else if (authorizationStorage.authorization) {
        storage.id = authorizationStorage.id;
        if (!storage.hasUser(authorizationStorage.id)) {
            storage.searchUsers(authorizationStorage.id);
            return (
                <div>
                    <Routes>
                        <Route path="/arta" element={<ArtaPage />}/>
                        <Route path="/math" element={<MathPage />}/>
                        <Route path="/two" element={<TwoPage />}/>
                        <Route path="/extra" element={<ExtrapolationPage />}/>
                        <Route path="*" element={<PreloadPage />} />
                    </Routes>
                </div>
            )
        }
        return (
            <div>
                <Socket/>
                <Routes>
                    <Route path="/profile/:id" element={<ProfilePage />}/>
                    <Route path="/chats/:id?" element={<ChatsPage />}/>
                    <Route path="/friends" element={<FriendsPage path="friends"/>}/>
                    <Route path="/friends/subscribers" element={<FriendsPage path="subscribers"/>}/>
                    <Route path="/friends/search" element={<FriendsPage path="search"/>}/>
                    <Route path="/setting/*" element={<SettingPage />}/>
                    <Route path="/arta" element={<ArtaPage />}/>
                    <Route path="/math" element={<MathPage />}/>
                    <Route path="/two" element={<TwoPage />}/>
                    <Route path="/login" component={<PageNotFound />} />
                </Routes>
            </div>
        );

    } else {
        let path = window.location.pathname;
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage path={"/profile"} />}/>
                    <Route path="/auth/:code" element={<AuthPage />}/>
                    <Route path="/auth" element={<PreAuthPage />}/>
                    <Route path="/arta" element={<ArtaPage />}/>
                    <Route path="/math" element={<MathPage />}/>
                    <Route path="/two" element={<TwoPage />}/>
                    <Route path="*" element={<LoginPage path={path}/>}/>
                </Routes>
            </div>
        );
    }
})

export default App;