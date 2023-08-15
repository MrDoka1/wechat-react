class ChatsStorage {
    constructor() {
        this._chats = new Map([
            [1, {id: 1, img:"https://avatars.mds.yandex.net/i?id=3d8fe1cbef738979cb1dd23253789385baeba740-9657256-images-thumbs&n=13", name: "Котики", members: 46, online: 45}],
            [2, {id: 2, img:"https://img.joinfo.com/i/2016/04/800x0/5710ffa88b2ba.jpg", name: "Енотики", members: 23, online: 19}],
            [3, {id: 3, img:"https://avatars.mds.yandex.net/i?id=9cacb1b690b813d48bd5cc0692f4fb465a6666f0-2834022-images-thumbs&n=13", name: "Верблюдики", members: 5, online: 0}],
            [4, {id: 4, img:"https://fikiwiki.com/uploads/posts/2022-02/1644906351_9-fikiwiki-com-p-sloni-krasivie-kartinki-9.jpg", name: "Слон", online:"online"}],
            [5, {id: 5, img:"https://avatars.mds.yandex.net/i?id=f5ed9943050597b4a97eeaf94118a4050301f315-10375548-images-thumbs&n=13", name: "Жираф", online:"2023-05-20T17:46:03.968638"}]
        ]);
    }


    get chats() {
        return this._chats;
    }

    set chats(value) {
        this._chats = value;
    }
}

export default ChatsStorage;