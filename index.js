const MongoClient = require('mongodb').MongoClient;//this enables us to connect to mongodb server
const assert = require('assert');//let us checks true and false value within our application

//starting up connection to mongodb server
const url = 'mongodb://localhost:27017/';//URL where the MongoDB server can be accessed and port number is where mongodb server is running
const dbname = 'ConFusion';//database name which we have created

//to access the server
MongoClient.connect(url,(err,client) =>
{
    assert.equal(err,null);//checking to make sure that error is null

    //if error is false
    console.log('Connected correctly to server');

    const db = client.db(dbname);// to connect to the database,
    const collection = db.collection('dishes')//to access to collection dishes

    //inserting one object into collection dishes
    collection.insertOne({ "name":"Uttappizza","description":"test"},(err,result) =>
    {
        assert.equal(err,null);

        console.log('After Insertion :\n');
        console.log(result.ops);//ops->how many operation is carried out successfully

        //providing empty object to find means to return all the value in collection
        //toArray means to create an array of json object 
        collection.find({}).toArray((err,docs) =>
        {
            assert.equal(err,null);

            console.log('Found :\n');
            console.log(docs);/*the second parameter here, docs, will return all the documents 
                                from this collection that match whatever criteria that you specify here. 
                                Since this is empty, then that means that all the
                                documents in the collection will be returned to us.*/
            
            //drops the specified collection
            db.dropCollection('dishes',(err,result) =>
            {
                assert.equal(err,null);

                client.close();//close the connection to database
            });
        });
    });


});