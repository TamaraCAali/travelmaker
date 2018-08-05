const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService')

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat');
            return collection.find({}).toArray()
        })
}
function remove(room) {
    // room = new ObjectId(room)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat');
            return collection.remove({ 'room': room })
        })
}
function getByRoom(room) {
    // chatId = new ObjectId(chatId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat');
            return collection.findOne({ 'room': room })
        })
}

function add(chat) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('chat');
            return collection.insertOne(chat)
                .then(result => {
                    chat._id = result.insertedId;
                    return chat;
                })
        })
}

function updateByRoom(chat) {
    // chat._id = new ObjectId(chat._id)
    return mongoService.connect()

        .then(db => {
            const collection = db.collection('chat');
            return collection.updateOne({ 'room': chat.room }, { $set: chat })
                .then(result => {
                    return chat;
                })
        })
}
function update(chat) {
    chat._id = new ObjectId(chat._id)
    return mongoService.connect()

        .then(db => {
            const collection = db.collection('chat');
            return collection.updateOne({ _id: chat._id }, { $set: chat })
                .then(result => {
                    return chat;
                })
        })
}

module.exports = {
    query,
    remove,
    getByRoom,
    add,
    update
}




