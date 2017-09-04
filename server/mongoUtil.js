const MongoClient = require( 'mongodb' ).MongoClient;
const constants = require('./constants')

let _db;

module.exports = {

  connectToServer: function( callback ) {
	MongoClient.connect(constants.hostedDB, function( err, db ) {
		console.log("Database connected");
		_db = db;
		return callback( err );
	});
  },

  getDb: function() {
    return _db;
  }
};