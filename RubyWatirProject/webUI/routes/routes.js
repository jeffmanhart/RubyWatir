var	mongodb = require('./lib/mongo'),
	casper = require('./lib/casper'),
	fs = require('fs');

Array.prototype.randomElement = function(){
	return this[Math.floor(Math.random()* this.length)];
};

module.exports = function(io) {
	var routes = {};
	var mong = new mongodb(io);
	var casp = new casper(io, mong);

	routes.runCasper = function(req, res){
		casp.runCasper(res, function(){
			res.end();
		});
	};

  routes.createStories = function(req, res){
		console.log("I'm in createStories");
		casp.getValuesAndRunCasper(res, 5, io);
  };
	routes.databaseValues = function(req, res){
		mong.getValuesFromDatabase("actors", function(err, record){
			if(err){
				io.emit("dbUpdate", err);
			}
			io.emit("dbUpdate", record);
			res.end();
		});
	};
	routes.createDatabaseValue = function(req, res){
		mong.createValuesInDatabase(req.body, function(data){
			io.emit("dbUpdate", JSON.stringify(data));
			res.end();
		});
	};
	routes.getLoadValues = function(req, res){
		var responseArray = [];
		var colName = "";
		mong.getCollectionsFromDatabase(function(collections){
			for(i=1;i<collections.length;i++){
				colName = collections[i].name.split('.')[1];
				responseArray.push(colName);
			}
			res.send(responseArray);
			res.end();
		});
	};
	routes.createActionObject = function(req, res){
		console.log(req.body);
		fs.writeFile("routes/casper/myTestObject.js", "var actions = "+JSON.stringify(req.body)+";", function(err){
			if(err) {
				res.send(err);
				res.end();
			}
			res.send("Successfully created the object.");
			res.end();
		});
	};
	routes.getPageElements = function(req, res){
		var pageElements = require("./casper/"+req.query.type);
		res.send(pageElements.getElementsAndActions());
		// res.send(pageElements.getElements());
		res.end();
	};
  return routes;
};
