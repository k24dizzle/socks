var express = require('express');
var constants = require('./constants')
var router = express.Router();
const mongoUtil = require( './mongoUtil' );


router.route('/athlete/:aid').get(function(req, res) {
	var athleteId = req.params.aid;
	const _instance = mongoUtil.getDb();
	// TODO: Change the collection to all athletes?
	var collection = _instance.collection('skyline');
	// Find the athlete in the db! If not log the appro error?
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
});

module.exports = router;
