import {action, makeObservable, observable} from "mobx";
import {getUsersAPI} from "../ServerAPI/userAPI";
import {User} from "./User";

export class UserStorage {
    _users = null;
    constructor() {
        makeObservable(this, {
            _users: observable,
            _setUser: action,
            _setUnknownUser: action,
        })
        this._users = new Map([
            [4, {id:4, firstname:"Александра", lastname: "Волкова"}],
            [10, {id:10, firstname:"Валера", lastname: "Ваховски"}],
        ]);

        this._users.forEach((user, key) => {
            this._users.set(key, {...user, color: this._toColor(user.id + user.firstname)})
        });
    }

    getUserName(id) {
        let user = this.getUser(id);
        return user.firstname + " " + user.lastname;
    }

    hasUser(id) {
        return this._users.has(id) ? (this._users.get(id) === {} ? null : true) : false;
    }

    getUser(id) {
        return this._users.get(id);
    }

    searchUsers(ids) {
        getUsersAPI(ids).then(data => {
            const dataArray = Object.entries(data);
            dataArray.forEach(array => {
                if (array[1] == null) {
                    this._setUnknownUser(Number(array[0]));
                } else {
                    this._setUser(array[1]);
                }
            })
        })
    }

    _setUser(user) {
        this._users.set(user.id, new User(user));
    }

    _setUnknownUser(id) {
        this._users.set(id, null)
    }

    _toColor(str) {
        let utf8Encode = new TextEncoder();
        let num = Number(utf8Encode.encode(str).join("")) % 10000000;

        num >>>= 0;
        const b = num & 0xFF,
            g = (num & 0xFF00) >>> 8,
            r = (num & 0xFF0000) >>> 16;
        return "rgb(" + [r, g, b].join(",") + ")";
    }
}