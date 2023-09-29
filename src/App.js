import {Route, Routes} from "react-router-dom";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import "./fonts.css";
import "./styleReset.css"
import LoginPage from "./pages/LoginPage/LoginPage";
import {useContext} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import PreloadPage from "./pages/PreloadPage/PreloadPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PreAuthPage from "./pages/AuthPage/PreAuthPage";
import chatsStorage from "./storage/ChatsStorage";
import ArtaPage from "./pages/ArtaPage/ArtaPage";
import MathPage from "./pages/MathPage/MathPage";

const App = observer((props) => {
    const {authorizationStorage} = useContext(Context);
    const {chatsStorage} = useContext(Context);

    if (authorizationStorage.authorization == null) {
        return (
            <div>
                <Routes>
                    <Route path="/arta" element={<ArtaPage />}/>
                    <Route path="/math" element={<MathPage />}/>
                    <Route path="*" element={<PreloadPage />} />
                </Routes>
            </div>
        )
    } else if (authorizationStorage.authorization) {
        chatsStorage.searchUsers(authorizationStorage.id);
        return (
            <div>
                <Routes>
                    <Route path="/profile/:id" element={<ProfilePage />}/>
                    <Route path="/chats/:id?" element={<ChatsPage />}/>
                    <Route path="/friends/*" element={<FriendsPage />}/>
                    <Route path="/setting/*" element={<SettingPage />}/>
                    <Route path="/arta" element={<ArtaPage />}/>
                    <Route path="/math" element={<MathPage />}/>
                    {/*<Route component={NoMatch} />*/}
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
                    <Route path="*" element={<LoginPage path={path}/>}/>
                </Routes>
            </div>
        );
    }
})

export default App;