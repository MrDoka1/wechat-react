import {action, makeObservable, observable} from "mobx";

class Chat {
    _id; // long
    _name; // string
    _urlPhoto; // string
    _role; // string
    _creationTime; // date
    _members; // int
    _isPrivate; // boolean

    _chatUsers = new Map(); // map<Long, ChatUser>
    

    constructor(chat) {
        makeObservable(this, {
            _chatUsers: observable,
            addChatUsers: action,
        })

        this._id = chat.id;
        this._name = chat.name;
        this._urlPhoto = chat.urlPhoto;
        this._role = chat.role;
        this._creationTime = chat.creationTime;
        this._members = chat.members;
        this._isPrivate = chat.private;
        this._chat = chat;
    }


    get chatUsers() {
        return this._chatUsers;
    }

    addChatUsers(users) {
        users.map((chatUser, k) => this._chatUsers.set(chatUser.id, chatUser));
        console.log(users)
        return this._chatUsers;
    }

    set chatUsers(value) {
        this._chatUsers = value;
    }

    get chat() {
        return this._chat;
    }

    set chat(value) {
        this._chat = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get urlPhoto() {
        return this._urlPhoto;
    }

    set urlPhoto(value) {
        this._urlPhoto = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get creationTime() {
        return this._creationTime;
    }

    set creationTime(value) {
        this._creationTime = value;
    }

    get members() {
        return this._members;
    }

    set members(value) {
        this._members = value;
    }

    get isPrivate() {
        return this._isPrivate;
    }

    set isPrivate(value) {
        this._isPrivate = value;
    }
}
export default Chat;