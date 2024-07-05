const { MongoClient } = require('mongodb');

async function connect(collectionName) {
    const client = new MongoClient("mongodb://localhost:27017/MELENTO_Mongodb");
    await client.connect();
    console.log("Connected to database");
    const myDB = client.db();
    const coll = myDB.collection(collectionName);
    return coll;
}

function renamekey(obj, oldkey, newkey) {
    obj[newkey] = obj[oldkey];
    delete obj[oldkey];
}

module.exports = { 
    connect,
    renamekey
};
