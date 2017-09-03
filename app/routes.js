var express = require('express');
var constants = require('./constants')
var router = express.Router();
const mongoUtil = require( './mongoUtil' );


router.route('/athlete/:aid').get(function(req, res) {
	var athleteId = req.params.aid;

	const _instance = mongoUtil.getDb();
	var collection = _instance.collection('skyline');
	collection.findOne({aid: athleteId}, function(err, result) {
		if (err) {
			res.status(500).send("Error with the server...");
			console.log(err);
			return;
		}
		if (result) {
			res.status(200).send(result);
		} else {
			res.status(404).send("Athlete: " + athleteId + " was not found in the db")
		}
	});


	
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
});

module.exports = router;
