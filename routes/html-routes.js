// Dependencies
// ==========================================

var path = require("path");

// Routes
// ==========================================

module.exports = function(app) {

	//Each route shown below just handles the HTML page the user gets sent to.

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
		res.render("search", { sessionUser: req.session.user });
	});

	app.get("/browse", function(req, res){
		res.render("browse", { sessionUser: req.session.user })
	})

	//submit goes to submit-recipe.html
	app.get("/submit", function(req, res){
		console.log(req.session);
		res.render("submit", { sessionUser: req.session.user });
	});

	//user goes to search-recipe.html
	app.get("/user", function(req, res){
		res.sendFile(path.join(__dirname, "../public/user-display.html"));
	});

}