// Dependencies
// ==========================================

var path = require("path");

// Routes
// ==========================================

module.exports = function(app) {
	//index route goes to index.html
	app.get("/", function(req, res){
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

	//recipe goes to recipe-display.html
	app.get("/recipe", function(req, res){
		res.sendFile(path.join(__dirname, "../public/recipe-display.html"));
	});

	//search goes to search-recipe.html
	app.get("/search", function(req, res){
		res.sendFile(path.join(__dirname, "../public/search-recipe.html"));
	});

	//submit goes to submit-recipe.html
	app.get("/submit", function(req, res){
		res.sendFile(path.join(__dirname, "../public/submit-recipe.html"));
	});

	//user goes to search-recipe.html
	app.get("/user", function(req, res){
		res.sendFile(path.join(__dirname, "../public/user-display.html"));
	});
};