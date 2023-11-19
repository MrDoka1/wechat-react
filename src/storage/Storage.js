import {action, makeObservable, observable} from "mobx";
import {getChatsAPI, getChatUsersAPI, getLastMessagesAPI, getMessagesAPI} from "../ServerAPI/chatAPI";
import {friendAPI, getUserAPI, getUsersAPI, getUsersOnlineAPI} from "../ServerAPI/userAPI";
import {User} from "./User";
import Chat from "./Chat";
import ChatUser from "./ChatUser";

class Storage {
    _chats = new Map();
    _chatMessages = new Map();
    _users = new Map();
    constructor() {
        makeObservable(this, {
            _chats: observable,
            _setChat: action,

            _chatMessages: observable,
            _setMessages: action,
            _setMessage:action,

            _users: observable,
            _setUser: action,
            _setUnknownUser: action,
        })
        /*this._chats = new Map([
            ["c1", {id: 1, isDialog: false, img:"https://avatars.mds.yandex.net/i?id=3d8fe1cbef738979cb1dd23253789385baeba740-9657256-images-thumbs&n=13", name: "Котики", members: 46, online: 45}],
            ["c2", {id: 2, isDialog: false, img:"https://img.joinfo.com/i/2016/04/800x0/5710ffa88b2ba.jpg", name: "Енотики", members: 23, online: 19}],
            ["c3", {id: 3, isDialog: false, img:"https://avatars.mds.yandex.net/i?id=9cacb1b690b813d48bd5cc0692f4fb465a6666f0-2834022-images-thumbs&n=13", name: "Верблюдики", members: 5, online: 0}],
            ["4", {id: 4, userId: 4, isDialog: true, img:"https://fikiwiki.com/uploads/posts/2022-02/1644906351_9-fikiwiki-com-p-sloni-krasivie-kartinki-9.jpg", name: "Слон", online:"online"}],
            ["5", {id: 5, userId:10, isDialog: true, img:"https://avatars.mds.yandex.net/i?id=f5ed9943050597b4a97eeaf94118a4050301f315-10375548-images-thumbs&n=13", name: "Жираф", online:"2023-05-20T17:46:03.968638"}]
        ]);*/
        /*this._chatMessages = new Map([
            ["c1", [{id: 23, text: "Привет", time: "2023-05-20T09:46:03.968638", senderId: 4}, {id: 24, text: "Привет!", time: "2023-05-20T17:01:03.968638", senderId: 10}, {id: 25, text: "Воу воу воу", time: "2023-05-20T17:46:03.968638", senderId: 4}]],
            ["c2", []],
            ["c3", []],
            ["4", []],
            ["5", []]
        ]);*/
    }

/* -------------------- Chats --------------------- */

    updateChats(setUpdate) {
        getChatsAPI().then(data => {
            if (data === []) {
                setUpdate(true);
                return
            }
            this._setChats(Object.entries(data));

            let arr = [];
            this._chats.forEach((v, k) => arr.push(k));
            // ТОЛЬКО Если есть чаты
            if (arr.length !== 0) {
                getLastMessagesAPI(arr.toString()).then(data => {
                    this._setChatMessages(Object.entries(data));
                    let usersId = [];
                    this._chats.forEach((chat, key) => {
                        if (key.toString().charAt(0) !== 'c') {
                            usersId.push(chat.userId);
                        }
                    });
                    if (arr === []) {
                        setUpdate(true);
                    } else {
                        getUsersAPI(usersId.toString()).then(data => {
                            this._setUsers(Object.entries(data));
                            setUpdate(true);
                        })
                    }
                })
            } else {
                setUpdate(true);
            }
        })
    }

    addLocalDialog(userId) {
        console.log(userId, this.hasUser(userId))
        if (this.hasUser(userId)) {
            this._setChat({id:userId, chat:null, dialog:{userId:userId}});
            this._setMessage(userId.toString(), null);
        } else if (!this.hasUser(userId)) {
            this.searchUsers(userId).then(()=> {
                console.log(this.hasUser(userId))
            })
        }
    }

    getChat(id) {
        return this._chats.get(id);
    }

    get chats() {
        return this._chats;
    }

    _setChat(chat) {
        if (chat.chat === null) {
            this._chats.set(chat.id, chat.dialog);

        } else {
            this._chats.set("c" + chat.id, new Chat(chat.chat, this));
        }
        console.log(this._chats)
    }

    _setChats(chats) {
        chats.forEach(array => {
            this._setChat(array[1]);
        })
    }

    isDialog(id) {
        let chat = this.getChat(id);
        if (chat === undefined) {
            return null;
        }
        return chat.userId !== undefined;

    }

    hasChat(chatId) {
        return this._chats.has(chatId);
    }
/* -------------------------------------------------- */

/* ------------------ Messages ---------------------- */

    addMessage(chatId, message) {
        this._setMessage(chatId, message)
        console.log(this._chatMessages)
    }

    _setChatMessages(chatMessagesArray) {
        chatMessagesArray.forEach(chatMessages => {
            this._setMessage(chatMessages[0], chatMessages[1]);
        })
    }

    _setMessages(id, messages) {
        console.log(messages)
        if (messages === []) {
            this._chatMessages.set(id, new Map());
        } else {
            messages.forEach(message => this._setMessage(id, message[1]));
            return true
        }
        console.log(this._chatMessages)
    }

