// Dependencies
// ==========================================

// Require our models
var db = require("../models");

// Routes
// ==========================================

module.exports = function(app) {

	// Get to display all users - Placeholder
	app.get("/api/user", function(req, res){

		db.User.findAll({
			include: [db.Smoothie],
			include: [db.Comment]
		}).then(function(dbUser){
			res.json(dbUser);
		});
	});

	// Get to display all smoothie recipes - Placeholder
	app.get("/api/smoothie", function(req, res){
		db.User.findAll({
			include: [db.User],
			include: [db.Comment]
		}).then(function(dbSmoothie){
			res.json(dbSmoothie);
		});
	});

	// Get to display all comments - Placeholder
	app.get("/api/comment", function(req, res){
		db.User.findAll({
			include: [db.User]
			include: [db.Smoothie]
		}).then(function(dbComment){
			res.json(dbComment);
		});
	});
};