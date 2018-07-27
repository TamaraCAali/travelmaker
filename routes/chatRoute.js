const CHAT_URL = '/data/chat'
const chatService = require('./services/chatService');


module.exports = (app) => {

    app.get(CHAT_URL, (req, res) => {
        chatService.query()
            .then(chats => res.json(chats))
    })

    app.get(CHAT_URL + '/:room', (req, res) => {
        const room = req.params.room;
        chatService.getByRoom(room)
            .then(chat => res.json(chat))
    })

    app.delete(CHAT_URL + '/:room', (req, res) => {
        const room = req.params.room;

        chatService.remove(room)
            .then(() => res.end(`Chat ${room} Deleted `))

    })

    app.post(CHAT_URL, (req, res) => {
        const chat = req.body;
        chatService.add(chat)
            .then(chat => {
                res.json(chat)
            })
    })

    app.put(CHAT_URL + '/:room', (req, res) => {
        const chat = req.body;
        chatService.update(chat)
            .then(chat => {
                res.json(chat)
            })

    })


}