    _setMessage(chatId, message) {
        chatId = chatId.toString();
        if (message === null) {
            this._chatMessages.set(chatId, new Map());
        } else {
            if (!this._chatMessages.has(chatId)) {
                this._chatMessages.set(chatId, new Map())
            }
            let oldMessages = this._chatMessages.get(chatId);
            oldMessages.set(message.time, message);
            this._chatMessages.set(chatId, oldMessages);
            if (!this._users.has(message.senderId)) {
                getUserAPI(message.senderId).then(data => {
                    this._setUsers(Object.entries(data));
                })
            }
        }
    }

    getMessages(chatId) {
        return this._chatMessages.get(chatId);
    }

    // Достаёт из Storage последнее сообщение
    getLastMessage(chatId) {
        let messages = this.getMessages(chatId);
        if (messages !== undefined) {
            // ** По максимальному timeStamp находим message **
            let maxTimeStamp = 0;
            let returnMessage = null;
            messages.forEach((v, k)=> {
                let timeStamp = new Date(k);
                if (timeStamp > maxTimeStamp) {
                    maxTimeStamp = timeStamp;
                    returnMessage = v;
                }
            })
            // ** --- **
            return returnMessage;
        }

        return null;
    }

    // Загружает с сервера сообщения
    loadMessages(id, setLoad) {
        let messages = this.getMessages(id);
        if (messages !== undefined) {
            if (messages.size < 10) {
                if (messages.size > 0) {
                    setLoad(false);
                }
                // ** По минимальному timeStamp берём message.id **
                let minTimeStamp = 0;
                let messageId = 0;
                messages.forEach((v, k)=>{
                    let timeStamp = new Date(k);
                    if (minTimeStamp === 0) {
                        minTimeStamp = timeStamp
                        messageId = v.id;
                    } else if (timeStamp < minTimeStamp) {
                        minTimeStamp = timeStamp
                        messageId = v.id;
                    }
                })
                // ** --- **

                getMessagesAPI(id, messageId).then(data => {
                    this._setMessages(id, Object.entries(data));
                    setLoad(false);
                })
            } else {
                setLoad(false);
            }
        } else {
            getMessagesAPI(id, 0).then(data => {
                if (data === undefined) {
                    setLoad(false);
                    return
                }
                this._setMessages(id, Object.entries(data));
                setLoad(false);
            })
        }
    }
/* -------------------------------------------------- */

/* --------------------- Users --------------------- */
    hasUser(id) {
        return this._users.has(id) ? (this._users.get(id) === null ? null : true) : false;
    }

    getUser(id) {
        return this._users.get(id);
    }

    getUsers(ids) {
        console.log()
        let list = [];
        ids.forEach(userId => list.push(this.getUser(userId)));
        return list;
    }

    async getAndUpdateUsers(ids) {
        let updateOnline = [];
        let searchUsers = [];
        ids.forEach(id => {
            if (this.hasUser(id)) {
                updateOnline.push(id);
            } else  {
                searchUsers.push(id);
            }
        });

        const updateList = await this.updateOnline(updateOnline);
        const searchList = await this.searchUsers(searchUsers);
        return updateList.concat(searchList);
    }

    async updateOnline(ids) {
        try {
            const data = await getUsersOnlineAPI(ids);
            Object.entries(data).forEach(value => {
                this.getUser(Number(value[0])).setLastOnline(value[1]);
            })
            return this.getUsers(ids);
        } catch (e) {
            console.log(e)
        }
        return [];
    }

    async searchUsers(ids) {
        if (typeof ids === "number") {
            ids = [ids];
        }
        try {
            const data = await getUsersAPI(ids);
            this._setUsers(Object.entries(data));
            return this.getUsers(ids);
        } catch (e) {
            console.log(e)
        }
        return [];
        /*getUsersAPI(ids).then(data => {
            this._setUsers(Object.entries(data));
        })*/
    }

    _setUsers(usersArray) {
        usersArray.forEach(array => {
            if (array[1] == null) {
                this._setUnknownUser(Number(array[0]));
            } else {
                this._setUser(array[1]);
            }
        })
    }

    _setUser(user) {
        this._users.set(user.id, new User(user));
    }

    _setUnknownUser(id) {
        this._users.set(id, null)
    }

/* -------------------------------------------------- */

/* ------------------ ChatUsers ---------------------- */
    getNewChatUsers(chatId) {
        try {
            let id = chatId.charAt(0) === "c" ? chatId.substring(1) : chatId;
            getChatUsersAPI(id).then(data => {
                // Возможно проверка на пустоту.
                return this._setChatUsers(chatId, Object.entries(data));
            });
        } catch (e) {
            console.log(e);
        }
    }

    _setChatUsers(chatId, users) {
        let list = [];
        users.map((v) => list.push(new ChatUser(v[1].id, v[1].role)));
        this.getChat(chatId).addChatUsers(list);
        return list;
    }

/* -------------------------------------------------- */
/* ------------------ Friends ---------------------- */
    async addFriend(userId) {
        const data = await friendAPI("ADD", userId);
        if (data) {
            let user = this.getUser(userId);
            user.setFriend(data);
        } else console.log("error")
    }

    async removeFriend(userId) {
        const data = await friendAPI("REMOVE", userId);
        if (data) {
            let user = this.getUser(userId);
            user.setFriend(data);
        } else console.log("error")
    }
/* -------------------------------------------------- */
}

export default Storage;