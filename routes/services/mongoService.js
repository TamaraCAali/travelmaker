var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn)return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    const url = (process.env.PORT)? 
                        'mongodb://travel:travel?2018maker@ds245661.mlab.com:45661/travel_db' : '?'
    //TODO: Ask Chen about this short if.


    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB');

            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
