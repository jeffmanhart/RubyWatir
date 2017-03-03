var MongoClient = require('mongodb').MongoClient;

function mongoMethods(io){
	dbConnect = function(callback){

		MongoClient.connect('mongodb://bld-foosnet-01:27017/rallyTestData', function(err, db){
			if(err) {
				return io.emit("dbUpdate", "<br>"+err);
			}
			callback(db);
		});
	};

	this.dbConnect = dbConnect;

	this.getCollectionsFromDatabase = function(callback){
		this.dbConnect(function(db){
			db.collectionNames(function(err, collections){
				callback(collections);
			});
		});
	};

	this.getValuesFromDatabase = function(record, callback){
		io.emit("dbUpdate", "Connecting...");
		this.dbConnect(function(db){
			db.collection('testData').find({"name": record}).toArray(function(err, doc){
				db.close();
				callback(doc[0][record]);
			});
		});
	};

	this.createValuesInDatabase = function(data, callback){
		io.emit("dbUpdate", "Connecting...");
		this.dbConnect(function(db){
			db.collection(data.collection).insert(data, function(err, data){
				if(err) {
					return io.emit(err);
				} else {
					io.emit("dbUpdate", data[0]);
					callback(data[0]);
				}
			});
		});
	};
}
module.exports = mongoMethods;