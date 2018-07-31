const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService');

function query() {
  return mongoService.connect().then(db => {
    const collection = db.collection('event');

    return collection.find({}).toArray();
  });
}

function queryFilterLoc(loc, range) {
  var metersToRadian = function(meters) {
    var earthRadiusInMeters = 6371000;
    return meters / earthRadiusInMeters;
  };
  // var landmark = db.landmarks.findOne({ name: 'Washington DC' });
  var query = {
    loc: {
      $geoWithin: {
        $centerSphere: [loc, metersToRadian(range)]
      }
    }
  };
  return mongoService.connect().then(db => {
    const collection = db.collection('event');
    return collection.find(query).toArray();
  });
}

function remove(eventId) {
  eventId = new ObjectId(eventId);
  return mongoService.connect().then(db => {
    const collection = db.collection('event');
    return collection.remove({ _id: eventId });
  });
}
function getById(eventId) {
  eventId = new ObjectId(eventId);
  return mongoService.connect().then(db => {
    const collection = db.collection('event');
    return collection.findOne({ _id: eventId });
  });
}

function add(event) {
  return mongoService.connect().then(db => {
    const collection = db.collection('event');
    return collection.insertOne(event).then(result => {
      event._id = result.insertedId;
      return event;
    });
  });
}

function update(event) {
  event._id = new ObjectId(event._id);
  return mongoService
    .connect()

    .then(db => {
      const collection = db.collection('event');
      return collection
        .updateOne({ _id: event._id }, { $set: event })
        .then(result => {
          return event;
        });
    });
}

module.exports = {
  query,
  queryFilterLoc,
  remove,
  getById,
  add,
  update
};

// function connectToMongo() {
//     const MongoClient = require('mongodb').MongoClient;
//     const url = 'mongodb://localhost:27017';
//     const dbName = 'event_db';
//     return MongoClient.connect(url)
//         .then(client => client.db(dbName))
// }
