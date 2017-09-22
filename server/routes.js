var express = require('express');
var constants = require('./constants')
var router = express.Router();
const mongoUtil = require( './mongoUtil' );
var PythonShell = require('python-shell');

function bsGet(athleteId, res) {
	var dataPath = __dirname.split('/');
	dataPath[dataPath.length -  1] = 'data';
	dataPath = dataPath.join('/');
	PythonShell.run('script.py', { scriptPath: dataPath, args: [athleteId] }, function (err, results) {
		if (err) throw err;
		console.log(results);
		var formatted = {
			"aid": athleteId, 
			"sid": 0000, 
			"name": results[0], 
			"schoolname": results[2],
			"5ktimes": JSON.parse(results[1].replace(/'/g, '"')) // can't have single quotes in json apparently
		};
		res.status(200).send(formatted);
	});
}

router.route('/athlete/:aid').get(function(req, res) {
	var athleteId = req.params.aid;
	const _instance = mongoUtil.getDb();
	// TODO: Change the collection to all athletes?
	var collection = _instance.collection('s499');
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
			console.log("Athlete: " + athleteId + " was not found in the db, trying to grab itself now")
			try {
				bsGet(athleteId, res);
			} catch(err) {
				res.status(404).send(err);
			};
			
		}
	});
});

// Get all the athletes that belong to a school
router.route('/school/:sid').get(function(req, res) {
	var schoolId = req.params.sid;
	const _instance = mongoUtil.getDb();
	var collection = _instance.collection('s' + schoolId);

	collection.find().toArray(function(err, result) {
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
