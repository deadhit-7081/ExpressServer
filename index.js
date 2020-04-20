const MongoClient = require('mongodb').MongoClient;//this enables us to connect to mongodb server
const assert = require('assert');//let us checks true and false value within our application
const dboper = require('./operations');//requiring operation.js file based node module

//starting up connection to mongodb server
const url = 'mongodb://localhost:27017/';//URL where the MongoDB server can be accessed and port number is where mongodb server is running
const dbname = 'ConFusion';//database name which we have created

//to access the server
MongoClient.connect(url).then((client) =>//handlimg promises
{
    console.log('Connected correctly to server');

    const db = client.db(dbname);// to connect to the database

    //access the database
    dboper.insertDocument(db,{ name : "Vadonut" , description : 'Test'} ,'dishes')
    .then((result) =>
    {
        console.log('Insert Document:\n', result.ops);//ops tells you number of insert opertion

        return dboper.findDocuments(db,'dishes')//returning promise to the chained then
    })
    .then((docs) =>
    {
        console.log('Found Documents:\n',docs);

        return dboper.updateDocument(db ,{name : "Vadonut"},{description : "Update Test"},'dishes')
    })
    .then((result) =>
    {
        console.log('Updated Document:\n',result.result);
        return dboper.findDocuments(db,'dishes')
    })
    .then((docs) =>
    {
        console.log('Found Documents:\n',docs);
        return db.dropCollection('dishes')
    })
    .then((result) =>
    {
        console.log('Droped Collection: ',result);

        client.close();
    })
    .catch((err) => console.log(err));
})
.catch((err) => console.log(err));