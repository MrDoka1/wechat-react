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
import AuthLogic from "./pages/AuthPage/AuthLogic";

const App = observer((props) => {
    const {authorizationStorage} = useContext(Context);
    console.log(authorizationStorage.authorization)

    if (authorizationStorage.authorization == null) {
        return (
            <PreloadPage />
        )
    } else if (authorizationStorage.authorization) {
        return (
            <div>
                <Routes>
                    <Route path="/profile/*" element={<ProfilePage />}/>
                    <Route path="/chats/*" element={<ChatsPage />}/>
                    <Route path="/friends/*" element={<FriendsPage />}/>
                    <Route path="/setting/*" element={<SettingPage />}/>
                    {/*<Route component={NoMatch} />*/}
                </Routes>
            </div>
        );

    } else {
        let path = window.location.pathname;
        console.log(path)
        return (
            <div>
                <Routes>
                    <Route path="/login" element={<LoginPage path={"/profile"} />}/>
                    <Route path="/auth" element={<AuthLogic />}/>
                    <Route path="*" element={<LoginPage path={path}/>}/>
                </Routes>
            </div>
        );
    }
})

export default App;