// Dependencies
// ==========================================

// Require our models
var db = require("../models");

// Routes
// ==========================================

module.exports = function(app) {
	// GET route for obtaining all of a user's submissions - PLACEHOLDER

	app.get("/api/posts", function(req, res){
		var query = {};
		if (req.query.user_id) {
			query.UserId = req.query.user_id
		}

		db.Post.findAll({
			where: query,
			include: [db.user]
		}).then(function(dbPost){
			res.json(dbPost);
		});
	});

	// POST route for user to post submission - PLACEHOLDER
	app.post("/api/posts", function(req, res) {
		db.Post.create(req.body).then(function(dbPost){
			res.json(dbPost);
		});
	});

	// PUT route for updating a user's submission - PLACEHOLDER
	app.put("/api/posts", function(req, res){
		db.Post.update(
			req.body,
			{
				where: {
					id: req.body.id
				}
			}).then(function(dbPost){
				res.json(dbPost);
			});
	});

};