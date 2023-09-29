export class User {
    _id;
    _urlPhoto;
    _nick;
    _firstname;
    _lastname;
    _birthDate;
    _lastOnline;
    _privateProfile;
    _friend;
    _color;


    constructor(user) {
        this._id = user.id;
        this._urlPhoto = user.urlPhoto;
        this._nick = user.nick;
        this._firstname = user.firstname;
        this._lastname = user.lastname;
        this._birthDate = user.birthDate;
        this._lastOnline = user.lastOnline;
        this._privateProfile = user.privateProfile;
        this._friend = user.friend;
        this._color = this._toColor(user.id + user.firstname)
    }

    getName() {
        return this._firstname.concat(" " , this._lastname);
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


    // ***** Getters *****
    get id() {
        return this._id;
    }

    get urlPhoto() {
        return this._urlPhoto;
    }

    get nick() {
        return this._nick;
    }

    get firstname() {
        return this._firstname;
    }

    get lastname() {
        return this._lastname;
    }

    get birthDate() {
        return this._birthDate;
    }

    get lastOnline() {
        return this._lastOnline;
    }

    get privateProfile() {
        return this._privateProfile;
    }

    get friend() {
        return this._friend;
    }

    get color() {
        return this._color;
    }

// ***********************************
}