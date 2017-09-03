const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const bodyParser = require('body-parser')
const routes = require('./app/routes')


const mongoUtil = require( './app/mongoUtil' );

// Wait for to connect to the db before acting...
mongoUtil.connectToServer( function( err ) {
	// Where files are located
	app.use(express.static(__dirname + '/public'));
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

	app.listen(3000, function () {
		console.log('Go to http://localhost:3000/')
	})

	app.use('/api', routes);

} );


