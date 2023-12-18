import React, {useContext} from 'react';
import SockJsClient from "react-stomp";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {BACKEND_SERVER_HOST} from "../../../config";

const SOCKET_URL = `${BACKEND_SERVER_HOST}/ws/connect/`;

const Socket = observer((props) => {
    const {storage, authorizationStorage} = useContext(Context);

    let onMessageReceived = (topic, msg) => {
        console.log(topic, msg);
        if (topic.charAt(7) === 'c') {
            storage.addMessage(topic.substring(12), msg);
        } else {
            let id = topic.substring(14).split("_");
            id = id[0] === (authorizationStorage.id.toString()) ? id[1] : id[0];
            console.log(id)
            storage.addMessage(id, msg);
        }
    }
    return (
        <SockJsClient
            url={SOCKET_URL}
            topics={Array.from(storage.getTopicsList())}
            onConnect={()=>console.log("Connected!!")}
            onDisconnect={()=>console.log("Disconnected!")}
            onMessage={(message, topic) => onMessageReceived(topic, message)}
            debug={false}
        />
    );
});

export default Socket;