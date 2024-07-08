const MongoClient = require('mongodb').MongoClient;

async function connect(collectionName) {
    const conn = new MongoClient("mongodb+srv://suvankit2001:Amazon-99@cluster0.rjzuqkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await conn.connect();
    console.log("Connected to database");
    const myDB = conn.db('MELENTO_Mongodb');
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
