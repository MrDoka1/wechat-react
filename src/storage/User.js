import {action, makeObservable, observable} from "mobx";

export class User {
    _id;
    _urlPhoto;
    _nick;
    _firstname;
    _lastname;
    _birthDate;
    _lastOnline = null;
    _privateProfile;
    _friend = null;
    _color;
    _friendsIds = [];
    _subscribersIds = [];


    constructor(user) {
        makeObservable(this, {
            _lastOnline: observable,
            setLastOnline: action,

            _friend: observable,
            setFriend: action,

            _friendsIds: observable,
            setFriendsIds: action,

            _subscribersIds: observable,
            setSubscribersIds: action,

        })

        this._id = user.id;
        this._urlPhoto = user.urlPhoto;
        this._nick = user.nick;
        this._firstname = user.firstname;
        this._lastname = user.lastname;
        this._birthDate = user.birthDate;
        this._lastOnline = user.lastOnline;
        this._privateProfile = user.privateProfile;
        this._friend = user.friend;
        this._color = this._toColor(user.id + user.firstname);
        this._friendsIds = user.friendsIds;
        this._subscribersIds = user.subscribersIds;
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

    getBirthDateString() {
        return `${this._birthDate.substring(8)}.${this._birthDate.substring(5,7)}.${this._birthDate.substring(0,4)}`;
    }
    getAge() {
        const now = new Date();
        const birth = new Date(this._birthDate);
        return this._getYearDifference(birth, now)
    }

    _getYearDifference(date1, date2) {
        const year1 = date1.getFullYear();
        const year2 = date2.getFullYear();

        const month1 = date1.getMonth();
        const month2 = date2.getMonth();

        const day1 = date1.getDate();
        const day2 = date2.getDate();

        let difference = year2 - year1;

        if (month1 > month2 || (month2 === month1 && day2 < day1)) {
            difference--;
        }

        return difference;
    }

    get lastOnline() {
        return this._lastOnline;
    }
// УДАЛИТЬ СЕТТЕР
    set lastOnline(value) {
        this._lastOnline = value;
    }

    getLastOnlineString() {
        if (this._lastOnline === "online") return this._lastOnline;
        const now = new Date().getTime();
        const last = new Date(this._lastOnline).getTime();

        const minutes = [" минуту назад", " минуты назад", " минут назад"]
        const hours = [" час назад", " часа назад", " часов назад"]
        const days = [" день назад", " дня назад", " дней назад"]
        const years = [" год назад", " года назад", " лет назад"]

        function listNumber(number) {
            if (number > 10 && number < 20) {
                return 2;
            }
            switch (number % 10) {
                    case 1: return 0;
                    case 2:
                    case 3:
                    case 4: return 1;
                    /* 5-0 */
                    default: return 2;
            }

        }

        let output = "был(а) в сети "

        // test
        /*for (let i = 0; i < 60; i++) {
            console.log(i + minutes[listNumber(i)])
        }
        for (let i = 0; i < 24; i++) {
            console.log(i + hours[listNumber(i)])
        }
        for (let i = 0; i < 101; i++) {
            console.log(i + days[listNumber(i)])
        }
        for (let i = 0; i < 101; i++) {
            console.log(i + years[listNumber(i)])
        }*/
        //test end

        let difference = now - last;
        difference = Math.round(difference/60000);

        if (difference < 60) {
            if (difference === 0) return "online";
            return output + difference + minutes[listNumber(difference)];
        }
        difference = Math.round(difference/60);
        if (difference < 24) {
            return output + difference + hours[listNumber(difference)];
        }
        difference = Math.round(difference/24);
        if (difference < 365) {
            return output + difference + days[listNumber(difference)];
        }
        difference = Math.round(difference/365);
        return output + difference + years[listNumber(difference)];
    }

    setLastOnline(value) {
        this._lastOnline = value;
    }

    get privateProfile() {
        return this._privateProfile;
    }

    get friend() {
        return this._friend;
    }

    setFriend(value) {
        this._friend = value;
    }

    get color() {
        return this._color;
    }

    get friendsIds() {
        return this._friendsIds;
    }

    setFriendsIds(list) {
        let friends = [];
        list.forEach(value => friends.push(value[1]));
        this._friendsIds = friends;
    }

    getQtyFriends() {
        return this._friendsIds.length;
    }

    get subscribersIds() {
        return this._subscribersIds;
    }

    setSubscribersIds(list) {
        let subscribers = [];
        list.forEach(value => subscribers.push(value[1]));
        this._subscribersIds = subscribers;
    }

    getQtySubscribers() {
        return this._subscribersIds.length;
    }

// ***********************************
}