const MongoClient = require('mongodb').MongoClient;//this enables us to connect to mongodb server
const assert = require('assert');//let us checks true and false value within our application
const dboper = require('./operations');//requiring operation.js file based node module

//starting up connection to mongodb server
const url = 'mongodb://localhost:27017/';//URL where the MongoDB server can be accessed and port number is where mongodb server is running
const dbname = 'ConFusion';//database name which we have created

//to access the server
MongoClient.connect(url,(err,client) =>
{
    assert.equal(err,null);//checking to make sure that error is null

    //if error is false
    console.log('Connected correctly to server');

    const db = client.db(dbname);// to connect to the database

    //access the database
    dboper.insertDocument(db,{ name : "Vadonut" , description : 'Test'} ,'dishes',(result) =>
    {
        console.log('Insert Document:\n', result.ops);//ops tells you number of insert opertion

        dboper.findDocuments(db,'dishes',(docs) =>
        {
            console.log('Found Documents:\n',docs);

            dboper.updateDocument(db ,{name : "Vadonut"},{description : "Update Test"},'dishes',(result) =>
            {
                console.log('Updated Document:\n',result.result);
                dboper.findDocuments(db,'dishes',(docs) =>
                {
                    console.log('Found Documents:\n',docs);
                    db.dropCollection('dishes',(result) =>
                    {
                        console.log('Droped Collection: ',result);

                        client.close();
                    });
                });
            });
        })
    });
});