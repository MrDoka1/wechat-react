export default class ChatUser {
    _id;
    _role;
    _timeConnect;
    _punishment;

    constructor(id, role) {
        this._id = id;
        this._role = role;
    }


    get timeConnect() {
        return this._timeConnect;
    }

    get punishment() {
        return this._punishment;
    }

    get id() {
        return this._id;
    }

    get role() {
        return this._role;
    }
}