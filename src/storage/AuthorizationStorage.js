import {action, makeObservable, observable} from "mobx";
import {checkAuthorizationAPI} from "../ServerAPI/userAPI";

export default class AuthorizationStorage {
    _id = null;
    _authorization = null;
    constructor() {
        makeObservable(this, {
            _id: observable,
            _authorization: observable,
            _setAuthorization: action,
            _setId: action,
        })
        this.updateAuthorization();
    }

    updateAuthorization() {
        checkAuthorizationAPI().then(data => {
            this._setAuthorization(data.authorization);
            if (this._authorization) {
                this._setId(data.id);
            } else {
                this._setId(null);
            }
        });
    }

    _setAuthorization(authorization) {
        this._authorization = (authorization === "true");
    }

    _setId(id) {
        this._id = id;
    }

    get authorization() {
        return this._authorization;
    }

    get id() {
        return this._id;
    }
}