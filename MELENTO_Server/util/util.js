var MongoClient = require('mongodb').MongoClient;

function connect(collectionName) {
    var conn = new MongoClient("mongodb://localhost:27017/assessments");
    console.log("Connecting to database");
    var myDB = conn.db();
    var coll = myDB.collection(collectionName);
    return coll;
}

function renamekey(obj, oldkey, newkey) {
    obj[newkey] = obj[oldkey];
    delete obj[oldkey];
}

module.exports = { connect,
    renamekey
 };