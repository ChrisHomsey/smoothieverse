// Dependencies
// ==========================================



// Routes
// ==========================================
module.exports = function(app, db) {
	// Search for all recipes by user
	app.get("/api/user", function(req, res){
		// Use a left outer join to get all of a user's submitted recipes
		db.User.findAll({
			include: [db.Smoothie]
		}).then(function(dbUser){
			res.json(dbUser);
		});
	});

	// Search for a specific user
	app.get("/api/user/:username", function(req, res){
		db.User.findOne({
			where: {
				username: req.params.username
			},
			include: [db.Smoothie]
		}).then(function(dbUser){
			res.json(dbUser);
		});
	});

	// Saves a new smoothie recipe
	app.post("/api/smoothie", function(req, res){
		console.log(req.body);
		db.Smoothie.create({
			name: req.body.name,
			apiName: req.body.apiName,
			image_url: req.body.image_url,
			descriptions: req.body.descriptions,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions
		}).then(function(dbSmoothie){
			res.json(dbSmoothie);
		});
	});

	// Get an existing smoothie recipe
	app.get("/api/smoothie/:name", function(req, res){
		db.Smoothie.findAll({
			where: {
				apiName: req.params.name
			}
		}).then(function(result){
			res.json(result);
		});
	});
}






