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
        this.updateAuthorization("");
    }

    async updateAuthorization(path) {
        /*checkAuthorizationAPI().then(data => {
            this._setAuthorization(data.authorization);
            if (data.authorization) {
                this._setId(data.id);
                if (path === "/profile") {
                    window.location.pathname = "/profile/" + data.id;
                }
            } else {
                this._setId(null);
            }
        });*/
        try {
            const data = await checkAuthorizationAPI();
            if (data.authorization) {
                this._setId(data.id);
                this._setAuthorization(true);
                if (path === "/profile") {
                    window.location.pathname = "/profile/" + data.id;
                }
            } else {
                this._setId(null);
                this._setAuthorization(false);
            }
        } catch (e) {
            if (e.code === "ERR_NETWORK") {
                await this.updateAuthorization(path);
            }
        }

    }

    _setAuthorization(authorization) {
        this._authorization = authorization;
    }

    setFalseAuthorization() {
        this._setAuthorization(false);
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