const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function query() {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.find({}).toArray();
  });
}
function remove(userId) {
  userId = new ObjectId(userId);
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.remove({ _id: userId });
  });
}
function getById(userId) {
  userId = new ObjectId(userId);
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.findOne({ _id: userId });
  });
}

function add(user) {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection
      .insertOne(user)
      .then(result => {
        user._id = result.insertedId;
        return user;
      })
      .catch(err => console.log('caught error', err));
  });
}

function update(user) {
  user._id = new ObjectId(user._id);
  return mongoService
    .connect()

    .then(db => {
      const collection = db.collection('user');

      return collection
        .findOneAndUpdate({ _id: user._id }, { $set: user })
        .then(result => {
          return user;
        });
    });
}

function checkForUser(user) {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.findOne({ userName: user.username });
  });
}

module.exports = {
  query,
  remove,
  getById,
  add,
  update,
  checkForUser
};

// function connectToMongo() {
//     const MongoClient = require('mongodb').MongoClient;
//     const url = 'mongodb://localhost:27017';
//     const dbName = 'user_db';
//     return MongoClient.connect(url)
//         .then(client => client.db(dbName))
// }
