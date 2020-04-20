//this file encapsulate all database operations(insert,delete etc)
const assert = require('assert');

exports.insertDocument = (db,document,collection,callback) =>
{
    const coll = db.collection(collection);
    //mongo itself support promise therefore we will return promise directly to avoid callback hell
    return coll.insert(document);//returning promise and will be handled in index.js
};

exports.findDocuments = (db,collection,callback) =>
{
    const coll = db.collection(collection);
    return coll.find({}).toArray();//returning promise and will be handled in index.js
};

exports.removeDocument = (db,document,collection,callback) =>
{
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db,document,update,collection,callback) =>
{
    const coll = db.collection(collection);
    return coll.updateOne(document,{ $set : update},null);
};