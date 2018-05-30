const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://speggos:foobarfoo@mongo-me1rl.mongodb.net/test?retryWrites=true';
let db;

MongoClient.connect(uri, (err, client) => {

    if (err) {
        return console.log(err);
    }

    db = client.db('users');

});

export default db;