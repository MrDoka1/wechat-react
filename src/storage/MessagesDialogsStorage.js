class MessagesDialogsStorage {
    constructor() {
        this._dialogs = new Map([
            [1, [{id: 23, text: "Привет", time: "2023-05-20T17:46:03.968638", senderId: 2}, {id: 24, text: "Привет!", time: "2023-05-20T17:50:03.968638", senderId: 10}]],
            [2, []],
            [3, []],
            [4, []],
            [5, []]
        ]);

        function getMessagesList(dialog) {
            return this._dialogs.get(dialog);
        }
    }
}