const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const bodyParser = require('body-parser')

// Connection URL
// const url = 'mongodb://localhost:27017/myproject'; // Local
const url = 'mongodb://test:test@ds139438.mlab.com:39438/socksdb'; // Hosted
let database;

// Apparently these two lines let you parse a request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
})

app.post('/test', function(req, res) {
	console.log("Request made!");
	console.log(req.body);
	let collection = database.collection('test');
	collection.insert({name: req.body.name_field});
});

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	database = db;
	assert.equal(null, err);
	console.log("Connected successfully to server");
});

app.listen(3000, function () {
	console.log('Go to http://localhost:3000/')
})

// var insertDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
