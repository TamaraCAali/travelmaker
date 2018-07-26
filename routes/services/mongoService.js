var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn)return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    const url = 'mongodb://travel2:travel2018@ds245661.mlab.com:45661/travel_db'
    // const url = (process.env.PORT)? 
    //                     'mongodb://travel2:travel2018@ds245661.mlab.com:45661/travel_db' : '?'


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
